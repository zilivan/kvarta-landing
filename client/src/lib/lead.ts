import { z } from "zod";

export const PHONE_ERROR = "Введите номер в формате +375 29 123-45-67";
export const interests = ["Подписка на кофе", "Разовый заказ", "Просто вопрос"] as const;
export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Пожалуйста, укажите ваше имя").max(100, "Имя должно быть не длиннее 100 символов"),
  phone: z.string().max(24, PHONE_ERROR).regex(/^\+375 (29|33|44|25) \d{3}-\d{2}-\d{2}$/, PHONE_ERROR),
  interest: z.enum(interests),
  comment: z.string().trim().max(1000, "Комментарий должен быть не длиннее 1000 символов"),
});
export const utmSchema = z.object({
  utmSource: z.string().trim().max(200).default(""),
  utmMedium: z.string().trim().max(200).default(""),
  utmCampaign: z.string().trim().max(200).default(""),
});
export const leadSchema = leadFormSchema.merge(utmSchema).strict();
export type LeadFormValues = z.infer<typeof leadFormSchema>;
export type UtmValues = z.infer<typeof utmSchema>;
export const UTM_KEY = "kvarta-utm";
export const COOLDOWN_KEY = "kvarta-lead-cooldown";
export const COOLDOWN_MS = 10 * 60 * 1000;

export function formatBelarusPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("375")) digits = digits.slice(3);
  const local = digits.slice(0, 9);
  let formatted = "+375";
  if (local.length) formatted += ` ${local.slice(0, 2)}`;
  if (local.length > 2) formatted += ` ${local.slice(2, 5)}`;
  if (local.length > 5) formatted += `-${local.slice(5, 7)}`;
  if (local.length > 7) formatted += `-${local.slice(7, 9)}`;
  return formatted;
}

export function captureUtm(search: string): UtmValues {
  const params = new URLSearchParams(search);
  let saved: UtmValues = { utmSource: "", utmMedium: "", utmCampaign: "" };
  try {
    const parsed = utmSchema.safeParse(JSON.parse(localStorage.getItem(UTM_KEY) ?? "{}"));
    if (parsed.success) saved = parsed.data;
  } catch { /* Storage may be unavailable. */ }
  const entries = [["utm_source", "utmSource"], ["utm_medium", "utmMedium"], ["utm_campaign", "utmCampaign"]] as const;
  for (const [param, key] of entries) {
    if (params.has(param)) saved[key] = (params.get(param) ?? "").trim().slice(0, 200);
  }
  try { localStorage.setItem(UTM_KEY, JSON.stringify(saved)); } catch { /* Continue without storage. */ }
  return saved;
}