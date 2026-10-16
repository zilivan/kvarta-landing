import { Timer, Truck, Wheat } from "lucide-react";
import workshopPhoto from "@/assets/about-workshop.jpg";

const features = [
  {
    icon: <Wheat aria-hidden="true" />,
    title: "Обжариваем по четвергам",
    text: "Каждую неделю свежая партия",
  },
  {
    icon: <Truck aria-hidden="true" />,
    title: "Развозим по пятницам",
    text: "Зерно у вас на 1–3 день после обжарки",
  },
  {
    icon: <Timer aria-hidden="true" />,
    title: "Пик вкуса — 2 недели",
    text: "Мы подскажем, когда кофе раскроется лучше всего",
  },
];

export function AboutContent() {
  return (
    <div className="about-body">
      <div className="about-story">
        <div className="about-story-copy">
          <h2 className="block-title">Маленькая мастерская с большой любовью</h2>
          <p className="about-lead">
            Мы — Аня и Дмитрий. Начинали как бариста, а в 2019 году открыли свою обжарку. Работаем
            партиями по 5 кг — ровно столько, чтобы каждая пачка была свежей и с характером.
          </p>
        </div>
        <img
          className="about-photo"
          src={workshopPhoto}
          alt="Аня и Дмитрий работают в маленькой мастерской обжарки кофе"
          width={1200}
          height={912}
          loading="lazy"
        />
      </div>

      <div className="about-freshness">
        <h2 className="block-title">Почему свежесть — это главное</h2>
        <ul className="feature-cards">
          {features.map((feature) => (
            <li className="feature-card" key={feature.title}>
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
