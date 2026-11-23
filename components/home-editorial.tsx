import Link from "next/link";
import { FileUp, MessageCircle, Truck } from "lucide-react";
import {
  copy,
  href,
  serviceData,
  serviceCopy,
  business,
  type Locale,
} from "@/content/site";
import { editorial } from "@/content/editorial";
import { photoSource } from "@/content/media";
import { CategoriesCarousel, ArticleGrid, Information } from "./interactive";
import { CareAccordion } from "./care-accordion";
import { Instagram, Facebook } from "./icons";

export function EditorialHome({ locale }: { locale: Locale }) {
  const t = copy[locale],
    words = editorial(locale);
  const featured = [serviceData[0], serviceData[9], serviceData[10]];
  return (
    <>
      <section className="hero editorial-hero">
        <figure className="hero-art">
          <img
            src="/images/botanical-editorial.webp"
            srcSet="/images/botanical-editorial-small.webp 768w, /images/botanical-editorial.webp 1400w"
            sizes="(max-width: 760px) 100vw, 60vw"
            alt={t.ui.concept}
            width="1400"
            height="933"
            fetchPriority="high"
          />
        </figure>
        <div className="hero-copy">
          <h1>{t.home.title}</h1>
          <p>{t.home.intro}</p>
          <div className="hero-actions">
            <Link className="button primary" href={href(locale, "/orcamento")}>
              {t.ui.quote}
            </Link>
            <Link className="hero-secondary" href={href(locale, "/farmacia")}>
              {t.home.secondary}
            </Link>
          </div>
        </div>
      </section>
      <section className="categories container">
        <div className="section-heading">
          <h2>{t.home.categoryTitle}</h2>
          <p>{t.home.categoryText}</p>
        </div>
        <CategoriesCarousel locale={locale} />
        <div className="section-end">
          <Link className="text-link" href={href(locale, "/servicos")}>
            {t.ui.all}
          </Link>
        </div>
      </section>
      <section className="story-section container">
        <div className="story-copy">
          <h2>{t.home.aboutTitle}</h2>
          <p>{t.home.aboutText}</p>
          <p>{t.home.aboutText2}</p>
          <Link className="button outline" href={href(locale, "/farmacia")}>
            {t.home.aboutLink}
          </Link>
        </div>
        <figure className="story-image">
          <img
            {...photoSource("/images/capsules.webp")}
            alt={t.ui.concept}
            width="1254"
            height="1254"
            loading="lazy"
          />
          <div className="story-seal">
            <img
              src="/images/mark.svg"
              alt="Cia da Terra"
              width="80"
              height="82"
            />
          </div>
        </figure>
      </section>
      <CareAccordion locale={locale} />
      <section className="featured-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>{t.home.featureTitle}</h2>
              <p>{t.home.featureText}</p>
            </div>
            <Link className="text-link" href={href(locale, "/servicos")}>
              {t.ui.all}
            </Link>
          </div>
          <div className="featured-grid">
            {featured.map((s) => {
              const c = serviceCopy(s, locale);
              return (
                <Link
                  className="feature-card"
                  key={s.slug}
                  href={href(locale, "/servicos/" + s.slug)}
                >
                  <div className="feature-image">
                    <img
                      {...photoSource(
                        s.slug === "dermocosmeticos"
                          ? "/images/skincare.webp"
                          : s.slug === "capsulas"
                            ? "/images/capsules.webp"
                            : "/images/botanical-editorial.webp",
                      )}
                      alt={
                        s.slug === "capsulas"
                          ? `${c.name}. ${t.ui.concept}`
                          : t.ui.concept
                      }
                      width="640"
                      height="480"
                      loading="lazy"
                    />
                  </div>
                  <div className="feature-body">
                    <h3>{c.name}</h3>
                    <p>{c.short}</p>
                    <span className="text-link">{t.ui.more}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="prescription-banner">
        <div className="container prescription-banner-inner">
          <div className="banner-copy">
            <h2>{t.home.bannerTitle}</h2>
            <p>{t.home.bannerText}</p>
          </div>
          <div className="banner-action">
            <Link
              className="button light"
              href={href(locale, "/enviar-receita")}
            >
              <FileUp size={21} strokeWidth={1.5} aria-hidden="true" />
              {t.ui.prescription}
            </Link>
          </div>
          <div className="banner-assurances">
            <div className="banner-assurance">
              <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.home.note}</span>
            </div>
            <div className="banner-assurance">
              <Truck size={24} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.prescription.delivery}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="social-editorial container">
        <figure>
          <img
            src="/images/botanical-editorial.webp"
            alt={t.ui.concept}
            width="1400"
            height="933"
            loading="lazy"
          />
        </figure>
        <div>
          <h2>{t.ui.footerTag}</h2>
          <p>{t.about.invitationText}</p>
          <h3>{words.socialTitle}</h3>
          <p>{words.socialText}</p>
          <div className="social-editorial-links">
            <a
              className="button outline"
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={19} />
              {words.socialLink}
            </a>
            <a
              className="social-circle"
              href={business.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </section>
      <section className="journal-section container">
        <div className="section-heading">
          <div>
            <h2>{t.home.journalTitle}</h2>
            <p>{t.home.journalText}</p>
          </div>
          <Link className="text-link" href={href(locale, "/blog")}>
            {t.ui.allContent}
          </Link>
        </div>
        <ArticleGrid locale={locale} />
      </section>
      <section className="practical-section container">
        <div>
          <h2>{t.ui.info}</h2>
          <p>{t.contact.intro}</p>
          <Link className="text-link" href={href(locale, "/contato")}>
            {t.ui.talk}
          </Link>
        </div>
        <Information locale={locale} />
      </section>
    </>
  );
}
