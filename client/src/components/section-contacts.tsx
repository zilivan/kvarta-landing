import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";

const ADDRESS = "Минск, ул. Короля, 9";
const HOURS = "Пн–Пт 8:00–20:00, Сб–Вс 10:00–18:00";
const PHONE = "+375 29 123-45-67"; // Заглушка: реальный номер мастерской ещё не назначен.
const PHONE_HREF = "+375 29 123-45-67";
const EMAIL = "hello@kvarta.by";
const INSTAGRAM = "@kvarta.coffee";
const INSTAGRAM_URL = "https://www.instagram.com/kvarta.coffee";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export function ContactsContent() {
  return (
    <div className="contacts-body">
      <h2 className="block-title">Как нас найти</h2>

      <div className="contacts-grid">
        <div className="contacts-card">
          <span className="contacts-icon" aria-hidden="true">
            <MapPin />
          </span>
          <h3 className="contacts-name">Адрес</h3>
          <p className="contacts-line">{ADDRESS}</p>
          <p className="contacts-hours">
            <Clock aria-hidden="true" size={15} />
            <span>{HOURS}</span>
          </p>
        </div>

        <div className="contacts-card">
          <span className="contacts-icon" aria-hidden="true">
            <Phone />
          </span>
          <h3 className="contacts-name">Связь</h3>
          <ul className="contacts-list">
            <li className="contacts-item">
              <Phone aria-hidden="true" size={15} />
              <a href={PHONE_HREF}>{PHONE}</a>
            </li>
            <li className="contacts-item">
              <Mail aria-hidden="true" size={15} />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li className="contacts-item">
              <Instagram aria-hidden="true" size={15} />
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                {INSTAGRAM}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <a className="contacts-map" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
        <span className="contacts-map-pin" aria-hidden="true">
          <MapPin />
        </span>
        <span className="contacts-map-text">
          <span className="contacts-map-address">{ADDRESS}</span>
          <span className="contacts-map-hint">Можно зайти и попробовать кофе</span>
        </span>
        <span className="contacts-map-action">Открыть в Google Maps →</span>
      </a>
    </div>
  );
}
