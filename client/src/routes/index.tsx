import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteHeader, sections } from "@/components/site-header";
import { Hero, HERO_IMAGE } from "@/components/hero";
import { AboutContent } from "@/components/section-about";
import { CoffeeContent } from "@/components/section-coffee";
import { SubscriptionContent } from "@/components/section-subscription";
import { DeliveryContent } from "@/components/section-delivery";
import { ContactsContent } from "@/components/section-contacts";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";

const sectionContent: Record<string, ReactNode> = {
  about: <AboutContent />,
  coffee: <CoffeeContent />,
  subscription: <SubscriptionContent />,
  delivery: <DeliveryContent />,
  contacts: (
    <>
      <ContactsContent />
      <LeadForm />
    </>
  ),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Кварта — обжарка кофе в Минске" },
      { name: "description", content: "Кварта — ремесленная обжарка кофе в Минске. О нас, кофе, подписка, доставка и контакты." },
      { property: "og:title", content: "Кварта — обжарка кофе в Минске" },
      { property: "og:description", content: "Ремесленная обжарка кофе в Минске. Кофе, подписка и доставка от Кварты." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <main className="landing-main">
        <Hero />
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="landing-section" aria-labelledby={`${section.id}-title`}>
            <div className="page-width section-inner">
              <div className="section-heading">
                <span className="section-number" aria-hidden="true">0{index + 1}</span>
                <h1 id={`${section.id}-title`} className="section-title">{section.label}</h1>
              </div>
              {sectionContent[section.id]}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
