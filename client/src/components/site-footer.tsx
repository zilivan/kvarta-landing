import { Link } from "@tanstack/react-router";
import { Instagram, Send } from "lucide-react";
import { sections } from "@/components/site-header";

const INSTAGRAM_URL = "https://www.instagram.com/kvarta.coffee";
// Telegram-канал мастерской ещё не заведён: ссылка-заглушка, ждём настоящий адрес.
const TELEGRAM_URL = "#";

const quickLinks = sections.filter((section) => section.id !== "contacts");

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-width">
        <div className="footer-brand">
          <span className="footer-logo">
            Кварта<span className="footer-dot">.</span>
          </span>
          <p className="footer-tagline">Маленькая обжарка в Минске с 2019 года</p>
        </div>

        <nav className="footer-nav" aria-label="Быстрые ссылки">
          {quickLinks.map((section) => (
            <Link key={section.id} to="/" hash={section.id} className="footer-link">
              {section.label}
            </Link>
          ))}
        </nav>

        <div className="footer-social">
          <a className="footer-social-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram Кварты">
            <Instagram aria-hidden="true" />
          </a>
          <a className="footer-social-link" href={TELEGRAM_URL} aria-label="Telegram Кварты">
            <Send aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="footer-bottom page-width">
        <p className="footer-copy">© 2026 Кварта. Сделано с любовью к кофе.</p>
      </div>
    </footer>
  );
}
