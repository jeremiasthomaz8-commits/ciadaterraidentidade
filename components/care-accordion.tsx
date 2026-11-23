"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { copy, type Locale } from "@/content/site";
import { editorial } from "@/content/editorial";

export function CareAccordion({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<number | null>(0);
  const t = copy[locale];
  return (
    <section className="care-section" aria-label={editorial(locale).careLabel}>
      <div className="container care-layout">
        <figure className="care-visual">
          <img
            src="/images/botanical.webp"
            alt={t.ui.concept}
            width="640"
            height="800"
            loading="lazy"
          />
        </figure>
        <div className="care-content">
          <h2>{t.home.valuesTitle}</h2>
          <div className="care-list">
            {t.home.values.map(([title, text], i) => (
              <article
                className={active === i ? "care-item is-active" : "care-item"}
                key={title}
              >
                <h3>
                  <button
                    id={"care-heading-" + i}
                    aria-expanded={active === i}
                    aria-controls={"care-content-" + i}
                    onClick={() => setActive(active === i ? null : i)}
                  >
                    {title}
                    {active === i ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </h3>
                <div
                  className="care-answer"
                  id={"care-content-" + i}
                  role="region"
                  aria-labelledby={"care-heading-" + i}
                  hidden={active !== i}
                >
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="care-process">
            <h3>{t.about.qualityTitle}</h3>
            <p>{t.about.qualityText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
