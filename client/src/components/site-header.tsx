import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const sections = [
  { id: "about", label: "О нас" },
  { id: "coffee", label: "Кофе" },
  { id: "subscription", label: "Подписка" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <Link to="/" className="brand" aria-label="Кварта — на главную" onClick={() => setOpen(false)}>
          <span className="brand-name">Кварта<span className="brand-dot">.</span></span>
          <span className="brand-caption">ОБЖАРКА КОФЕ · МИНСК</span>
        </Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {sections.map((section) => <Link key={section.id} to="/" hash={section.id} className="nav-link">{section.label}</Link>)}
        </nav>
        <Button asChild variant="craft" className="desktop-cta">
          <Link to="/" hash="lead">Оставить заявку <ArrowUpRight /></Link>
        </Button>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav page-width" aria-label="Мобильная навигация">
        {sections.map((section) => <Link key={section.id} to="/" hash={section.id} className="nav-link" onClick={() => setOpen(false)}>{section.label}</Link>)}
        <Button asChild variant="craft"><Link to="/" hash="lead" onClick={() => setOpen(false)}>Оставить заявку <ArrowUpRight /></Link></Button>
      </nav>}
    </header>
  );
}