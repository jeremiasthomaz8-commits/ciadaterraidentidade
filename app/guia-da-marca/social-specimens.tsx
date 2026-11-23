"use client";

import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  Layers,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState } from "react";
import { logoSource } from "./guide-data";

const formats = [
  { id: "feed", title: "Publicações" },
  { id: "carousel", title: "Carrossel" },
  { id: "stories", title: "Stories" },
] as const;

const publications = [
  {
    category: "Institucional",
    title: "Seu cuidado, do seu jeito.",
    tone: "photo",
    logo: 4,
  },
  {
    category: "Educativo",
    title: "Ciência e atenção em cada fórmula.",
    tone: "cream",
    logo: 1,
  },
  {
    category: "Divulgação",
    title: "Personalização que começa em você.",
    tone: "violet",
    logo: 4,
  },
] as const;

const carousel = [
  {
    title: "Como nasce uma fórmula?",
    description: "Um olhar sobre a manipulação farmacêutica.",
    tone: "violet",
    logo: 4,
  },
  {
    title: "Uma conversa sobre o que você precisa.",
    description:
      "A orientação farmacêutica ajuda a esclarecer dúvidas sobre a sua formulação.",
    tone: "cream",
    logo: 1,
  },
  {
    title: "Mais cuidado em cada detalhe.",
    description: "Conte com a equipe para entender como guardar a sua fórmula.",
    tone: "photo",
    logo: 4,
  },
] as const;

const stories = [
  {
    title: "Mais cuidado em cada detalhe.",
    description: "Cia da Terra · Farmácia de manipulação",
    tone: "photo",
    logo: 4,
  },
  {
    title: "Sua fórmula começa com atenção.",
    description: "Sua rotina faz parte da conversa.",
    tone: "violet",
    logo: 4,
  },
] as const;

function SocialArtwork({
  title,
  description,
  tone,
  logo,
  cover,
}: {
  title: string;
  description?: string;
  tone: string;
  logo: number;
  cover?: boolean;
}) {
  return (
    <div className={`social-artwork artwork-${tone}`}>
      <div className="artwork-header">
        <img
          src={logoSource(logo)}
          alt="Cia da Terra"
          width={846}
          height={198}
          loading="lazy"
        />
        {cover && <Layers size={18} aria-label="Capa de carrossel" />}
      </div>
      {tone !== "photo" && (
        <img
          className="artwork-symbol"
          src={logoSource(tone === "cream" ? 3 : 12)}
          width={533}
          height={534}
          alt=""
          loading="lazy"
        />
      )}
      <div className="artwork-text">
        <strong>{title}</strong>
        {description && <small>{description}</small>}
      </div>
    </div>
  );
}

export function SocialSpecimens() {
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("feed");
  const [page, setPage] = useState(0);
  const sequence = format === "stories" ? stories : carousel;

  function changePage(direction: number) {
    setPage(
      (current) => (current + direction + sequence.length) % sequence.length,
    );
  }

  return (
    <div className="social-lab">
      <div
        className="guide-segments"
        role="group"
        aria-label="Formatos para Instagram"
      >
        {formats.map((option) => (
          <button
            type="button"
            key={option.id}
            aria-pressed={format === option.id}
            onClick={() => {
              setPage(0);
              setFormat(option.id);
            }}
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className="social-stage" key={format}>
        {format === "feed" ? (
          <div className="feed-grid">
            {publications.map((item) => (
              <figure className="feed-card" key={item.category}>
                <div className="feed-account">
                  <img
                    src={logoSource(3)}
                    width={28}
                    height={28}
                    alt=""
                    loading="lazy"
                  />
                  <span>Cia da Terra</span>
                  <Camera size={18} aria-hidden="true" />
                </div>
                <SocialArtwork {...item} />
                <div className="feed-actions" aria-hidden="true">
                  <Heart size={16} />
                  <MessageCircle size={16} />
                  <Send size={16} />
                </div>
                <figcaption>{item.category}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div
            className={`social-sequence sequence-${format}`}
            role="region"
            aria-label={
              format === "stories"
                ? "Sequência de stories"
                : "Prévia do carrossel"
            }
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                changePage(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
          >
            <div className="sequence-preview" key={page}>
              {format === "stories" && (
                <div className="stories-bars" aria-hidden="true">
                  {sequence.map((item, index) => (
                    <span key={item.title} data-seen={index <= page} />
                  ))}
                </div>
              )}
              <SocialArtwork
                {...sequence[page]}
                cover={format === "carousel" && page === 0}
              />
            </div>
            <div className="sequence-controls">
              <button
                type="button"
                aria-label="Ver peça anterior"
                onClick={() => changePage(-1)}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span aria-live="polite">
                {page + 1} de {sequence.length}
                <span className="guide-sr-only"> — {sequence[page].title}</span>
              </span>
              <button
                type="button"
                aria-label="Ver próxima peça"
                onClick={() => changePage(1)}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
