"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  copy,
  href,
  serviceData,
  serviceCopy,
  whatsapp,
  type Locale,
} from "@/content/site";
import { articles, articleCopy } from "@/content/articles";
import { serviceIcons, WhatsAppIcon } from "./icons";
export function CategoriesCarousel({ locale }: { locale: Locale }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const en = locale === "en";
  function geometry(element: HTMLDivElement) {
    const style = getComputedStyle(element);
    const count = Number(style.getPropertyValue("--category-count")) || 1;
    const item = element.querySelector<HTMLElement>(".category");
    const step =
      (item?.getBoundingClientRect().width ?? element.clientWidth) +
      (parseFloat(style.columnGap) || 0);
    return { count, step, last: Math.max(0, serviceData.length - count) };
  }
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () =>
      setEdges({
        start: element.scrollLeft < 2,
        end:
          element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(() => {
      const { step, last } = geometry(element);
      const index = Math.min(
        last,
        Math.max(0, Math.round(element.scrollLeft / step)),
      );
      element.scrollTo({ left: index * step, behavior: "instant" });
      update();
    });
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const { count, step, last } = geometry(element);
    const index = Math.round(element.scrollLeft / step);
    const next = Math.min(last, Math.max(0, index + direction * count));
    element.scrollTo({
      left: next * step,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div className="category-carousel">
      <button
        className="carousel-control"
        aria-label={en ? "Previous solutions" : "Soluções anteriores"}
        aria-controls="solutions-carousel"
        disabled={edges.start}
        onClick={() => move(-1)}
      >
        <ChevronLeft size={22} />
      </button>
      <div
        ref={rail}
        id="solutions-carousel"
        className="category-row"
        role="region"
        aria-label={en ? "Available solutions" : "Soluções disponíveis"}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {serviceData.map((s, i) => {
          const c = serviceCopy(s, locale);
          const Icon = serviceIcons[s.slug];
          return (
            <Link
              href={href(locale, "/servicos/" + s.slug)}
              className="category"
              key={s.slug}
            >
              <span className={"category-circle tone-" + (i % 4)}>
                <Icon strokeWidth={1.4} size={48} aria-hidden="true" />
              </span>
              <span>{c.name}</span>
            </Link>
          );
        })}
      </div>
      <button
        className="carousel-control"
        aria-label={en ? "Next solutions" : "Próximas soluções"}
        aria-controls="solutions-carousel"
        disabled={edges.end}
        onClick={() => move(1)}
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
export function ServiceGrid({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const t = copy[locale];
  const visible = serviceData.filter((s) => {
    const c = serviceCopy(s, locale);
    return (c.name + " " + c.short)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(
        query
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase(),
      );
  });
  return (
    <>
      <div className="search-field">
        <Search size={20} />
        <label className="sr-only" htmlFor="solution-search">
          {t.ui.search}
        </label>
        <input
          id="solution-search"
          type="search"
          placeholder={t.ui.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button aria-label={t.ui.clear} onClick={() => setQuery("")}>
            <X size={18} />
          </button>
        )}
      </div>
      <div className="solutions-grid" aria-live="polite">
        {visible.map((s) => {
          const c = serviceCopy(s, locale);
          const Icon = serviceIcons[s.slug];
          return (
            <Link
              className="solution-card"
              key={s.slug}
              href={href(locale, "/servicos/" + s.slug)}
            >
              <span className="solution-icon">
                <Icon size={32} strokeWidth={1.3} />
              </span>
              <h2>{c.name}</h2>
              <p>{c.short}</p>
              <span className="text-link">{t.ui.more}</span>
            </Link>
          );
        })}
      </div>
      {visible.length === 0 && (
        <p role="status" className="empty-results">
          {t.ui.results}
        </p>
      )}
    </>
  );
}
export function ArticleGrid({
  locale,
  filter = false,
}: {
  locale: Locale;
  filter?: boolean;
}) {
  const [category, setCategory] = useState("all");
  const t = copy[locale];
  const categories = [...new Set(articles.map((a) => a.category[locale]))];
  return (
    <>
      {filter && (
        <div className="filter-row" role="group" aria-label={t.ui.blog}>
          <button
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            {t.blog.all}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="articles-grid">
        {articles
          .filter((a) => category === "all" || a.category[locale] === category)
          .slice()
          .reverse()
          .map((a) => {
            const c = articleCopy(a, locale);
            return (
              <article className="article-card" key={a.slug}>
                <Link
                  href={href(locale, "/blog/" + a.slug)}
                  className="article-image"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={a.image}
                    alt=""
                    width="640"
                    height="420"
                    loading="lazy"
                  />
                </Link>
                <div className="article-meta">
                  <span>{a.category[locale]}</span>
                  <time dateTime={a.date}>
                    {new Intl.DateTimeFormat(locale, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(a.date))}
                  </time>
                </div>
                <h3>
                  <Link href={href(locale, "/blog/" + a.slug)}>{c.title}</Link>
                </h3>
                <p>{c.excerpt}</p>
                <Link
                  className="text-link"
                  href={href(locale, "/blog/" + a.slug)}
                >
                  {t.ui.read}
                  <span className="sr-only">: {c.title}</span>
                </Link>
              </article>
            );
          })}
      </div>
    </>
  );
}
export function ContactForm({
  locale,
  quote = false,
}: {
  locale: Locale;
  quote?: boolean;
}) {
  const [preparedUrl, setPreparedUrl] = useState("");
  const t = copy[locale];
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fields = [
      `${t.contact.name}: ${data.get("name")}`,
      `${t.contact.emailLabel}: ${data.get("email")}`,
      `${t.contact.phone}: ${data.get("phone")}`,
      quote ? `${t.prescription.interest}: ${data.get("service")}` : "",
      `${t.contact.message}: ${data.get("message")}`,
    ]
      .filter(Boolean)
      .join("\n");
    const url = whatsapp(
      (locale === "en" ? "Hello, Cia da Terra!" : "Olá, Cia da Terra!") +
        "\n\n" +
        fields,
    );
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onInvalid={(e) => {
        const field = e.target as HTMLInputElement;
        field.setCustomValidity(
          field.validity.valueMissing
            ? t.contact.invalidRequired
            : field.validity.typeMismatch
              ? t.contact.invalidEmail
              : field.validity.tooShort
                ? t.contact.invalidPhone
                : "",
        );
      }}
      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
    >
      <h2>{quote ? t.ui.quote : t.contact.formTitle}</h2>
      <p>{t.contact.formText}</p>
      <label htmlFor="contact-name">{t.contact.name} *</label>
      <input
        id="contact-name"
        name="name"
        autoComplete="name"
        maxLength={100}
        required
      />
      <div className="form-columns">
        <div>
          <label htmlFor="contact-email">
            {t.contact.emailLabel}
            {quote ? " *" : ""}
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            autoComplete="email"
            maxLength={160}
            required={quote}
          />
        </div>
        <div>
          <label htmlFor="contact-phone">{t.contact.phone} *</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            minLength={8}
            required
          />
        </div>
      </div>
      {quote && (
        <>
          <label htmlFor="contact-service">{t.prescription.interest} *</label>
          <select id="contact-service" name="service" required defaultValue="">
            <option value="" disabled>
              {t.prescription.choose}
            </option>
            {serviceData.map((s) => (
              <option key={s.slug}>{serviceCopy(s, locale).name}</option>
            ))}
          </select>
        </>
      )}
      <label htmlFor="contact-message">{t.contact.message} *</label>
      <textarea
        id="contact-message"
        name="message"
        rows={4}
        maxLength={2000}
        required
        placeholder={t.contact.placeholder}
      />
      <label className="checkbox-label">
        <input type="checkbox" required />
        <span>
          {t.contact.consent}{" "}
          <Link href={href(locale, "/privacidade")}>{t.ui.privacy}</Link>
        </span>
      </label>
      <button className="button primary" type="submit">
        <WhatsAppIcon />
        {t.contact.submit}
      </button>
      <p className="form-help">{t.contact.notice}</p>
      {preparedUrl && (
        <p className="form-status" role="status">
          {t.contact.opened}{" "}
          <a
            className="text-link"
            href={preparedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.ui.openWhatsApp}
          </a>
        </p>
      )}
      <p className="form-help">{t.contact.privacyText}</p>
    </form>
  );
}
export function Information({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState<number | null>(null);
  const t = copy[locale];
  const rows = [
    [t.contact.hours, t.ui.hours + " " + t.ui.sunday],
    [
      t.contact.address,
      "Rua Anchieta, 214 — Vila Boaventura. Jundiaí, SP — CEP 13201-804.",
    ],
    [t.prescription.delivery, t.prescription.deliveryText],
  ];
  return (
    <div className="information">
      {rows.map(([title, text], i) => (
        <div className="information-row" key={title}>
          <h3>
            <button
              id={"info-label-" + i}
              aria-expanded={open === i}
              aria-controls={"info-panel-" + i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {title}
              {open === i ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </h3>
          <div
            id={"info-panel-" + i}
            role="region"
            aria-labelledby={"info-label-" + i}
            hidden={open !== i}
          >
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
