import { LockKeyhole, Wifi } from "lucide-react";
import { brandAssets, logoSource } from "./guide-data";

function ApplicationFigure({
  scene,
  media,
  title,
  caption,
  label,
  children,
}: {
  scene: string;
  media: string;
  title: string;
  caption: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="application-figure" data-reveal="image">
      <div
        className={`application-scene ${scene}`}
        role="img"
        aria-label={label}
      >
        <img
          className="scene-background"
          src={`${brandAssets}/media/${media}.webp`}
          width={1440}
          height={960}
          alt=""
          loading="lazy"
        />
        <div aria-hidden="true">{children}</div>
      </div>
      <figcaption className="application-caption">
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function DigitalDetails() {
  return (
    <div className="digital-details">
      <section className="digital-resolution" data-reveal="card">
        <h4>Símbolo em diferentes tamanhos</h4>
        <div className="resolution-row">
          {[96, 64, 32, 16].map((size) => (
            <figure key={size}>
              <div className="resolution-icon">
                <img
                  src={logoSource(3)}
                  width={size}
                  height={size}
                  alt=""
                  loading="lazy"
                />
              </div>
              <figcaption>{size} px</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="browser-detail" data-reveal="card">
        <h4>Favicon na aba do navegador</h4>
        <div className="browser-shell">
          <div className="browser-strip">
            <span className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-tab">
              <img
                src={logoSource(3)}
                alt=""
                width={16}
                height={16}
                loading="lazy"
              />
              Cia da Terra
            </span>
          </div>
          <span className="browser-address">
            <LockKeyhole size={13} aria-hidden="true" />{" "}
            ciadaterrafarmacia.com.br
          </span>
        </div>
      </section>
    </div>
  );
}

export function DigitalSpecimens() {
  return (
    <>
      <ApplicationFigure
        scene="digital-scene"
        media="dispositivos-editorial"
        title="Site e experiência móvel"
        caption="A assinatura no site e o símbolo no ícone do aplicativo."
        label="Mockup de um notebook com o site da Cia da Terra e de um celular com o ícone do aplicativo, em um cenário de estúdio roxo."
      >
        <div className="device-display laptop-display">
          <div className="laptop-site-top">
            <img
              src={logoSource(1)}
              alt=""
              width={846}
              height={198}
              loading="lazy"
            />
            <span>A farmácia</span>
            <span>Serviços</span>
            <span>Atendimento</span>
          </div>
          <div className="laptop-site-hero">
            <div>
              <small>Farmácia de manipulação</small>
              <strong>Cuidado feito para você.</strong>
              <span>Conheça a farmácia</span>
            </div>
            <div className="laptop-site-photo" />
          </div>
          <div className="laptop-site-bottom">
            <span>Manipulação</span>
            <span>Atendimento farmacêutico</span>
          </div>
        </div>
        <div className="device-display mobile-display">
          <div className="mobile-status">
            <span>9:41</span>
            <Wifi aria-hidden="true" />
          </div>
          <div className="mobile-app-icon">
            <img
              src={logoSource(6)}
              alt=""
              width={533}
              height={534}
              loading="lazy"
            />
          </div>
          <span className="mobile-app-name">Cia da Terra</span>
          <span className="mobile-handle" />
        </div>
      </ApplicationFigure>
      <DigitalDetails />
    </>
  );
}

export function InstitutionalSpecimens() {
  return (
    <div className="print-gallery">
      <ApplicationFigure
        scene="packaging-scene"
        media="embalagens-editorial"
        title="Embalagem, etiqueta e sacola"
        caption="Assinaturas aplicadas sobre papel claro, rótulo fosco e sacola roxa."
        label="Embalagem branca, frasco âmbar com etiqueta e sacola roxa, com as assinaturas originais da Cia da Terra sobre uma base de pedra."
      >
        <div className="scene-print carton-print">
          <img
            src={logoSource(2)}
            alt=""
            width={618}
            height={470}
            loading="lazy"
          />
          <div className="carton-information">
            <strong>Embalagem conceitual</strong>
            <span>Amostra de apresentação</span>
          </div>
        </div>
        <div className="scene-print jar-print">
          <img
            src={logoSource(1)}
            alt=""
            width={846}
            height={198}
            loading="lazy"
          />
          <span>Amostra visual</span>
        </div>
        <img
          className="scene-print bag-print"
          src={logoSource(4)}
          alt=""
          width={846}
          height={198}
          loading="lazy"
        />
      </ApplicationFigure>
      <ApplicationFigure
        scene="stationery-scene"
        media="papelaria-editorial"
        title="Cartões e papelaria"
        caption="Papel timbrado, envelope e cartões em aplicações complementares."
        label="Composição vista de cima com papel timbrado, envelope lilás e dois cartões institucionais sobre uma superfície texturizada."
      >
        <div className="scene-print letterhead-print">
          <img
            src={logoSource(1)}
            alt=""
            width={846}
            height={198}
            loading="lazy"
          />
          <span>Atendimento farmacêutico</span>
          <div className="letterhead-footer">
            Cia da Terra · Farmácia de manipulação
          </div>
        </div>
        <div className="scene-print envelope-print">
          <img
            src={logoSource(3)}
            alt=""
            width={533}
            height={534}
            loading="lazy"
          />
        </div>
        <img
          className="scene-print purple-card-print"
          src={logoSource(4)}
          alt=""
          width={846}
          height={198}
          loading="lazy"
        />
        <div className="scene-print ivory-card-print">
          <img
            src={logoSource(3)}
            alt=""
            width={533}
            height={534}
            loading="lazy"
          />
          <span>
            Atendimento
            <br />
            farmacêutico
          </span>
        </div>
      </ApplicationFigure>
    </div>
  );
}
