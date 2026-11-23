import "../globals.css";
import "../brand-update.css";
import "../intake.css";
import "../editorial.css";
import { Providers } from "@/components/providers";
import { Header, Footer, SocialDock } from "@/components/shell";
import { copy, type Locale } from "@/content/site";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ path?: string[] }>;
}) {
  const { path = [] } = await params;
  const locale: Locale = path[0] === "en" ? "en" : "pt-BR";
  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={{ ui: copy[locale].ui }}>
          <Header locale={locale} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
          <SocialDock locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
