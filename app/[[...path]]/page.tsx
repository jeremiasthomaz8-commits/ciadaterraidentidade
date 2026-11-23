import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Home,
  About,
  Services,
  ServicePage,
  Contact,
  Prescription,
  Mascot,
  Blog,
  ArticlePage,
  Privacy,
} from "@/components/pages";
import {
  copy,
  serviceData,
  serviceCopy,
  href,
  origin,
  business,
  type Locale,
} from "@/content/site";
import { articles, articleCopy } from "@/content/articles";
import { Receipts } from "@/components/receipts";
import { intake } from "@/content/intake";
export const dynamicParams = false;
export const routes = [
  "",
  "farmacia",
  "nossa-mascote",
  "servicos",
  "contato",
  "enviar-receita",
  "orcamento",
  "blog",
  "privacidade",
  "atendimentos",
  ...serviceData.map((s) => "servicos/" + s.slug),
  ...articles.map((a) => "blog/" + a.slug),
];
export function generateStaticParams() {
  return routes.flatMap((route) => [
    { path: route ? route.split("/") : [] },
    { path: ["en", ...(route ? route.split("/") : [])] },
  ]);
}
function resolve(path: string[] = []) {
  const locale: Locale = path[0] === "en" ? "en" : "pt-BR";
  const route = (locale === "en" ? path.slice(1) : path).join("/");
  return { locale, route };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> {
  const { locale, route } = resolve((await params).path);
  const t = copy[locale];
  let title = t.home.title,
    description = t.home.intro;
  const titles: Record<string, [string, string]> = {
    farmacia: [t.ui.about, t.about.intro],
    servicos: [t.ui.services, t.services.intro],
    contato: [t.ui.contact, t.contact.intro],
    "enviar-receita": [t.ui.prescription, t.prescription.intro],
    orcamento: [t.ui.quote, t.prescription.quoteIntro],
    blog: [t.ui.blog, t.blog.intro],
    "nossa-mascote": [t.ui.mascot, t.mascot.intro],
    privacidade: [t.ui.privacy, t.privacy.intro],
    atendimentos: [intake(locale).adminTitle, intake(locale).adminIntro],
  };
  if (titles[route]) [title, description] = titles[route];
  const s = serviceData.find((s) => "servicos/" + s.slug === route);
  if (s) {
    const c = serviceCopy(s, locale);
    title = c.name;
    description = c.short;
  }
  const a = articles.find((a) => "blog/" + a.slug === route);
  if (a) {
    const c = articleCopy(a, locale);
    title = c.title;
    description = c.excerpt;
  }
  const url = origin + href(locale, "/" + route);
  return {
    metadataBase: new URL(origin),
    title: title + " | Cia da Terra",
    description,
    applicationName: "Cia da Terra",
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": origin + href("pt-BR", "/" + route),
        en: origin + href("en", "/" + route),
        "x-default": origin + href("pt-BR", "/" + route),
      },
    },
    robots: { index: false, follow: false },
    openGraph: {
      title: title + " | Cia da Terra",
      description,
      url,
      siteName: "Cia da Terra",
      locale: locale === "en" ? "en_US" : "pt_BR",
      alternateLocale: locale === "en" ? "pt_BR" : "en_US",
      type: a ? "article" : "website",
      images: [
        {
          url: "/images/botanical-editorial.webp",
          width: 1400,
          height: 933,
          alt: t.ui.concept,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | Cia da Terra",
      description,
      images: ["/images/botanical-editorial.webp"],
    },
    icons: { icon: "/images/favicon.svg" },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { locale, route } = resolve((await params).path);
  let page: React.ReactNode;
  if (route === "") page = <Home locale={locale} />;
  else if (route === "farmacia") page = <About locale={locale} />;
  else if (route === "servicos") page = <Services locale={locale} />;
  else if (route === "contato" || route === "orcamento")
    page = <Contact locale={locale} quote={route === "orcamento"} />;
  else if (route === "enviar-receita") page = <Prescription locale={locale} />;
  else if (route === "nossa-mascote") page = <Mascot locale={locale} />;
  else if (route === "blog") page = <Blog locale={locale} />;
  else if (route === "privacidade") page = <Privacy locale={locale} />;
  else if (route === "atendimentos") page = <Receipts locale={locale} />;
  else {
    const s = serviceData.find((s) => "servicos/" + s.slug === route);
    const a = articles.find((a) => "blog/" + a.slug === route);
    if (s) page = <ServicePage locale={locale} service={s} />;
    else if (a) page = <ArticlePage locale={locale} article={a} />;
    else notFound();
  }
  const currentArticle = articles.find((a) => "blog/" + a.slug === route);
  const schema = currentArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articleCopy(currentArticle, locale).title,
        datePublished: currentArticle.date,
        author: { "@type": "Organization", name: business.name },
        inLanguage: locale,
        url: origin + href(locale, "/" + route),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Pharmacy",
        name: business.name,
        url: origin + href(locale),
        telephone: "+551139638278",
        email: business.email,
        image: origin + "/images/logo.svg",
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address,
          addressLocality: "Jundiaí",
          addressRegion: "SP",
          postalCode: "13201-804",
          addressCountry: "BR",
        },
        sameAs: [business.instagram, business.facebook],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "08:00",
            closes: "12:00",
          },
        ],
      };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: copy[locale].ui.home,
        item: origin + href(locale),
      },
      ...(route
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: route.startsWith("servicos/")
                ? serviceCopy(
                    serviceData.find((s) => "servicos/" + s.slug === route)!,
                    locale,
                  ).name
                : currentArticle
                  ? articleCopy(currentArticle, locale).title
                  : route,
              item: origin + href(locale, "/" + route),
            },
          ]
        : []),
    ],
  };
  return (
    <>
      {page}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(crumbs).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
