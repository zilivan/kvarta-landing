import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrderIntent } from "@/lib/order-intent";
import { captureUtm, COOLDOWN_KEY, COOLDOWN_MS, formatBelarusPhone, interests, leadFormSchema, leadSchema, type LeadFormValues, type UtmValues } from "@/lib/lead";

export function LeadForm() {
  
  const intent = useOrderIntent();
  const utm = useRef<UtmValues>({ utmSource: "", utmMedium: "", utmCampaign: "" });
  const [deadline, setDeadline] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { name: "", phone: "", interest: "Подписка на кофе", comment: "" },
  });

  useEffect(() => {
    utm.current = captureUtm(window.location.search);
    try {
      const stored = Number(localStorage.getItem(COOLDOWN_KEY));
      if (Number.isFinite(stored) && stored > Date.now() && stored <= Date.now() + COOLDOWN_MS) {
        setDeadline(stored);
        setSeconds(Math.ceil((stored - Date.now()) / 1000));
        setStatus("success");
      }
    } catch { /* Continue without persistent cooldown. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!deadline) return;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining === 0) {
        setDeadline(0);
        setStatus("idle");
        try { localStorage.removeItem(COOLDOWN_KEY); } catch { /* Optional storage. */ }
      }
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [deadline]);

  useEffect(() => {
    if (!intent) return;
    setValue("interest", intent.type === "one-time" ? "Разовый заказ" : intent.type === "question" ? "Просто вопрос" : "Подписка на кофе");
    if (intent.product) {
      setValue(
        "comment",
        intent.type === "subscription"
          ? `Хочу подписку: ${intent.product}`
          : intent.type === "question"
            ? `Хочу обсудить условия: ${intent.product}`
            : `Хочу заказать: ${intent.product}`,
      );
    }
  }, [intent, setValue]);

  async function submit(values: LeadFormValues) {
    if (seconds > 0) return;
    setStatus("idle");
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://api.zilserver.uk";
      const payload = leadSchema.parse({ ...values, ...utm.current });
      const response = await fetch(`${API_URL}/api/lead`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Submission failed");
      const result: unknown = await response.json();
      if (typeof result !== "object" || result === null || !("success" in result) || result.success !== true) throw new Error("Invalid response");
      const nextDeadline = Date.now() + COOLDOWN_MS;
      setDeadline(nextDeadline);
      setSeconds(600);
      setStatus("success");
      try { localStorage.setItem(COOLDOWN_KEY, String(nextDeadline)); } catch { /* Timer still runs in memory. */ }
    } catch { setStatus("error"); }
  }

  const timer = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="lead-body" id="lead">
      <h2 className="block-title">Оставьте заявку — мы перезвоним</h2>
      <p className="lead-subtitle">Менеджер поможет выбрать кофе, оформит заказ или ответит на вопросы.</p>
      <form className="lead-form" noValidate onSubmit={handleSubmit(submit)} aria-label="Форма заявки">
        <div className="lead-field">
          <label htmlFor="lead-name">Имя <span aria-hidden="true">*</span></label>
          <Input id="lead-name" className="lead-input" placeholder="Как к вам обращаться?" autoComplete="given-name" maxLength={100} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lead-name-error" : undefined} {...register("name")} />
          {errors.name && <p className="lead-field-error" id="lead-name-error">{errors.name.message}</p>}
        </div>
        <div className="lead-field">
          <label htmlFor="lead-phone">Телефон <span aria-hidden="true">*</span></label>
          <Controller name="phone" control={control} render={({ field }) => (
            <Input {...field} id="lead-phone" className="lead-input" type="tel" inputMode="tel" autoComplete="tel" placeholder="+375 29 ___ __ __" maxLength={19} aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              onChange={(event) => field.onChange(formatBelarusPhone(event.target.value))} />
          )} />
          {errors.phone && <p className="lead-field-error" id="lead-phone-error">{errors.phone.message}</p>}
        </div>
        <div className="lead-field">
          <label htmlFor="lead-interest">Что интересует</label>
          <Controller name="interest" control={control} render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="lead-interest" className="lead-input" ref={field.ref} onBlur={field.onBlur}><SelectValue /></SelectTrigger>
              <SelectContent>{interests.map((interest) => <SelectItem key={interest} value={interest}>{interest}</SelectItem>)}</SelectContent>
            </Select>
          )} />
        </div>
        <div className="lead-field">
          <label htmlFor="lead-comment">Комментарий <span className="lead-optional">необязательно</span></label>
          <Textarea id="lead-comment" className="lead-input lead-textarea" placeholder="Расскажите, какой кофе вы любите" maxLength={1000} aria-invalid={Boolean(errors.comment)} aria-describedby={errors.comment ? "lead-comment-error" : undefined} {...register("comment")} />
          {errors.comment && <p className="lead-field-error" id="lead-comment-error">{errors.comment.message}</p>}
        </div>
        {status === "success" && <div className="lead-message lead-success" role="status"><CheckCircle2 aria-hidden="true" size={20} /><p>Спасибо! Мы перезвоним в течение 10 минут.</p></div>}
        {status === "error" && <div className="lead-message lead-failure" role="alert"><p>Не удалось отправить. Позвоните нам: +375 29 123-45-67</p></div>}
        <Button type="submit" variant="craft" className="lead-submit" disabled={!ready || isSubmitting || seconds > 0}>
          {isSubmitting ? <><LoaderCircle className="lead-spinner" aria-hidden="true" />Отправляем…</> : seconds > 0 ? `Заявка принята. Перезвоним через ${timer}` : <><Send aria-hidden="true" />Отправить заявку</>}
        </Button>
      </form>
    </div>
  );
}