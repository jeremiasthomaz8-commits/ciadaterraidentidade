"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, MapPin, ChevronDown } from "lucide-react";
import {
  business,
  copy,
  href,
  whatsapp,
  serviceData,
  serviceCopy,
  type Locale,
} from "@/content/site";
import { editorial } from "@/content/editorial";
import { WhatsAppIcon, Instagram, Facebook } from "./icons";

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("ui");
  const words = editorial(locale);
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  const groupButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const route = path.replace(/^\/en(?=\/|$)/, "").replace(/\/$/, "") || "/";
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("cia-language");
    } catch {
      /* Locale URLs remain usable. */
    }
    if (saved === "en" && locale === "pt-BR")
      window.location.replace("/en" + (route === "/" ? "/" : route + "/"));
  }, []);
  useEffect(() => {
    setOpen(false);
    setGroup(null);
  }, [path]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open && !group) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (group) {
          setGroup(null);
          groupButtons.current[group]?.focus();
        } else {
          setOpen(false);
          toggle.current?.focus();
        }
      }
      if (event.key === "Tab" && open) {
        const links = [
          ...(nav.current?.querySelectorAll<HTMLElement>(
            "a[href],button:not([disabled])",
          ) ?? []),
        ].filter((e) => e.getClientRects().length > 0);
        const controls = [
          ...links,
          ...(toggle.current ? [toggle.current] : []),
        ];
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setGroup(null);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, group]);
  function changeGroup(name: string) {
    setGroup((current) => (current === name ? null : name));
  }
  function focusGroup(name: string, id: string, last = false) {
    setGroup(name);
    requestAnimationFrame(() => {
      const links = [
        ...(document
          .getElementById(id)
          ?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []),
      ].filter((link) => link.getClientRects().length > 0);
      if (links?.length) links[last ? links.length - 1 : 0].focus();
    });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <div className="topline">
        <span>
          <MapPin size={13} />
          {t("location")}
        </span>
        <a href="tel:+551139638278">{business.phone}</a>
      </div>
      <header
        ref={header}
        className={"header" + (scrolled ? " is-scrolled" : "")}
      >
        <div className="header-inner">
          <Link href={href(locale)} className="brand" aria-label="Cia da Terra">
            <img
              src="/images/logo.svg"
              alt="Cia da Terra — Farmácia de Manipulação"
              width="206"
              height="54"
            />
          </Link>
          <nav
            ref={nav}
            id="primary-navigation"
            className={open ? "navigation is-open" : "navigation"}
            aria-label={t("navigation")}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) {
                setGroup(null);
                setOpen(false);
              }
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setGroup(null);
            }}
          >
            <Link
              href={href(locale)}
              aria-current={route === "/" ? "page" : undefined}
            >
              {t("home")}
            </Link>
            <div className="nav-group">
              <button
                ref={(e) => {
                  groupButtons.current.institution = e;
                }}
                className="nav-trigger"
                aria-expanded={group === "institution"}
                aria-controls="institution-menu"
                onClick={() => changeGroup("institution")}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    focusGroup(
                      "institution",
                      "institution-menu",
                      e.key === "ArrowUp",
                    );
                  }
                }}
              >
                {words.institution}
                <ChevronDown size={14} />
              </button>
              <div
                className="nav-popover institution-menu"
                id="institution-menu"
                hidden={group !== "institution"}
              >
                <Link
                  href={href(locale, "/farmacia")}
                  aria-current={route === "/farmacia" ? "page" : undefined}
                >
                  {t("about")}
                </Link>
                <Link href={href(locale, "/nossa-mascote")}>{t("mascot")}</Link>
                <Link href={href(locale, "/privacidade")}>{t("privacy")}</Link>
              </div>
            </div>
            <div className="nav-group">
              <button
                ref={(e) => {
                  groupButtons.current.services = e;
                }}
                className="nav-trigger"
                aria-expanded={group === "services"}
                aria-controls="solutions-menu"
                onClick={() => changeGroup("services")}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    focusGroup(
                      "services",
                      "solutions-menu",
                      e.key === "ArrowUp",
                    );
                  }
                }}
              >
                {t("services")}
                <ChevronDown size={14} />
              </button>
              <div
                className="nav-popover nav-mega"
                id="solutions-menu"
                hidden={group !== "services"}
              >
                <div className="mega-intro">
                  <h2>{words.serviceMenu}</h2>
                  <p>{copy[locale].services.intro}</p>
                  <Link
                    className="button outline"
                    href={href(locale, "/servicos")}
                  >
                    {words.allServices}
                  </Link>
                </div>
                <div className="mega-links">
                  {serviceData.map((s) => (
                    <Link
                      key={s.slug}
                      href={href(locale, "/servicos/" + s.slug)}
                      aria-current={
                        route === "/servicos/" + s.slug ? "page" : undefined
                      }
                    >
                      {serviceCopy(s, locale).name}
                    </Link>
                  ))}
                </div>
                <Link className="mega-all" href={href(locale, "/servicos")}>
                  {words.allServices}
                </Link>
              </div>
            </div>
            <Link
              href={href(locale, "/blog")}
              aria-current={route.startsWith("/blog") ? "page" : undefined}
            >
              {t("blog")}
            </Link>
            <Link
              href={href(locale, "/contato")}
              aria-current={route === "/contato" ? "page" : undefined}
            >
              {t("contact")}
            </Link>
            <Link
              className="mobile-quote button outline"
              href={href(locale, "/orcamento")}
            >
              {t("quote")}
            </Link>
            <Link
              className="mobile-upload"
              href={href(locale, "/enviar-receita")}
            >
              {t("prescription")}
            </Link>
          </nav>
          <div className="header-actions">
            <div className="language" role="group" aria-label={t("language")}>
              {(["pt-BR", "en"] as const).map((l) => (
                <Link
                  key={l}
                  href={href(l, route)}
                  lang={l}
                  hrefLang={l}
                  aria-current={locale === l ? "true" : undefined}
                  aria-label={
                    l === "en" ? "Read in English" : "Ler em português"
                  }
                  onClick={() => {
                    try {
                      localStorage.setItem("cia-language", l);
                    } catch {
                      /* Destination encodes locale. */
                    }
                  }}
                >
                  {l === "en" ? "EN" : "PT"}
                </Link>
              ))}
            </div>
            <Link
              className="button gold header-quote"
              href={href(locale, "/orcamento")}
            >
              {t("quote")}
            </Link>
            <button
              ref={toggle}
              type="button"
              className="menu-toggle"
              aria-label={open ? t("close") : t("menu")}
              aria-expanded={open}
              aria-controls="primary-navigation"
              onClick={() => {
                setOpen(!open);
                setGroup(null);
              }}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale].ui;
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href={href(locale)}>
            <img
              src="/images/logo.svg"
              alt="Cia da Terra"
              width="225"
              height="59"
            />
          </Link>
          <p>{t.footerText}</p>
          <div className="footer-social">
            <a
              href={business.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
            <a
              href={business.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </a>
            <a
              href={whatsapp()}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
        <div>
          <h2>{t.navigation}</h2>
          <Link href={href(locale, "/farmacia")}>{t.about}</Link>
          <Link href={href(locale, "/servicos")}>{t.services}</Link>
          <Link href={href(locale, "/nossa-mascote")}>{t.mascot}</Link>
          <Link href={href(locale, "/blog")}>{t.blog}</Link>
          <Link href={href(locale, "/privacidade")}>{t.privacy}</Link>
        </div>
        <div>
          <h2>{editorial(locale).serviceLinks}</h2>
          {serviceData
            .filter((s) =>
              [
                "capsulas",
                "gomas",
                "chocolates",
                "dermocosmeticos",
                "manipulacao-magistral",
              ].includes(s.slug),
            )
            .map((s) => (
              <Link key={s.slug} href={href(locale, "/servicos/" + s.slug)}>
                {serviceCopy(s, locale).name}
              </Link>
            ))}
          <Link href={href(locale, "/servicos")}>
            {editorial(locale).allServices}
          </Link>
        </div>
        <div>
          <h2>{t.visit}</h2>
          <p>
            {business.address}
            <br />
            {business.city}
          </p>
          <p>
            {t.hours}
            <br />
            {t.sunday}
          </p>
        </div>
        <div>
          <h2>{t.channels}</h2>
          <a href="tel:+551139638278">{business.phone}</a>
          <a href="tel:+551139638279">{business.phone2}</a>
          <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
            WhatsApp: (11) 96120-5406
          </a>
          <a className="footer-email" href={"mailto:" + business.email}>
            {business.email}
          </a>
        </div>
      </div>
      <div className="container footer-legal">
        <p>
          {t.legalName}: {business.company} | CNPJ: {business.cnpj}
          <br />
          {t.responsible}: {business.pharmacist} | CRF: {business.crf}
        </p>
        <div>
          <span>
            © {new Date().getFullYear()} Cia da Terra. {t.copyright}
          </span>
          <span>{t.footerTag}</span>
        </div>
      </div>
    </footer>
  );
}
export function SocialDock({ locale }: { locale: Locale }) {
  const [expanded, setExpanded] = useState(false);
  const t = copy[locale].ui;
  return (
    <aside
      className={"social-dock" + (expanded ? " expanded" : "")}
      aria-label={t.social}
    >
      <div id="social-options" className="social-options">
        <a
          href={business.facebook}
          aria-label="Facebook"
          title="Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook size={20} />
        </a>
        <a
          href={business.instagram}
          aria-label="Instagram"
          title="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={20} />
        </a>
      </div>
      <a
        className="whatsapp"
        href={whatsapp()}
        aria-label={t.openWhatsApp}
        title="WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
      </a>
      <button
        className="social-toggle"
        aria-label={t.social}
        aria-controls="social-options"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <X size={19} /> : <MessageCircle size={19} />}
      </button>
    </aside>
  );
}
