import {
  Activity,
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  BookOpen,
  Check,
  Crosshair,
  FlaskConical,
  HeartHandshake,
  Leaf,
  Microscope,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stethoscope,
  X,
} from "lucide-react";
import {
  DigitalSpecimens,
  InstitutionalSpecimens,
} from "./application-specimens";
import {
  brandAssets,
  chapters,
  logoSource,
  typeScale,
  type Chapter,
  type GuideSection,
} from "./guide-data";
import { ColorPalette, LogoGallery, TypeSpecimen } from "./identity-lab";
import { GuideNavigation } from "./navigation";
import { SocialSpecimens } from "./social-specimens";

const personality = [
  {
    title: "Confiável",
    description:
      "Transmite segurança e responsabilidade em cada etapa do cuidado.",
    icon: ShieldCheck,
  },
  {
    title: "Acolhedora",
    description:
      "Escuta as pessoas e valoriza suas necessidades e individualidades.",
    icon: HeartHandshake,
  },
  {
    title: "Especialista",
    description:
      "Aplica conhecimento técnico com precisão e atenção à qualidade.",
    icon: FlaskConical,
  },
  {
    title: "Natural",
    description: "Aproxima ciência, saúde e equilíbrio com simplicidade.",
    icon: Sprout,
  },
  {
    title: "Contemporânea",
    description: "Evolui com clareza e mantém o cuidado próximo das pessoas.",
    icon: Sparkles,
  },
] as const;

const voiceExamples = [
  {
    use: "Seu cuidado merece uma fórmula pensada para você.",
    avoid: "Temos os melhores produtos do mercado!",
  },
  {
    use: "Qualidade e atenção em cada detalhe da sua formulação.",
    avoid: "Resultados incríveis garantidos!",
  },
  {
    use: "Converse com a nossa equipe se tiver dúvidas sobre a sua fórmula.",
    avoid: "Informe os dados para prosseguirmos com a demanda.",
  },
] as const;

const iconSpecimens = [
  { label: "Saúde", icon: Stethoscope },
  { label: "Cuidado", icon: HeartHandshake },
  { label: "Bem-estar", icon: Activity },
  { label: "Formulação", icon: FlaskConical },
  { label: "Precisão", icon: Crosshair },
  { label: "Qualidade", icon: BadgeCheck },
  { label: "Atendimento", icon: BookOpen },
  { label: "Natureza", icon: Leaf },
  { label: "Pesquisa", icon: Microscope },
] as const;

function Cover() {
  return (
    <div className="guide-cover-wrap">
      <section
        className="guide-cover"
        aria-labelledby="cover-title"
        id="inicio"
        tabIndex={-1}
      >
        <picture className="cover-picture">
          <source
            media="(max-width: 620px)"
            srcSet={`${brandAssets}/media/botanica-mobile.webp`}
          />
          <img
            src={`${brandAssets}/media/botanica.webp`}
            width={1536}
            height={1024}
            alt=""
            fetchPriority="high"
          />
        </picture>
        <div className="cover-inner">
          <div className="cover-label">
            <span aria-hidden="true" /> Farmácia de manipulação
          </div>
          <div className="cover-text">
            <h1 id="cover-title">
              <span>Guia de</span> <span>marca.</span>
            </h1>
            <p>Da ciência da formulação ao cuidado com cada pessoa.</p>
            <a href="#sumario" className="cover-cta">
              Explorar o guia <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="cover-signature">
          <img
            src={logoSource(4)}
            width={846}
            height={198}
            alt="Cia da Terra"
          />
        </div>
      </section>
      <nav
        aria-labelledby="cover-index-title"
        className="cover-index"
        id="sumario"
      >
        <h2 id="cover-index-title">Sumário</h2>
        <ol>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`}>
                <span>{chapter.number}</span>
                {chapter.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

function ChapterBlock({
  chapter,
  children,
}: {
  chapter: Chapter;
  children: React.ReactNode;
}) {
  return (
    <section
      className="brand-chapter"
      aria-labelledby={`${chapter.id}-titulo`}
      tabIndex={-1}
      id={chapter.id}
    >
      <header className="chapter-banner" data-chapter={chapter.number}>
        <span className="chapter-index">Capítulo {chapter.number}</span>
        <div className="chapter-copy" data-reveal="title">
          <h2 id={`${chapter.id}-titulo`}>{chapter.title}</h2>
          <p>{chapter.description}</p>
        </div>
        <img
          src={logoSource(chapter.number === "02" ? 12 : 3)}
          width={533}
          height={534}
          alt=""
          loading="lazy"
        />
      </header>
      {children}
    </section>
  );
}

function SectionBlock({
  section,
  description,
  children,
}: {
  section: GuideSection;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="brand-section"
      aria-labelledby={`${section.id}-titulo`}
      tabIndex={-1}
      id={section.id}
    >
      <header className="section-header" data-reveal="title">
        <span className="section-number">{section.number}</span>
        <div>
          <h3 id={`${section.id}-titulo`}>{section.title}</h3>
          <p>{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

function RevealedLine({ text }: { text: string }) {
  return (
    <p className="revealed-line" data-reveal="words">
      <span className="guide-sr-only">{text}</span>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{ "--word-order": index } as React.CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

function Foundation() {
  const chapter = chapters[0];
  return (
    <ChapterBlock chapter={chapter}>
      <SectionBlock
        section={chapter.items[0]}
        description="A missão orienta o cuidado de hoje. A visão expressa o que a Cia da Terra busca construir."
      >
        <div className="mission-grid">
          <article className="mission-card">
            <span className="mission-label">
              <span aria-hidden="true" /> Nossa missão
            </span>
            <RevealedLine text="Promover saúde e bem-estar com soluções farmacêuticas personalizadas, desenvolvidas com responsabilidade e atenção a cada pessoa." />
            <img
              alt=""
              src={logoSource(12)}
              width={533}
              height={534}
              loading="lazy"
            />
          </article>
          <article className="mission-card vision-card">
            <span className="mission-label">
              <span aria-hidden="true" /> Nossa visão
            </span>
            <RevealedLine text="Ser reconhecida pela excelência em manipulação farmacêutica, construindo relações de confiança e contribuindo para uma vida mais equilibrada." />
          </article>
        </div>
      </SectionBlock>
      <SectionBlock
        section={chapter.items[1]}
        description="Cinco atributos orientam as escolhas da marca, do atendimento à comunicação visual."
      >
        <div className="personality-grid">
          {personality.map(({ title, description, icon: Icon }, index) => (
            <article
              key={title}
              className="personality-card"
              data-reveal="card"
              style={{ "--reveal-order": index } as React.CSSProperties}
            >
              <span className="personality-icon">
                <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>
      <SectionBlock
        section={chapter.items[2]}
        description="A Cia da Terra fala de forma próxima, clara e segura. Explica termos técnicos quando eles ajudam e mantém o acolhimento em cada orientação."
      >
        <table className="voice-table">
          <thead>
            <tr>
              <th scope="col">
                <Check size={18} aria-hidden="true" /> Prefira
              </th>
              <th scope="col">
                <X size={18} aria-hidden="true" /> Evite
              </th>
            </tr>
          </thead>
          <tbody>
            {voiceExamples.map(({ use, avoid }, index) => (
              <tr
                key={use}
                data-reveal="card"
                style={{ "--reveal-order": index } as React.CSSProperties}
              >
                <td>“{use}”</td>
                <td>“{avoid}”</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionBlock>
    </ChapterBlock>
  );
}

function VisualIdentity() {
  const chapter = chapters[1];
  return (
    <ChapterBlock chapter={chapter}>
      <SectionBlock
        section={chapter.items[0]}
        description="A assinatura combina o símbolo, o nome Cia da Terra e o descritor da farmácia. Explore as versões originais para diferentes proporções e fundos."
      >
        <LogoGallery />
        <div className="logo-study">
          <figure className="symbol-grid" data-reveal="image">
            <div className="symbol-study-frame">
              <img
                src={logoSource(3)}
                alt="Símbolo circular da Cia da Terra sobre malha de referência"
                width={533}
                height={534}
                loading="lazy"
              />
            </div>
            <figcaption>Malha de observação do símbolo</figcaption>
          </figure>
          <div className="logo-guidance">
            <div>
              <h4>Forma e leitura</h4>
              <p>
                O contorno quase circular reúne curvas orgânicas. O perfil de
                uma ave aparece no encontro dessas curvas, definido pelo espaço
                entre as formas e por um ponto que marca o olho.
              </p>
            </div>
            <div>
              <h4>Área de proteção</h4>
              <p>
                Reserve espaço ao redor da assinatura para que o símbolo, o nome
                e o descritor respirem. Mantenha as proporções de cada arquivo e
                escolha uma versão que contraste com o fundo.
              </p>
            </div>
            <div>
              <h4>Em espaços reduzidos</h4>
              <p>
                Use o símbolo isolado para ícones e avatares. Quando houver
                espaço para ler o descritor, use a assinatura completa.
              </p>
            </div>
          </div>
        </div>
      </SectionBlock>
      <SectionBlock
        section={chapter.items[1]}
        description="O roxo estabelece a presença da marca, o amarelo pontua e o branco dá respiro. Selecione uma cor para copiar o código HEX."
      >
        <ColorPalette />
      </SectionBlock>
      <SectionBlock
        section={chapter.items[2]}
        description="Isidora Sans organiza a comunicação da Cia da Terra, dos títulos de campanha aos campos de uma interface."
      >
        <TypeSpecimen />
        <div className="alviona-note">
          <figure className="alviona-example">
            <p className="alviona-specimen">A ciência do cuidado</p>
            <figcaption>Amostra em Alviona</figcaption>
          </figure>
          <div className="alviona-description">
            <h4>Tipografia de exibição</h4>
            <p>
              Alviona, fonte fornecida com a identidade, tem traços de contraste
              marcado e desenho ornamental. A assinatura da marca usa os
              contornos fixos dos SVGs originais. A comunicação e as interfaces
              usam Isidora Sans.
            </p>
          </div>
        </div>
        <div className="scale-panel">
          <h4>Hierarquia tipográfica</h4>
          <dl>
            {typeScale.map(({ label, sample, size, weight }) => (
              <div className="scale-row" key={label}>
                <dt>
                  {label}
                  <small>
                    {size} px · {weight}
                  </small>
                </dt>
                <dd
                  style={
                    {
                      "--sample-size": `${size}px`,
                      "--weight": weight,
                    } as React.CSSProperties
                  }
                >
                  {sample}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </SectionBlock>
      <SectionBlock
        section={chapter.items[3]}
        description="Ícones sobre uma base de 24 × 24 px, com traço de 1,5 px e cantos arredondados. Use rótulos sempre que o significado depender do contexto."
      >
        <ul className="icon-specimens">
          {iconSpecimens.map(({ label, icon: Icon }, index) => (
            <li
              key={label}
              data-reveal="card"
              style={{ "--reveal-order": index % 3 } as React.CSSProperties}
            >
              <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </SectionBlock>
    </ChapterBlock>
  );
}

function Applications() {
  const chapter = chapters[2];
  return (
    <ChapterBlock chapter={chapter}>
      <SectionBlock
        section={chapter.items[0]}
        description="O símbolo isolado ocupa espaços compactos. A assinatura completa reaparece quando a área permite ler o nome e o descritor."
      >
        <DigitalSpecimens />
      </SectionBlock>
      <SectionBlock
        section={chapter.items[1]}
        description="Exemplos para Instagram com uma mensagem por peça. Alterne o formato para ver publicações, carrossel e stories."
      >
        <SocialSpecimens />
      </SectionBlock>
      <SectionBlock
        section={chapter.items[2]}
        description="Estudos de como a identidade se aplica às embalagens, às etiquetas e aos materiais de atendimento."
      >
        <InstitutionalSpecimens />
      </SectionBlock>
    </ChapterBlock>
  );
}

function GuideFooter() {
  return (
    <footer className="guide-footer">
      <div>
        <img
          width={846}
          height={198}
          alt="Cia da Terra"
          src={logoSource(4)}
          loading="lazy"
        />
        <a href="#inicio" className="footer-top">
          <ArrowUp size={18} aria-hidden="true" /> Voltar ao início
        </a>
      </div>
    </footer>
  );
}

export default function BrandGuidePage() {
  return (
    <GuideNavigation cover={<Cover />} footer={<GuideFooter />}>
      <Foundation />
      <VisualIdentity />
      <Applications />
    </GuideNavigation>
  );
}
