import { Button } from "@/components/ui/button";
import { MapPin, Truck } from "lucide-react";

const ADDRESS = "Минск, улица Короля, 9";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

type DeliveryBlock = {
  id: "delivery" | "pickup";
  title: string;
  items: string[];
  action?: { label: string; href: string };
};

export const deliveryBlocks: DeliveryBlock[] = [
  {
    id: "delivery",
    title: "Доставка по Минску",
    items: [
      "Развозим заказы по пятницам",
      "Бесплатно при заказе от 50 BYN",
      "Стоимость доставки до 50 BYN — 8 BYN",
      "Привозим в удобное время с 10:00 до 20:00",
    ],
  },
  {
    id: "pickup",
    title: "Заехать в мастерскую",
    items: [
      "ул. Короля, 9, Минск",
      "Пн–Пт: 8:00–20:00",
      "Сб–Вс: 10:00–18:00",
      "Можно попробовать кофе перед покупкой",
    ],
    action: { label: "Посмотреть на карте", href: MAPS_URL },
  },
];

export function DeliveryContent() {
  return (
    <ul className="delivery-grid">
      {deliveryBlocks.map((block) => (
        <li className="delivery-card" key={block.id}>
          <span className="delivery-icon" aria-hidden="true">
            {block.id === "delivery" ? <Truck /> : <MapPin />}
          </span>
          <h3 className="delivery-name">{block.title}</h3>
          <ul className="delivery-list">
            {block.items.map((item) => (
              <li className="delivery-item" key={item}>
                <span aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {block.action && (
            <Button variant="craftOutline" asChild className="delivery-action">
              <a href={block.action.href} target="_blank" rel="noopener noreferrer">
                {block.action.label}
              </a>
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
