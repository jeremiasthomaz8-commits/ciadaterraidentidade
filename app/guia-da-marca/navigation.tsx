"use client";

import { ArrowUp, List, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { chapters, logoSource } from "./guide-data";

function Contents({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const current = chapters.find(
    (chapter) =>
      chapter.id === active || chapter.items.some((item) => item.id === active),
  );

  return (
    <ol className="contents-list">
      {chapters.map((chapter) => (
        <li key={chapter.id} data-current-chapter={chapter.id === current?.id}>
          <a
            className="contents-chapter"
            href={`#${chapter.id}`}
            aria-current={active === chapter.id ? "location" : undefined}
            onClick={onNavigate}
          >
            <span>{chapter.number}</span>
            {chapter.title}
          </a>
          <ul>
            {chapter.items.map((item) => (
              <li key={item.id}>
                <a
                  className="contents-item"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  onClick={onNavigate}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

const sectionIds = chapters.flatMap((chapter) => [
  chapter.id,
  ...chapter.items.map((item) => item.id),
]);

export function GuideNavigation({
  cover,
  children,
  footer,
}: {
  cover: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id));
    let frame = 0;
    const update = () => {
      frame = 0;
      const baseline =
        (headerRef.current?.offsetHeight ?? 66) +
        Math.min(window.innerHeight * 0.23, 180);
      const index = sections.findLastIndex(
        (section) =>
          section !== null && section.getBoundingClientRect().top <= baseline,
      );
      setActive(sectionIds[index] ?? "");
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range
        ? Math.min(1, Math.max(0, window.scrollY / range))
        : 0;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const size = new ResizeObserver(schedule);
    size.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      size.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const sync = () => {
      observer?.disconnect();
      if (motion.matches) {
        targets.forEach((target) => {
          delete target.dataset.revealState;
        });
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.revealState = "shown";
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -28px", threshold: 0.04 },
      );
      for (const target of targets) {
        if (target.getBoundingClientRect().top > window.innerHeight) {
          target.dataset.revealState = "waiting";
          observer.observe(target);
        }
      }
    };
    motion.addEventListener("change", sync);
    sync();
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  const closeMenu = () => {
    dialogRef.current?.close();
    setMenuOpen(false);
  };

  const navigateFromMenu: React.MouseEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    const { hash } = event.currentTarget;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    closeMenu();
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <a className="guide-skip" href="#conteudo-guia">
        Pular para o conteúdo
      </a>
      <header className="guide-header" ref={headerRef}>
        <div className="guide-header-inner">
          <a
            href="#inicio"
            className="header-home"
            aria-label="Cia da Terra, início do guia"
          >
            <img src={logoSource(1)} width={846} height={198} alt="" />
          </a>
          <a className="header-index" href="#sumario">
            <List size={17} aria-hidden="true" /> Sumário
          </a>
          <button
            type="button"
            className="header-menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="guide-mobile-menu"
            onClick={() => {
              dialogRef.current?.showModal();
              setMenuOpen(true);
            }}
          >
            <List size={19} aria-hidden="true" /> Sumário
          </button>
        </div>
        <div className="guide-progress" ref={progressRef} aria-hidden="true" />
      </header>
      <dialog
        className="guide-dialog"
        id="guide-mobile-menu"
        ref={dialogRef}
        aria-labelledby="guide-dialog-title"
        onClose={() => setMenuOpen(false)}
      >
        <div className="guide-dialog-head">
          <h2 id="guide-dialog-title">Sumário</h2>
          <button type="button" aria-label="Fechar sumário" onClick={closeMenu}>
            <X size={23} />
          </button>
        </div>
        <nav aria-label="Sumário para celular">
          <Contents active={active} onNavigate={navigateFromMenu} />
        </nav>
        <a className="guide-top" href="#inicio" onClick={navigateFromMenu}>
          <ArrowUp size={17} aria-hidden="true" /> Voltar ao início
        </a>
      </dialog>
      <main>
        {cover}
        <div className="guide-layout">
          <aside className="guide-rail">
            <nav aria-label="Sumário do guia">
              <p className="rail-title">Neste guia</p>
              <Contents active={active} />
              <a className="guide-top" href="#inicio">
                <ArrowUp size={16} aria-hidden="true" /> Voltar ao início
              </a>
            </nav>
          </aside>
          <div className="guide-content" id="conteudo-guia" tabIndex={-1}>
            {children}
          </div>
        </div>
      </main>
      {footer}
    </>
  );
}
