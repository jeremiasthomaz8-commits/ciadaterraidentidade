export const brandAssets = "/brand-guide";

export function logoSource(number: number) {
  return `${brandAssets}/logos/logo-${String(number).padStart(2, "0")}.svg`;
}

export const chapters = [
  {
    id: "fundamentos",
    number: "01",
    title: "Fundamentos da marca",
    description:
      "O propósito da Cia da Terra e a forma como ele se traduz em atitude e linguagem.",
    items: [
      { id: "missao-e-visao", number: "01.1", title: "Missão e visão" },
      { id: "personalidade", number: "01.2", title: "Personalidade da marca" },
      { id: "voz-e-tom", number: "01.3", title: "Voz e tom" },
    ],
  },
  {
    id: "identidade-visual",
    number: "02",
    title: "Identidade visual",
    description:
      "As assinaturas, as cores e os elementos que tornam a marca reconhecível.",
    items: [
      { id: "logotipo-e-simbolo", number: "02.1", title: "Logotipo e símbolo" },
      { id: "paleta-de-cores", number: "02.2", title: "Paleta de cores" },
      { id: "tipografia", number: "02.3", title: "Tipografia" },
      { id: "iconografia", number: "02.4", title: "Iconografia" },
    ],
  },
  {
    id: "aplicacoes",
    number: "03",
    title: "Aplicações da marca",
    description:
      "A identidade em uso nas telas, nas redes sociais e nos materiais da farmácia.",
    items: [
      {
        id: "aplicacao-digital",
        number: "03.1",
        title: "Ícone e aplicação digital",
      },
      { id: "redes-sociais", number: "03.2", title: "Redes sociais" },
      {
        id: "aplicacoes-institucionais",
        number: "03.3",
        title: "Aplicações institucionais",
      },
    ],
  },
] as const;

export type Chapter = (typeof chapters)[number];
export type GuideSection = Chapter["items"][number];

export const palette = [
  {
    name: "Roxo",
    hex: "#980CEA",
    rgb: "152, 12, 234",
    token: "purple",
    use: "Cor principal para ações e pontos de ênfase. Em fundos amplos, use branco para os textos.",
  },
  {
    name: "Amarelo",
    hex: "#E5B30F",
    rgb: "229, 179, 15",
    token: "yellow",
    use: "Cor de destaque para detalhes e chamadas pontuais. Combine com texto escuro em áreas de leitura.",
  },
  {
    name: "Branco",
    hex: "#FFFFFF",
    rgb: "255, 255, 255",
    token: "white",
    use: "Base neutra para fundos e áreas de respiro. Também garante leitura sobre roxo e tons escuros.",
  },
] as const;

export const weights = [
  { value: 200, name: "Fina" },
  { value: 300, name: "Leve" },
  { value: 400, name: "Regular" },
  { value: 500, name: "Média" },
  { value: 600, name: "Seminegrito" },
  { value: 700, name: "Negrito" },
  { value: 900, name: "Preta" },
] as const;

export const typeScale = [
  { label: "H1", size: 80, weight: 700, sample: "Cuidado sob medida" },
  { label: "H2", size: 60, weight: 700, sample: "Toda pessoa é única" },
  { label: "H3", size: 44, weight: 600, sample: "Ciência em cada detalhe" },
  { label: "H4", size: 34, weight: 600, sample: "Atenção à sua rotina" },
  { label: "H5", size: 26, weight: 600, sample: "Conversas que orientam" },
  { label: "H6", size: 20, weight: 600, sample: "Farmácia de manipulação" },
  {
    label: "Texto amplo",
    size: 18,
    weight: 500,
    sample: "Cada formulação começa por entender o que você precisa.",
  },
  {
    label: "Texto",
    size: 16,
    weight: 400,
    sample:
      "Nossa equipe está disponível para conversar sobre a sua formulação.",
  },
  {
    label: "Legenda",
    size: 13,
    weight: 600,
    sample: "Exemplo de aplicação da marca",
  },
] as const;
