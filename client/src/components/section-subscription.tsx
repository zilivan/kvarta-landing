import { Button } from "@/components/ui/button";
import { setOrderIntent, type OrderType } from "@/lib/order-intent";
import { Check } from "lucide-react";

type SubscriptionPlan = {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
  orderType: OrderType;
  product: string | null;
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "light",
    name: "Лёгкий",
    price: "44 BYN",
    period: "/ месяц",
    description: "2 пачки по 250 г",
    features: [
      "Доставка каждую пятницу",
      "Выбор любого кофе из ассортимента",
      "Бесплатная доставка",
    ],
    featured: false,
    cta: "Оформить подписку",
    orderType: "subscription",
    product: "Подписка «Лёгкий»",
  },
  {
    id: "optimal",
    name: "Оптимальный",
    badge: "Популярный выбор",
    price: "78 BYN",
    period: "/ месяц",
    description: "4 пачки по 250 г",
    features: [
      "Доставка каждую пятницу",
      "Любое сочетание кофе",
      "Бесплатная доставка",
      "Подарок в первой пачке",
    ],
    featured: true,
    cta: "Оформить подписку",
    orderType: "subscription",
    product: "Подписка «Оптимальный»",
  },
  {
    id: "office",
    name: "Для офиса",
    price: "от 150 BYN",
    period: "/ месяц",
    description: "Индивидуальный расчёт",
    features: [
      "От 8 пачек в месяц",
      "Персональный менеджер",
      "Бесплатная доставка",
      "Возможность попробовать новинки первыми",
    ],
    featured: false,
    cta: "Обсудить условия",
    orderType: "question",
    product: "тариф «Для офиса»",
  },
];

export function SubscriptionContent() {
  return (
    <div className="subscription-body">
      <h2 className="block-title">Свежий кофе — автоматически, каждую неделю</h2>
      <p className="subscription-subtitle">
        Выберите удобный ритм, а мы позаботимся об остальном. Отменить можно в любой момент.
      </p>

      <ul className="subscription-grid">
        {subscriptionPlans.map((plan) => (
          <li
            className={plan.featured ? "subscription-card subscription-card-featured" : "subscription-card"}
            key={plan.id}
          >
            {plan.badge && <span className="subscription-badge">{plan.badge}</span>}
            <h3 className="subscription-name">{plan.name}</h3>
            <p className="subscription-price">
              {plan.price}
              <span className="subscription-period">{plan.period}</span>
            </p>
            <p className="subscription-description">{plan.description}</p>

            <ul className="subscription-features">
              {plan.features.map((feature) => (
                <li className="subscription-feature" key={feature}>
                  <Check aria-hidden="true" size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant={plan.featured ? "craftOutline" : "craft"} asChild>
              <a
                href="#lead"
                aria-label={`${plan.cta}: ${plan.name}`}
                onClick={() => setOrderIntent({ type: plan.orderType, product: plan.product })}
              >
                {plan.cta}
              </a>
            </Button>
          </li>
        ))}
      </ul>

      <p className="subscription-note">
        Подписку можно поставить на паузу, изменить или отменить в любой момент — просто напишите нам.
      </p>
    </div>
  );
}
