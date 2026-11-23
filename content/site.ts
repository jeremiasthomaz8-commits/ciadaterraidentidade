export type Locale = "pt-BR" | "en";
export const origin =
  "https://cia-da-terra-redesign.pagamentosjeremias.chatgpt.site";
export const business = {
  name: "Cia da Terra",
  phone: "(11) 3963-8278",
  phone2: "(11) 3963-8279",
  whatsapp: "5511961205406",
  email: "comercial@ciadaterrafarmacia.com.br",
  address: "Rua Anchieta, 214 — Vila Boaventura",
  city: "Jundiaí, SP — CEP 13201-804",
  company: "A. T. Dollo - Farmácia de Manipulação Ltda - ME",
  cnpj: "17.974.022/0001-55",
  pharmacist: "Aline Tamara Dollo",
  crf: "4545-2/SP",
  instagram: "https://www.instagram.com/ciadaterrafarmaciamanipulacao",
  facebook: "https://www.facebook.com/ciadaterrafarmacia",
};
export const href = (locale: Locale, path = "") =>
  (locale === "en" ? "/en" : "") + (path === "/" ? "" : path) + "/";
export const whatsapp = (message = "") =>
  "https://wa.me/" +
  business.whatsapp +
  (message ? "?text=" + encodeURIComponent(message) : "");
export const copy = {
  "pt-BR": {
    ui: {
      home: "Início",
      about: "A farmácia",
      services: "Nossas soluções",
      blog: "Conteúdos",
      contact: "Contato",
      mascot: "Nossa mascote",
      quote: "Solicitar orçamento",
      prescription: "Enviar receita",
      menu: "Abrir menu",
      close: "Fechar menu",
      skip: "Ir para o conteúdo",
      language: "Selecionar idioma",
      social: "Nossos canais",
      more: "Saiba mais",
      all: "Ver todas as soluções",
      talk: "Fale com a gente",
      read: "Ler conteúdo",
      privacy: "Privacidade",
      back: "Voltar para as soluções",
      hours: "Segunda a sexta, 8h às 18h. Sábados, 8h às 12h.",
      copyright: "Todos os direitos reservados.",
      concept: "Composição conceitual de botânica e manipulação.",
      photo: "Imagem ilustrativa.",
      location: "Farmácia de manipulação em Jundiaí",
      search: "Buscar uma solução",
      results: "Nenhuma solução encontrada. Tente outro termo.",
      clear: "Limpar busca",
      details: "Conheça as possibilidades",
      openWhatsApp: "Conversar no WhatsApp",
      directions: "Como chegar",
      allContent: "Ver todos os conteúdos",
      author: "Cia da Terra",
      reading: "Leitura",
      minutes: "min",
      footerTag: "Onde o cuidado nasce do respeito.",
      footerText:
        "Ciência, natureza e cuidado humano em fórmulas que respeitam a sua individualidade.",
      navigation: "Explore",
      visit: "Venha nos visitar",
      channels: "Vamos conversar",
      responsible: "Farmacêutica responsável",
      legalName: "Razão social",
      sunday: "Domingos: fechado",
      info: "Informações de atendimento",
    },
    home: {
      eyebrow: "Ciência, natureza e cuidado humano",
      title: "Cada fórmula conta uma história única.",
      intro:
        "A sua. Unimos conhecimento farmacêutico e um olhar atento às suas necessidades para cuidar de você, com respeito à sua individualidade.",
      secondary: "Conheça a Cia da Terra",
      note: "Um cuidado que começa com a escuta.",
      categoryTitle: "O cuidado também tem a sua forma.",
      categoryText:
        "Diferentes possibilidades, a mesma atenção a cada detalhe.",
      aboutTitle: "A ciência encontra o afeto.",
      aboutText:
        "Somos uma farmácia de manipulação que valoriza o tempo dedicado à escuta, o olhar atento às necessidades individuais e o equilíbrio entre ciência e natureza.",
      aboutText2:
        "Nosso trabalho vai além da entrega de fórmulas: buscamos gerar confiança, acolhimento e impacto real na vida de quem passa por aqui.",
      aboutLink: "Conheça nossa história",
      featureTitle: "Pensado para o seu jeito de cuidar.",
      featureText: "Conheça algumas das soluções da Cia da Terra.",
      valuesTitle: "Pessoas únicas. Um cuidado pessoal.",
      values: [
        [
          "Escuta e acolhimento",
          "O tempo dedicado a entender as necessidades de cada pessoa.",
        ],
        [
          "Conhecimento farmacêutico",
          "Atenção à prescrição e aos detalhes de cada fórmula.",
        ],
        ["Ciência e natureza", "Uma conexão que faz parte da nossa essência."],
      ],
      bannerTitle: "Sua receita é o começo de uma conversa.",
      bannerText:
        "Fale com a nossa equipe e receba orientação para solicitar seu orçamento.",
      journalTitle: "Conhecer também é cuidar.",
      journalText: "Conteúdos sobre manipulação, saúde e bem-estar.",
      closingTitle: "Vamos cuidar da sua história?",
      closingText: "Nossa equipe está pronta para ouvir você.",
    },
    about: {
      title: "Onde o cuidado nasce do respeito.",
      intro:
        "A Cia da Terra – Farmácia de Manipulação nasceu da conexão entre ciência, natureza e cuidado humano. Acreditamos que cada pessoa é única e, por isso, cada fórmula também deve ser.",
      paragraphs: [
        "Unimos conhecimento farmacêutico, excelência técnica e saberes ancestrais para desenvolver soluções personalizadas, respeitando a individualidade, o corpo e a história de cada paciente. Aqui, a farmácia é feita por mãos que cuidam, com atenção aos detalhes, ética e compromisso com a saúde integral.",
        "Nosso trabalho vai além da produção: é um processo artesanal, consciente e responsável, onde tecnologia e humanização caminham juntas. Valorizamos a integralidade, a transparência e a personalização, criando fórmulas que refletem equilíbrio, qualidade e propósito.",
        "A Cia da Terra é onde a ciência encontra o afeto, e onde cada fórmula carrega uma história única.",
      ],
      mission: "Nossa missão",
      missionText:
        "Proporcionar soluções farmacêuticas personalizadas que respeitam a individualidade de cada pessoa, unindo conhecimento científico e sabedoria ancestral para promover saúde integral. Aqui a farmácia ainda é feita por mãos que cuidam, e não somente por máquinas que produzem.",
      vision: "Nossa visão",
      visionText:
        "Ser reconhecida como referência em farmácia de manipulação humanizada, onde a excelência técnica se encontra com o cuidado artesanal, inspirando uma nova geração a valorizar o atendimento personalizado e a conexão com a natureza.",
      values: "Nossos valores",
      valuesText:
        "Personalização, humanização, conexão com a natureza, excelência técnica, artesania, integralidade, ética e transparência.",
      invitation: "Aqui, quem acredita no cuidado encontra pertencimento.",
      invitationText:
        "Convidamos médicos, profissionais da saúde, parceiros e pacientes que acreditam em um cuidado mais humano e respeitoso a caminhar conosco.",
      qualityTitle: "Atenção em cada etapa",
      qualityText:
        "Nosso processo envolve análise farmacêutica, preparação individualizada e controle de qualidade. A equipe valoriza a atenção aos detalhes, a documentação e a rastreabilidade do preparo.",
    },
    services: {
      title: "Um cuidado feito para você.",
      intro:
        "Explore as formas farmacêuticas e os serviços apresentados pela Cia da Terra. Nossa equipe orienta sobre as possibilidades de cada formulação.",
      heading: "Sobre esta solução",
      options: "Possibilidades e características",
      important:
        "A escolha da formulação e a dosagem dependem da avaliação profissional e, quando aplicável, da prescrição. Não inicie ou altere um tratamento por conta própria.",
      related: "Outras formas de cuidar",
      hormone:
        "Hormônios são manipulados exclusivamente sob prescrição médica.",
      none: "Não encontrou o que procura?",
      noneText: "Fale com nossos farmacêuticos sobre a sua necessidade.",
    },
    contact: {
      title: "O cuidado começa com uma conversa.",
      intro:
        "Estamos em Jundiaí, prontos para receber você. Escolha como prefere falar com a nossa equipe.",
      phones: "Telefones",
      email: "E-mail",
      address: "Endereço",
      hours: "Horários de atendimento",
      visit: "Visite nossa farmácia",
      visitText:
        "Venha conhecer nossa estrutura e conversar pessoalmente com nossos farmacêuticos. Há estacionamento disponível nas proximidades.",
      formTitle: "Como podemos ajudar?",
      formText:
        "Prepare uma mensagem e continue o atendimento pelo WhatsApp oficial.",
      name: "Seu nome",
      emailLabel: "E-mail",
      phone: "Telefone",
      message: "Mensagem",
      placeholder:
        "Conte como podemos ajudar. Não inclua receitas ou dados de saúde aqui.",
      submit: "Continuar no WhatsApp",
      notice: "Você poderá revisar a mensagem no WhatsApp antes de enviá-la.",
      invalidRequired: "Preencha este campo.",
      invalidEmail: "Informe um e-mail válido.",
      invalidPhone: "Informe um telefone com pelo menos 8 caracteres.",
      opened:
        "Sua mensagem está pronta. Revise e envie no WhatsApp para concluir.",
      consent: "Li o aviso de privacidade e quero continuar pelo WhatsApp.",
      required: "Campos obrigatórios",
      privacyText:
        "Seus dados são usados apenas para preparar a conversa. Este formulário não armazena mensagens no site.",
    },
    prescription: {
      title: "Envie sua receita ou guia.",
      intro:
        "Envie seus documentos e observações para a equipe analisar sua solicitação e preparar o orçamento.",
      steps: [
        [
          "Fale com a equipe",
          "Selecione sua receita, guia ou análise e preencha os dados de contato.",
        ],
        [
          "Receba orientação",
          "Escreva suas observações e envie os documentos na mesma solicitação.",
        ],
        [
          "Solicite seu orçamento",
          "Após a análise da prescrição, retornamos com o orçamento em até 24 horas. Confirme as condições de preparo e entrega com a equipe.",
        ],
      ],
      button: "Pedir orientação sobre minha receita",
      note: "Não envie receitas ou dados de saúde neste site. Consulte a equipe sobre o canal apropriado.",
      delivery: "Entrega para todo o Brasil",
      deliveryText: "Confirme prazo, disponibilidade e condições com a equipe.",
      quoteTitle: "Seu orçamento, com atenção pessoal.",
      quoteIntro:
        "Conte qual solução procura e continue a conversa com a nossa equipe. O orçamento é sem compromisso.",
      interest: "Solução de interesse",
      choose: "Selecione uma solução",
      message:
        "Olá! Gostaria de orientação para enviar minha receita à Cia da Terra.",
    },
    mascot: {
      title: "Conheça a Gaia.",
      subtitle: "Nossa mascote oficial",
      intro:
        "Gaia tem origem grega. Na mitologia grega, é a personificação da Mãe Terra, uma divindade primordial que surgiu do caos e gerou os céus, as montanhas e o mar, sendo a mãe de todos os seres vivos e deuses.",
      sections: [
        [
          "Mitologia grega",
          "Gaia é a deusa-mãe, representando a fertilidade, a força da natureza e a base estável para o mundo. Ela é considerada a mãe primordial que gerou Urano (céu), Ponto (mar) e os titãs.",
        ],
        [
          "Significado",
          "Evoca a essência vital, o solo nutriente e a proteção da vida.",
        ],
        [
          "Etimologia",
          "É uma forma épica ou poética relacionada ao grego ático Gē e dórico Ga.",
        ],
      ],
    },
    blog: {
      title: "Conhecer também é cuidar.",
      intro:
        "Um espaço para entender a manipulação e conversar sobre saúde, natureza e bem-estar.",
      all: "Todos",
      notice:
        "Conteúdo informativo. A indicação de tratamentos e suplementos depende de avaliação individual por profissional habilitado.",
      related: "Continue a leitura",
      date: "Publicado em",
    },
    privacy: {
      title: "Privacidade e cuidado com seus dados.",
      intro:
        "Este aviso descreve o funcionamento desta versão do site. Os canais externos possuem suas próprias políticas de privacidade.",
      sections: [
        [
          "Navegação",
          "As páginas são informativas. Não usamos ferramentas de publicidade, analytics ou cookies de marketing nesta versão. A hospedagem pode processar dados técnicos de acesso para funcionamento e segurança.",
        ],
        [
          "Preferência de idioma",
          "O idioma selecionado é salvo no armazenamento local do seu navegador. Você pode remover essa preferência limpando os dados do site.",
        ],
        [
          "Contato",
          "Os formulários apenas preparam uma mensagem para abrir no WhatsApp. O site não armazena o conteúdo digitado. A mensagem só é enviada quando você confirma no WhatsApp.",
        ],
        [
          "Receitas e informações de saúde",
          "O formulário de documentos recebe receitas, guias de exames, análises e observações com sua autorização. Os arquivos ficam em armazenamento privado, vinculados à solicitação, com consulta restrita à equipe autorizada. Não geramos links públicos para documentos. O acesso expira em 30 dias; a exclusão ocorre pelas rotinas de limpeza ou por solicitação à equipe.",
        ],
        [
          "Seus direitos e solicitações",
          "Para informações sobre o tratamento de dados realizado pela farmácia ou para exercer seus direitos, entre em contato pelo e-mail comercial@ciadaterrafarmacia.com.br.",
        ],
      ],
    },
  },
  en: {
    ui: {
      home: "Home",
      about: "Our pharmacy",
      services: "Our solutions",
      blog: "Insights",
      contact: "Contact",
      mascot: "Our mascot",
      quote: "Request a quote",
      prescription: "Your prescription",
      menu: "Open menu",
      close: "Close menu",
      skip: "Skip to content",
      language: "Select language",
      social: "Our channels",
      more: "Learn more",
      all: "Explore all solutions",
      talk: "Talk to us",
      read: "Read article",
      privacy: "Privacy",
      back: "Back to solutions",
      hours: "Monday to Friday, 8 am–6 pm. Saturdays, 8 am–12 pm.",
      copyright: "All rights reserved.",
      concept: "Conceptual botanical and compounding still life.",
      photo: "Illustrative image.",
      location: "Compounding pharmacy in Jundiaí",
      search: "Find a solution",
      results: "No solutions found. Try another search.",
      clear: "Clear search",
      details: "Explore the possibilities",
      openWhatsApp: "Chat on WhatsApp",
      directions: "Get directions",
      allContent: "Explore all insights",
      author: "Cia da Terra",
      reading: "Reading time",
      minutes: "min",
      footerTag: "Care begins with respect.",
      footerText:
        "Science, nature and human care in formulations that respect your individuality.",
      navigation: "Explore",
      visit: "Visit our pharmacy",
      channels: "Let’s talk",
      responsible: "Pharmacist in charge",
      legalName: "Registered company",
      sunday: "Sundays: closed",
      info: "Practical information",
    },
    home: {
      eyebrow: "Science, nature and human care",
      title: "Every formula tells a unique story.",
      intro:
        "Yours. We bring pharmaceutical knowledge and attention to your individual needs together to care for you with respect.",
      secondary: "Discover Cia da Terra",
      note: "Care that begins with listening.",
      categoryTitle: "Care comes in your own form.",
      categoryText:
        "Different possibilities. The same attention to every detail.",
      aboutTitle: "Where science meets care.",
      aboutText:
        "We are a compounding pharmacy that values time spent listening, attention to individual needs and the balance between science and nature.",
      aboutText2:
        "Our work goes beyond delivering formulations: we seek to build trust, offer a warm welcome and make a meaningful difference to the people who come to us.",
      aboutLink: "Discover our story",
      featureTitle: "Designed around the way you care.",
      featureText: "Explore some of the solutions at Cia da Terra.",
      valuesTitle: "Unique people. Personal care.",
      values: [
        [
          "Listening and understanding",
          "Time dedicated to understanding each person’s needs.",
        ],
        [
          "Pharmaceutical knowledge",
          "Attention to prescriptions and every detail of each formulation.",
        ],
        ["Science and nature", "A connection at the heart of who we are."],
      ],
      bannerTitle: "Your prescription starts a conversation.",
      bannerText: "Speak with our team for guidance on requesting a quote.",
      journalTitle: "Understanding is a way of caring.",
      journalText: "Insights into compounding, health and well-being.",
      closingTitle: "Let’s care for your story.",
      closingText: "Our team is ready to listen.",
    },
    about: {
      title: "Care begins with respect.",
      intro:
        "Cia da Terra – Farmácia de Manipulação was born from the connection between science, nature and human care. We believe every person is unique, and so should every formulation be.",
      paragraphs: [
        "We combine pharmaceutical knowledge, technical expertise and traditional knowledge to develop personalised solutions, respecting each patient’s individuality, body and history. Here, pharmacy is practised by caring hands, with attention to detail, ethics and a commitment to whole-person health.",
        "Our work goes beyond preparation: it is a thoughtful, responsible craft in which technology and human care work together. We value a holistic approach, transparency and personalisation, creating formulations that reflect balance, quality and purpose.",
        "Cia da Terra is where science meets care, and every formula carries a unique story.",
      ],
      mission: "Our mission",
      missionText:
        "To provide personalised pharmaceutical solutions that respect each person’s individuality, bringing scientific knowledge and traditional wisdom together to support whole-person health. Here, pharmacy is still practised by hands that care, and not only machines that produce.",
      vision: "Our vision",
      visionText:
        "To be recognised for person-centred compounding pharmacy, where technical expertise meets thoughtful craft, inspiring a new generation to value personalised service and a meaningful connection with nature.",
      values: "Our values",
      valuesText:
        "Personalisation, human care, connection with nature, technical expertise, craft, a holistic approach, ethics and transparency.",
      invitation: "A place to belong for those who believe in care.",
      invitationText:
        "We invite doctors, healthcare professionals, partners and patients who believe in more personal and respectful care to join us.",
      qualityTitle: "Attention at every stage",
      qualityText:
        "Our process includes pharmaceutical assessment, individual preparation and quality control. The team values attention to detail, documentation and traceability.",
    },
    services: {
      title: "Care made for you.",
      intro:
        "Explore the dosage forms and services offered by Cia da Terra. Our team can explain the possibilities for each formulation.",
      heading: "About this solution",
      options: "Options and characteristics",
      important:
        "The choice of formulation and dosage depends on professional assessment and, where applicable, a prescription. Do not start or change treatment on your own.",
      related: "Other ways to care",
      hormone:
        "Hormones are compounded exclusively with a medical prescription.",
      none: "Can’t find what you need?",
      noneText: "Speak with our pharmacists about your requirements.",
    },
    contact: {
      title: "Care starts with a conversation.",
      intro:
        "Visit us in Jundiaí or choose your preferred way to speak with our team.",
      phones: "Telephone",
      email: "Email",
      address: "Address",
      hours: "Opening hours",
      visit: "Visit our pharmacy",
      visitText:
        "Come and meet our pharmacists in person. Parking is available nearby.",
      formTitle: "How can we help?",
      formText:
        "Prepare a message and continue with our team on the official WhatsApp account.",
      name: "Your name",
      emailLabel: "Email",
      phone: "Telephone",
      message: "Message",
      placeholder:
        "Tell us how we can help. Do not include prescriptions or health information here.",
      submit: "Continue on WhatsApp",
      notice: "You can review your message in WhatsApp before sending it.",
      invalidRequired: "Please fill out this field.",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone:
        "Please enter a telephone number with at least 8 characters.",
      opened:
        "Your message is ready. Review it and send it in WhatsApp to finish.",
      consent:
        "I have read the privacy notice and would like to continue on WhatsApp.",
      required: "Required fields",
      privacyText:
        "Your details are used only to prepare the conversation. This form does not store messages on the website.",
    },
    prescription: {
      title: "Send your prescription or referral.",
      intro:
        "Submit your documents and notes so our team can review your request and prepare a quote.",
      steps: [
        [
          "Speak with our team",
          "Choose your prescription, referral or report and enter your contact details.",
        ],
        [
          "Get guidance",
          "Add your notes and send the documents together in one request.",
        ],
        [
          "Request your quote",
          "After reviewing the prescription, we aim to return a quote within 24 hours. Confirm preparation and delivery conditions with the team.",
        ],
      ],
      button: "Ask about sharing my prescription",
      note: "Do not send prescriptions or health information through this website. Ask our team about the appropriate channel.",
      delivery: "Delivery throughout Brazil",
      deliveryText: "Check availability, timing and conditions with our team.",
      quoteTitle: "Your quote, with personal attention.",
      quoteIntro:
        "Tell us which solution you are looking for and continue with our team. Quotes carry no purchase obligation.",
      interest: "Solution of interest",
      choose: "Select a solution",
      message:
        "Hello! I would like guidance on sharing my prescription with Cia da Terra.",
    },
    mascot: {
      title: "Meet Gaia.",
      subtitle: "Our official mascot",
      intro:
        "Gaia is a name of Greek origin. In Greek mythology, she personifies Mother Earth, a primordial deity who emerged from chaos and gave rise to the sky, mountains and sea, becoming the mother of living beings and gods.",
      sections: [
        [
          "Greek mythology",
          "Gaia is the mother goddess, representing fertility, the power of nature and the stable foundation of the world. She is considered the primordial mother of Uranus (sky), Pontus (sea) and the Titans.",
        ],
        [
          "Meaning",
          "The name evokes the essence of life, nourishing soil and the protection of living things.",
        ],
        [
          "Etymology",
          "An epic or poetic form related to the Attic Greek Gē and Doric Ga.",
        ],
      ],
    },
    blog: {
      title: "Understanding is a way of caring.",
      intro:
        "A space to understand compounding and explore health, nature and well-being.",
      all: "All",
      notice:
        "For information only. Treatments and supplements require individual assessment by a qualified healthcare professional.",
      related: "Keep reading",
      date: "Published on",
    },
    privacy: {
      title: "Privacy and care for your data.",
      intro:
        "This notice describes how this version of the website works. External channels have their own privacy policies.",
      sections: [
        [
          "Browsing",
          "These pages provide information. This version uses no advertising, analytics or marketing cookies. The hosting provider may process technical access data for operation and security.",
        ],
        [
          "Language preference",
          "Your selected language is saved in your browser’s local storage. You can remove this preference by clearing the website’s data.",
        ],
        [
          "Contact",
          "Forms only prepare a message to open in WhatsApp. This website does not store the information entered. A message is sent only when you confirm it in WhatsApp.",
        ],
        [
          "Prescriptions and health information",
          "With your authorisation, the document form accepts prescriptions, examination referrals, reports and notes. Files are stored privately with the request and can be accessed only by authorised staff. We do not create public document links. Access expires after 30 days; deletion occurs through cleanup routines or at your request to the team.",
        ],
        [
          "Your rights and requests",
          "For information about the pharmacy’s handling of personal data or to exercise your rights, contact comercial@ciadaterrafarmacia.com.br.",
        ],
      ],
    },
  },
};
export const serviceData = [
  {
    slug: "capsulas",
    image: "capsules",
    pt: {
      name: "Cápsulas",
      short: "Diferentes formatos para uma formulação individualizada.",
      text: "Oferecemos cápsulas manipuladas sob medida, com dosagem conforme prescrição. Diferentes tipos de invólucro permitem adaptar a formulação às necessidades de cada paciente.",
      items: [
        "Cápsulas vegetais (veganas)",
        "Cápsulas de tapioca",
        "Cápsulas gastrorresistentes",
        "Cápsulas sublinguais",
        "Cápsulas gelatinosas",
        "Outras formulações especiais",
      ],
    },
    en: {
      name: "Capsules",
      short: "Different formats for an individual formulation.",
      text: "We offer individually compounded capsules with dosages as prescribed. Different capsule shells allow the formulation to be adapted to each patient’s needs.",
      items: [
        "Plant-based (vegan) capsules",
        "Tapioca capsules",
        "Gastro-resistant capsules",
        "Sublingual capsules",
        "Gelatine capsules",
        "Other specialised formulations",
      ],
    },
  },
  {
    slug: "gomas",
    image: "botanical",
    pt: {
      name: "Gomas",
      short: "Uma alternativa para quem tem dificuldade com comprimidos.",
      text: "Nossas gomas são uma alternativa prática para suplementação. Desenvolvidas com sabores naturais, são apresentadas para adultos e crianças que têm dificuldade com comprimidos, conforme orientação profissional.",
      items: [
        "Sabores agradáveis e naturais",
        "Consumo sem água",
        "Formulação personalizada",
        "Praticidade no dia a dia",
      ],
    },
    en: {
      name: "Gummies",
      short: "An alternative for people who find tablets difficult.",
      text: "Our gummies offer a practical supplement format. Made with natural flavours, they are an option for adults and children who find tablets difficult, subject to professional guidance.",
      items: [
        "Pleasant natural flavours",
        "No water needed",
        "Personalised formulation",
        "Convenient for everyday use",
      ],
    },
  },
  {
    slug: "chocolates",
    image: "botanical",
    pt: {
      name: "Chocolates",
      short: "Formulações que combinam ativos selecionados e chocolate.",
      text: "Os chocolates funcionais são desenvolvidos com chocolate de qualidade e ativos selecionados, como uma alternativa de apresentação da formulação.",
      items: [
        "Chocolate selecionado",
        "Incorporação de ativos funcionais",
        "Opções sem açúcar, mediante consulta",
        "Alternativa às cápsulas, conforme avaliação",
      ],
    },
    en: {
      name: "Chocolates",
      short: "Formulations combining selected ingredients and chocolate.",
      text: "Functional chocolates are prepared with quality chocolate and selected ingredients as an alternative formulation format.",
      items: [
        "Selected chocolate",
        "Incorporation of functional ingredients",
        "Ask about sugar-free options",
        "An alternative to capsules, subject to assessment",
      ],
    },
  },
  {
    slug: "shot",
    image: "supplements",
    pt: {
      name: "Shot",
      short: "Formulações líquidas concentradas em uma apresentação prática.",
      text: "Os shots são formulações líquidas concentradas. Nossa equipe orienta sobre a composição, a indicação e a forma de uso adequadas à sua necessidade.",
      items: [
        "Apresentação líquida",
        "Formulações concentradas",
        "Praticidade de transporte",
        "Diferentes formulações, conforme avaliação",
      ],
    },
    en: {
      name: "Shots",
      short: "Concentrated liquid formulations in a convenient format.",
      text: "Shots are concentrated liquid formulations. Our team can advise on composition, suitability and use for your individual needs.",
      items: [
        "Liquid format",
        "Concentrated formulations",
        "Convenient to carry",
        "Different formulations, subject to assessment",
      ],
    },
  },
  {
    slug: "gel",
    image: "pharmacy",
    pt: {
      name: "Gel",
      short: "Texturas e aplicações adaptadas à formulação.",
      text: "Produzimos géis com diferentes finalidades, desde uso tópico para a pele até formulações orais. A base e os ativos são definidos de acordo com a aplicação e a avaliação profissional.",
      items: [
        "Uso tópico ou oral, conforme formulação",
        "Texturas personalizadas",
        "Facilidade de aplicação",
        "Formulação individualizada",
      ],
    },
    en: {
      name: "Gels",
      short: "Textures and applications adapted to the formulation.",
      text: "We prepare gels for different purposes, from topical skin applications to oral formulations. The base and ingredients are selected according to the application and professional assessment.",
      items: [
        "Topical or oral use, depending on formulation",
        "Personalised textures",
        "Easy application",
        "Individual formulation",
      ],
    },
  },
  {
    slug: "xarope",
    image: "supplements",
    pt: {
      name: "Xarope",
      short: "Apresentação líquida com sabor e dosagem personalizados.",
      text: "Nossos xaropes são preparados com saborizantes naturais e dosagem conforme a prescrição, para uso pediátrico ou adulto quando indicado. O preparo considera o conforto do paciente e as características da formulação.",
      items: [
        "Sabor agradável",
        "Dosagem conforme prescrição",
        "Possibilidade de combinar ativos",
        "Orientação para conservação e uso",
      ],
    },
    en: {
      name: "Syrups",
      short: "A liquid format with personalised flavour and dosage.",
      text: "Our syrups use natural flavourings and prescribed dosages for children or adults when appropriate. Preparation considers patient comfort and formulation requirements.",
      items: [
        "Pleasant flavour",
        "Dosage as prescribed",
        "Possibility of combining ingredients",
        "Storage and usage guidance",
      ],
    },
  },
  {
    slug: "pastilha",
    image: "capsules",
    pt: {
      name: "Pastilha",
      short: "Formulações sólidas para dissolução na boca.",
      text: "As pastilhas são formulações sólidas que se dissolvem na boca. A via de administração, bucal ou sublingual, é definida de acordo com a prescrição e a formulação.",
      items: [
        "Dissolução oral",
        "Consumo sem água",
        "Diferentes sabores",
        "Via de administração conforme prescrição",
      ],
    },
    en: {
      name: "Lozenges",
      short: "Solid formulations that dissolve in the mouth.",
      text: "Lozenges are solid formulations that dissolve in the mouth. Buccal or sublingual administration depends on the prescription and formulation.",
      items: [
        "Oral dissolution",
        "No water needed",
        "Different flavours",
        "Administration as prescribed",
      ],
    },
  },
  {
    slug: "sache",
    image: "supplements",
    pt: {
      name: "Sachê",
      short: "Formulações em pó em embalagens individuais.",
      text: "Os sachês são embalagens individuais com dosagens definidas. Conforme a formulação, o conteúdo pode ser dissolvido em água ou consumido diretamente, seguindo a orientação de uso.",
      items: [
        "Embalagem individual",
        "Dosagem definida",
        "Fácil transporte",
        "Diferentes sabores e formas de consumo",
      ],
    },
    en: {
      name: "Sachets",
      short: "Powder formulations in individual packs.",
      text: "Sachets are individual packs with defined dosages. Depending on the formulation, the contents may be dissolved in water or taken directly, following usage instructions.",
      items: [
        "Individual packs",
        "Defined dosage",
        "Easy to carry",
        "Different flavours and ways to take them",
      ],
    },
  },
  {
    slug: "hormonios",
    image: "pharmacy",
    pt: {
      name: "Hormônios",
      short:
        "Manipulação individualizada, exclusivamente sob prescrição médica.",
      text: "A Cia da Terra apresenta manipulação de hormônios bioidênticos e sintéticos conforme prescrição médica. Consulte a equipe farmacêutica para informações sobre as formas farmacêuticas e o processo de atendimento.",
      items: [
        "Dosagens conforme prescrição",
        "Acompanhamento farmacêutico",
        "Cápsulas",
        "Cremes e géis",
        "Comprimidos sublinguais",
        "Soluções orais e outras formulações",
      ],
    },
    en: {
      name: "Hormones",
      short: "Individual compounding, exclusively with a medical prescription.",
      text: "Cia da Terra offers bioidentical and synthetic hormone compounding with a medical prescription. Contact the pharmaceutical team about dosage forms and the consultation process.",
      items: [
        "Dosage as prescribed",
        "Pharmacist support",
        "Capsules",
        "Creams and gels",
        "Sublingual tablets",
        "Oral solutions and other formulations",
      ],
    },
  },
  {
    slug: "dermocosmeticos",
    image: "pharmacy",
    pt: {
      name: "Dermocosméticos",
      short: "Formulações para as necessidades específicas da sua pele.",
      text: "Desenvolvemos formulações dermocosméticas sob medida para as necessidades específicas da pele, combinando ativos e bases conforme avaliação profissional. Trabalhamos também com dermocosméticos de marcas do mercado, com orientação farmacêutica.",
      items: [
        "Fórmulas e texturas personalizadas",
        "Hidratação e cuidados faciais e corporais",
        "Cuidados para a área dos olhos",
        "Possibilidades com ácido hialurônico, vitamina C, retinol, niacinamida, AHA/BHA e peptídeos",
        "Consulte a equipe sobre composição e indicação",
      ],
    },
    en: {
      name: "Dermocosmetics",
      short: "Formulations for your skin’s specific needs.",
      text: "We develop personalised dermocosmetic formulations, combining ingredients and bases according to professional assessment. We also offer established dermocosmetic brands with pharmacist guidance.",
      items: [
        "Personalised formulations and textures",
        "Hydration and face and body care",
        "Eye-area care",
        "Options with hyaluronic acid, vitamin C, retinol, niacinamide, AHA/BHA and peptides",
        "Ask the team about composition and suitability",
      ],
    },
  },
  {
    slug: "manipulacao-magistral",
    image: "pharmacy",
    pt: {
      name: "Manipulação magistral",
      short: "Uma fórmula preparada para cada pessoa.",
      text: "A manipulação magistral é o processo de preparação de medicamentos personalizados para cada paciente, seguindo a prescrição. Cada fórmula atende às necessidades específicas de quem vai utilizá-la.",
      items: [
        "Dosagem personalizada conforme prescrição",
        "Possibilidade de combinar ativos em uma fórmula",
        "Avaliação de componentes alergênicos",
        "Formas farmacêuticas adaptadas",
        "Análise, preparação e controle de qualidade",
        "Orientação farmacêutica",
      ],
    },
    en: {
      name: "Compounding",
      short: "A formulation prepared for each person.",
      text: "Compounding is the preparation of personalised medicines for each patient, following a prescription. Each formulation is tailored to the needs of the person who will use it.",
      items: [
        "Personalised prescribed dosage",
        "Possibility of combining ingredients",
        "Assessment of allergenic ingredients",
        "Adapted dosage forms",
        "Assessment, preparation and quality control",
        "Pharmacist guidance",
      ],
    },
  },
  {
    slug: "suplementos",
    image: "supplements",
    pt: {
      name: "Suplementos",
      short: "Orientação para uma suplementação individualizada.",
      text: "A Cia da Terra apresenta suplementos de marcas do mercado e fórmulas manipuladas personalizadas, com orientação farmacêutica. Suplementos complementam a alimentação e devem ser escolhidos com avaliação individual.",
      items: [
        "Proteínas: whey, caseína e albumina",
        "Vitaminas: complexo B, C, D, E e A",
        "Minerais: magnésio, zinco, ferro e cálcio",
        "Ômega 3, probióticos, antioxidantes e colágeno",
        "Consulte a equipe sobre creatina, beta-alanina, cafeína e demais opções",
        "Suplementos não substituem uma alimentação equilibrada",
      ],
    },
    en: {
      name: "Supplements",
      short: "Guidance for individual supplementation.",
      text: "Cia da Terra presents established supplement brands and personalised compounded formulations with pharmacist guidance. Supplements complement the diet and should be selected after individual assessment.",
      items: [
        "Proteins: whey, casein and albumin",
        "Vitamins: B complex, C, D, E and A",
        "Minerals: magnesium, zinc, iron and calcium",
        "Omega 3, probiotics, antioxidants and collagen",
        "Ask about creatine, beta-alanine, caffeine and other options",
        "Supplements do not replace a balanced diet",
      ],
    },
  },
];
export type Service = (typeof serviceData)[number];
export function serviceCopy(s: Service, locale: Locale) {
  return locale === "en" ? s.en : s.pt;
}
export const imageFor = (s: Service) =>
  s.image === "capsules"
    ? "/images/capsules.webp"
    : "/images/" + s.image + ".webp";
