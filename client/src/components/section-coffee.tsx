import { Button } from "@/components/ui/button";
import { setOrderIntent } from "@/lib/order-intent";
import ethiopiaPhoto from "@/assets/coffee-ethiopia.jpg";
import brazilPhoto from "@/assets/coffee-brazil.jpg";
import colombiaPhoto from "@/assets/coffee-colombia.jpg";
import blendPhoto from "@/assets/coffee-blend.jpg";

export const coffeeProducts = [
  {
    id: "ethiopia",
    badge: "Светлая обжарка",
    name: "Эфиопия Иргачефф",
    notes: "Жасмин, бергамот, спелый персик. Для воронки или аэропресса.",
    price: "28 BYN",
    image: ethiopiaPhoto,
    alt: "Светлые обжаренные зёрна кофе в открытой пачке",
  },
  {
    id: "brazil",
    badge: "Средняя обжарка",
    name: "Бразилия Серрадо",
    notes: "Шоколад, орех, карамель. Универсальный кофе для эспрессо и фильтра.",
    price: "24 BYN",
    image: brazilPhoto,
    alt: "Зёрна средней обжарки в мешочке с деревянным совком",
  },
  {
    id: "colombia",
    badge: "Тёмная обжарка",
    name: "Колумбия Уила",
    notes: "Тёмный шоколад, чернослив, табак. Плотное тело для эспрессо.",
    price: "26 BYN",
    image: colombiaPhoto,
    alt: "Крупный план тёмных обжаренных зёрен кофе",
  },
  {
    id: "kvarta-blend",
    badge: "Бленд",
    name: "Домашний бленд «Кварта»",
    notes: "Наш фирменный купаж. Мягкий, сбалансированный, на каждый день.",
    price: "22 BYN",
    image: blendPhoto,
    alt: "Крафтовый пакет кофе, деревянная ложка и зёрна на столе",
  },
];

export function CoffeeContent() {
  return (
    <div className="coffee-body">
      <div className="coffee-head">
        <h2 className="block-title">Что обжариваем на этой неделе</h2>
        <p className="coffee-subtitle">
          Цены указаны за 250 г. Каждая пачка — с датой обжарки.
        </p>
      </div>

      <ul className="coffee-grid">
        {coffeeProducts.map((product) => (
          <li className="coffee-card" key={product.id}>
            <div className="coffee-media">
              <img
                className="coffee-photo"
                src={product.image}
                alt={product.alt}
                width={1200}
                height={900}
                loading="lazy"
              />
              <span className="coffee-badge">{product.badge}</span>
            </div>

            <div className="coffee-info">
              <h3 className="coffee-name">{product.name}</h3>
              <p className="coffee-notes">{product.notes}</p>

              <div className="coffee-foot">
                <span className="coffee-price">{product.price}</span>
                <Button
                  variant="craft"
                  asChild
                >
                  <a
                    href="#lead"
                    aria-label={`Заказать ${product.name}`}
                    onClick={() => setOrderIntent({ type: "one-time", product: product.name })}
                  >
                    Заказать
                  </a>
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
