import "./globals.css";
import "./brand-update.css";
import "./intake.css";
import "./editorial.css";
export default function NotFound() {
  return (
    <html lang="pt-BR">
      <body>
        <main className="not-found">
          <h1>Vamos encontrar o seu caminho.</h1>
          <p>
            Esta página não foi encontrada. Explore as soluções da Cia da Terra
            ou volte ao início.
          </p>
          <a className="button primary" href="/">
            Voltar ao início
          </a>
          <a href="/en/">Read in English</a>
        </main>
      </body>
    </html>
  );
}
