import Link from "next/link";
import {
  Target,
  Eye,
  Leaf,
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  Clock,
  Check,
  FileText,
  Flower2,
  Truck,
} from "lucide-react";
import {
  copy,
  business,
  href,
  whatsapp,
  serviceData,
  serviceCopy,
  imageFor,
  type Locale,
  type Service,
} from "@/content/site";
import { articles, articleCopy } from "@/content/articles";
import {
  ArticleGrid,
  ContactForm,
  Information,
  ServiceGrid,
} from "./interactive";
import { serviceIcons, WhatsAppIcon } from "./icons";
import { PrescriptionForm } from "./prescription-form";
import { intake } from "@/content/intake";
import { EditorialHome } from "./home-editorial";
import { photoSource } from "@/content/media";
export function Breadcrumb({
  locale,
  items = [],
}: {
  locale: Locale;
  items?: { label: string; path?: string }[];
}) {
  return (
    <nav
      className="breadcrumbs container"
      aria-label={locale === "en" ? "Breadcrumb" : "Caminho de navegação"}
    >
      <Link href={href(locale)}>{copy[locale].ui.home}</Link>
      {items.map((i, n) => (
        <span key={n}>
          <span aria-hidden="true">/</span>
          {i.path ? (
            <Link href={href(locale, i.path)}>{i.label}</Link>
          ) : (
            <span aria-current="page">{i.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function ContactBanner({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="closing-section container">
      <div>
        <Flower2 size={29} strokeWidth={1.3} />
        <h2>{t.home.closingTitle}</h2>
        <p>{t.home.closingText}</p>
      </div>
      <a
        href={whatsapp()}
        className="button primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
        {t.ui.talk}
      </a>
    </section>
  );
}
export function Home({ locale }: { locale: Locale }) {
  return (
    <>
      <EditorialHome locale={locale} />
      <ContactBanner locale={locale} />
    </>
  );
}
export function About({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: t.ui.about }]} />
      <section className="about-hero container">
        <div>
          <h1>{t.about.title}</h1>
          <p className="lead">{t.about.intro}</p>
        </div>
        <figure>
          <img
            src="/images/botanical.webp"
            alt={t.ui.concept}
            width="640"
            height="800"
          />
        </figure>
      </section>
      <section className="about-story container">
        <h2>{t.home.aboutTitle}</h2>
        <div>
          {t.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
      <section className="principles container">
        {[
          [t.about.mission, t.about.missionText],
          [t.about.vision, t.about.visionText],
          [t.about.values, t.about.valuesText],
        ].map(([title, text], index) => {
          const Icon = [Target, Eye, HeartHandshake][index];
          return (
            <div key={title}>
              <span className="principle-icon">
                <Icon size={34} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          );
        })}
      </section>
      <section className="about-invitation container">
        <Leaf size={32} />
        <h2>{t.about.invitation}</h2>
        <p>{t.about.invitationText}</p>
        <h3>{t.about.qualityTitle}</h3>
        <p>{t.about.qualityText}</p>
      </section>
      <section className="mascot-teaser container">
        <img
          src="/images/gaia.webp"
          alt="Gaia"
          width="200"
          height="240"
          loading="lazy"
        />
        <div>
          <h2>{t.mascot.title}</h2>
          <p>{t.mascot.subtitle}</p>
          <Link className="text-link" href={href(locale, "/nossa-mascote")}>
            {t.ui.more}
          </Link>
        </div>
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
export function Services({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: t.ui.services }]} />
      <section className="page-intro container">
        <h1>{t.services.title}</h1>
        <p>{t.services.intro}</p>
      </section>
      <section className="container services-list">
        <ServiceGrid locale={locale} />
      </section>
      <section className="services-question container">
        <h2>{t.services.none}</h2>
        <p>{t.services.noneText}</p>
        <Link href={href(locale, "/contato")} className="button primary">
          {t.ui.talk}
        </Link>
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
export function ServicePage({
  locale,
  service,
}: {
  locale: Locale;
  service: Service;
}) {
  const t = copy[locale];
  const c = serviceCopy(service, locale);
  const Icon = serviceIcons[service.slug];
  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[{ label: t.ui.services, path: "/servicos" }, { label: c.name }]}
      />
      <section className="service-hero container">
        <div>
          <span className="service-title-icon">
            <Icon size={36} strokeWidth={1.2} />
          </span>
          <h1>{c.name}</h1>
          <p className="lead">{c.short}</p>
          <Link className="button primary" href={href(locale, "/orcamento")}>
            {t.ui.quote}
          </Link>
        </div>
        <figure>
          <img
            {...photoSource(
              service.slug === "dermocosmeticos"
                ? "/images/skincare.webp"
                : imageFor(service),
            )}
            alt={
              service.slug === "capsulas"
                ? `${c.name}. ${t.ui.concept}`
                : t.ui.concept
            }
            width="740"
            height="560"
          />
        </figure>
      </section>
      <section className="service-body container">
        <div>
          <h2>{t.services.heading}</h2>
          <p>{c.text}</p>
          {service.slug === "hormonios" && (
            <p className="medical-note">{t.services.hormone}</p>
          )}
          <p className="service-guidance">{t.services.important}</p>
          <Link className="text-link" href={href(locale, "/contato")}>
            {t.ui.talk}
          </Link>
        </div>
        <div className="service-options">
          <h2>{t.services.options}</h2>
          <ul>
            {c.items.map((i) => (
              <li key={i}>
                <Check size={18} />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="related-services container">
        <div className="section-heading">
          <h2>{t.services.related}</h2>
          <Link className="text-link" href={href(locale, "/servicos")}>
            {t.ui.all}
          </Link>
        </div>
        <div className="related-row">
          {serviceData
            .filter((s) => s.slug !== service.slug)
            .slice(0, 4)
            .map((s) => {
              const RelatedIcon = serviceIcons[s.slug];
              return (
                <Link key={s.slug} href={href(locale, "/servicos/" + s.slug)}>
                  <RelatedIcon size={26} />
                  <span>{serviceCopy(s, locale).name}</span>
                </Link>
              );
            })}
        </div>
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
export function Contact({
  locale,
  quote = false,
}: {
  locale: Locale;
  quote?: boolean;
}) {
  const t = copy[locale];
  const map =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(business.address + " " + business.city);
  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[{ label: quote ? t.ui.quote : t.ui.contact }]}
      />
      <section className="page-intro container">
        <h1>{quote ? t.prescription.quoteTitle : t.contact.title}</h1>
        <p>{quote ? t.prescription.quoteIntro : t.contact.intro}</p>
      </section>
      <section className="contact-layout container">
        <div className="contact-details">
          <div className="contact-item">
            <Phone />
            <div>
              <h2>{t.contact.phones}</h2>
              <a href="tel:+551139638278">{business.phone}</a>
              <a href="tel:+551139638279">{business.phone2}</a>
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
                WhatsApp: (11) 96120-5406
              </a>
            </div>
          </div>
          <div className="contact-item">
            <Mail />
            <div>
              <h2>{t.contact.email}</h2>
              <a href={"mailto:" + business.email}>{business.email}</a>
            </div>
          </div>
          <div className="contact-item">
            <MapPin />
            <div>
              <h2>{t.contact.address}</h2>
              <p>
                {business.address}
                <br />
                {business.city}
              </p>
              <a
                className="text-link"
                href={map}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.ui.directions}
              </a>
            </div>
          </div>
          <div className="contact-item">
            <Clock />
            <div>
              <h2>{t.contact.hours}</h2>
              <p>
                {t.ui.hours}
                <br />
                {t.ui.sunday}
              </p>
            </div>
          </div>
          <div className="visit-note">
            <h3>{quote ? t.prescription.delivery : t.contact.visit}</h3>
            <p>{quote ? t.prescription.deliveryText : t.contact.visitText}</p>
          </div>
        </div>
        <div>
          <ContactForm locale={locale} quote={quote} />
          {quote && (
            <div className="quote-upload-link">
              <p>{intake(locale).quoteHelp}</p>
              <Link
                className="button outline"
                href={href(locale, "/enviar-receita")}
              >
                {intake(locale).quoteLink}
              </Link>
            </div>
          )}
        </div>
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
export function Prescription({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const upload = intake(locale);
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: t.ui.prescription }]} />
      <section className="intake-layout container">
        <div>
          <h1>{upload.title}</h1>
          <p className="lead">{upload.intro}</p>
          <div className="intake-trust">
            <FileText size={27} />
            <div>
              <h2>{upload.confidential}</h2>
              <p>{upload.confidentialText}</p>
            </div>
          </div>
        </div>
        <PrescriptionForm locale={locale} />
      </section>
      <section className="steps container">
        <ol>
          {t.prescription.steps.map(([title, text]) => (
            <li key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="delivery-note container">
        <Truck size={32} />
        <div>
          <h2>{t.prescription.delivery}</h2>
          <p>{t.prescription.deliveryText}</p>
        </div>
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
export function Mascot({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: t.ui.mascot }]} />
      <section className="mascot-hero container">
        <div>
          <h1>{t.mascot.title}</h1>
          <p className="lead">{t.mascot.intro}</p>
        </div>
        <div className="gaia-stage">
          <img
            src="/images/gaia.webp"
            alt="Gaia — Cia da Terra"
            width="440"
            height="520"
          />
        </div>
      </section>
      <section className="mascot-facts container">
        {t.mascot.sections.map(([title, text]) => (
          <div key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
export function Blog({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: t.ui.blog }]} />
      <section className="page-intro container">
        <h1>{t.blog.title}</h1>
        <p>{t.blog.intro}</p>
      </section>
      <section className="blog-list container">
        <ArticleGrid locale={locale} filter />
      </section>
      <ContactBanner locale={locale} />
    </>
  );
}
export function ArticlePage({
  locale,
  article,
}: {
  locale: Locale;
  article: (typeof articles)[number];
}) {
  const t = copy[locale];
  const c = articleCopy(article, locale);
  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[{ label: t.ui.blog, path: "/blog" }, { label: c.title }]}
      />
      <article className="article-page">
        <header className="article-header container">
          <h1>{c.title}</h1>
          <p className="lead">{c.excerpt}</p>
          <div className="article-byline">
            <span>{t.ui.author}</span>
            <time dateTime={article.date}>
              {new Intl.DateTimeFormat(locale, {
                dateStyle: "long",
                timeZone: "UTC",
              }).format(new Date(article.date))}
            </time>
          </div>
        </header>
        <figure className="article-cover container">
          <img
            src={article.image}
            alt={t.ui.concept}
            width="1200"
            height="650"
          />
        </figure>
        <div className="article-prose">
          {c.sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          <p className="medical-note">{t.blog.notice}</p>
          <Link className="button outline" href={href(locale, "/blog")}>
            {t.ui.allContent}
          </Link>
        </div>
      </article>
      <ContactBanner locale={locale} />
    </>
  );
}
export function Privacy({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: t.ui.privacy }]} />
      <section className="page-intro container">
        <h1>{t.privacy.title}</h1>
        <p>{t.privacy.intro}</p>
      </section>
      <div className="article-prose privacy-prose">
        {t.privacy.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <a className="text-link" href={"mailto:" + business.email}>
          {business.email}
        </a>
      </div>
    </>
  );
}
