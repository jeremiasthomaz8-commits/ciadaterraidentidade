"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { logoSource, palette, weights } from "./guide-data";

const logoFamilies = [
  {
    name: "Fundo claro",
    tone: "light",
    start: 1,
    note: "Assinatura principal em amarelo e roxo. Prefira a versão horizontal quando houver espaço para ler o descritor.",
  },
  {
    name: "Fundo roxo",
    tone: "purple",
    start: 4,
    note: "Versão negativa com amarelo e branco, preparada para o roxo institucional.",
  },
  {
    name: "Fundo amarelo",
    tone: "yellow",
    start: 7,
    note: "Versão em branco e roxo. Use em escala generosa para preservar a leitura do logotipo.",
  },
  {
    name: "Branco",
    tone: "dark",
    start: 10,
    note: "Versão monocromática branca para fundos escuros com contraste uniforme.",
  },
  {
    name: "Preto",
    tone: "light",
    start: 13,
    note: "Versão monocromática preta para impressão em uma tinta e fundos claros.",
  },
] as const;

const lockups = [
  { label: "Assinatura horizontal", dimensions: [846, 198] },
  { label: "Assinatura empilhada", dimensions: [618, 470] },
  { label: "Símbolo", dimensions: [533, 534] },
] as const;

export function LogoGallery() {
  const [selected, setSelected] = useState(0);
  const family = logoFamilies[selected];

  return (
    <div className="logo-lab">
      <div
        className="guide-segments"
        role="group"
        aria-label="Versões do logotipo"
      >
        {logoFamilies.map((option, index) => (
          <button
            type="button"
            key={option.name}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {option.name}
          </button>
        ))}
      </div>
      <div className="logo-grid" key={family.name}>
        {lockups.map(({ label, dimensions }, index) => (
          <figure
            key={label}
            className={`logo-tile logo-tile-${index}`}
            data-tone={family.tone}
          >
            <div className="logo-image-frame">
              <img
                src={logoSource(family.start + index)}
                alt={`${label} Cia da Terra, ${family.name.toLowerCase()}`}
                width={dimensions[0]}
                height={dimensions[1]}
              />
            </div>
            <figcaption>
              {label}
              <a
                href={logoSource(family.start + index)}
                download
                aria-label={`Baixar SVG de ${label.toLowerCase()} — ${family.name.toLowerCase()}`}
              >
                <Download size={17} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="specimen-note" aria-live="polite">
        {family.note}
      </p>
    </div>
  );
}

export function ColorPalette() {
  const [status, setStatus] = useState<{ hex: string; copied: boolean }>();
  const [announcement, setAnnouncement] = useState("");

  async function copyColor(hex: string, target: HTMLSpanElement | null) {
    setAnnouncement("");
    try {
      if (!navigator.clipboard)
        throw new Error("Área de transferência indisponível");
      await navigator.clipboard.writeText(hex);
      setStatus({ hex, copied: true });
      setAnnouncement(`${hex} copiado para a área de transferência.`);
    } catch {
      const selection = window.getSelection();
      if (target && selection) {
        const range = document.createRange();
        range.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus({ hex, copied: false });
      setAnnouncement(`${hex}. Use o comando de copiar do dispositivo.`);
    }
  }

  return (
    <>
      <div className="palette-grid">
        {palette.map((color, index) => {
          const feedback = status?.hex === color.hex ? status : undefined;
          return (
            <article
              key={color.hex}
              className="palette-card"
              data-reveal="card"
              style={{ "--reveal-order": index } as React.CSSProperties}
            >
              <button
                type="button"
                className={`color-swatch color-${color.token}`}
                onClick={(event) =>
                  void copyColor(
                    color.hex,
                    event.currentTarget.querySelector("[data-hex]"),
                  )
                }
                aria-label={`Copiar HEX ${color.hex}, ${color.name}`}
              >
                <span className="swatch-name">{color.name}</span>
                <span className="swatch-meta">
                  <span>
                    <span data-hex>{color.hex}</span>
                    <span className="rgb-label">RGB {color.rgb}</span>
                  </span>
                  <span className="swatch-action">
                    {feedback?.copied ? (
                      <Check size={20} aria-hidden="true" />
                    ) : (
                      <Copy size={18} aria-hidden="true" />
                    )}
                    <span>
                      {feedback
                        ? feedback.copied
                          ? "Copiado"
                          : "Copie o HEX"
                        : "Copiar HEX"}
                    </span>
                  </span>
                </span>
              </button>
              <p>{color.use}</p>
            </article>
          );
        })}
      </div>
      <span className="guide-sr-only" role="status">
        {announcement}
      </span>
    </>
  );
}

export function TypeSpecimen() {
  const [weight, setWeight] = useState(600);
  const [italic, setItalic] = useState(false);
  const [sample, setSample] = useState("");
  return (
    <div className="type-lab">
      <div className="type-panel" data-reveal="image">
        <div className="type-hero">
          <span
            className="type-initial"
            style={{
              fontWeight: weight,
              fontStyle: italic ? "italic" : "normal",
            }}
            aria-hidden="true"
          >
            Aa
          </span>
          <div>
            <h4>Isidora Sans</h4>
            <p>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789
              <br />
              ÁÉÍÓÚ ÃÕ Ç áéíóú ãõ ç<br />! ? @ # % &amp; ( ) + / R$
            </p>
          </div>
        </div>
        <div className="type-controls">
          <label>
            Peso
            <select
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
            >
              {weights.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.name} · {option.value}
                </option>
              ))}
            </select>
          </label>
          <label className="type-italic">
            <input
              type="checkbox"
              checked={italic}
              onChange={(event) => setItalic(event.target.checked)}
            />{" "}
            Itálico
          </label>
          <label className="type-text-input">
            Texto de teste
            <input
              value={sample}
              placeholder="Digite para testar a fonte"
              maxLength={60}
              onChange={(event) => setSample(event.target.value)}
            />
          </label>
        </div>
        <p
          className="type-sample"
          style={{
            fontWeight: weight,
            fontStyle: italic ? "italic" : "normal",
          }}
        >
          {sample || "Seu cuidado, do seu jeito."}
        </p>
      </div>
      <div className="weight-grid" aria-label="Pesos disponíveis">
        {weights.map((option) => (
          <button
            type="button"
            key={option.value}
            aria-pressed={option.value === weight}
            onClick={() => setWeight(option.value)}
            aria-label={`Aplicar peso ${option.name} ${option.value}`}
          >
            <strong
              style={{
                fontWeight: option.value,
                fontStyle: italic ? "italic" : "normal",
              }}
            >
              Aa
            </strong>
            <span>{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
