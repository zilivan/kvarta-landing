import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1400&q=80";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="page-width hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">Обжарка с 2019 года • Минск</span>
          <h1 id="hero-title" className="hero-title">
            Кофе, который приезжает к вам на 1–3 день после обжарки
          </h1>
          <p className="hero-subtitle">
            Мы — Аня и Дмитрий, маленькая мастерская на ул. Короля. Обжариваем зерно по четвергам, а
            в пятницу оно уже у вас.
          </p>
          <div className="hero-actions">
            <Button asChild variant="craft">
              <Link to="/" hash="subscription">
                Оформить подписку <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="craftOutline">
              <Link to="/" hash="coffee">
                Выбрать кофе
              </Link>
            </Button>
          </div>
          <p className="hero-note">
            <Truck aria-hidden="true" />
            Бесплатная доставка по Минску от 50 BYN
          </p>
        </div>
        <div className="hero-media">
          <img
            className="hero-photo"
            src={HERO_IMAGE}
            alt="Свежеобжаренные кофейные зёрна крупным планом"
            width={1400}
            height={1220}
          />
        </div>
      </div>
    </section>
  );
}
