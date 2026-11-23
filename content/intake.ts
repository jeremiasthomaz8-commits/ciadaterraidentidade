import type { Locale } from "./site";
export const intakeCopy = {
  "pt-BR": {
    title: "Envie sua receita ou guia.",
    intro:
      "Anexe sua receita, guia de exame ou análise e deixe suas observações. Os documentos ficam vinculados à mesma solicitação.",
    formTitle: "Seus documentos",
    files: "Receita, guia ou análise",
    choose: "Selecionar arquivos",
    drop: "ou arraste os arquivos para cá",
    limits:
      "PDF, JPG ou PNG. Até 3 arquivos, 10 MB por arquivo e 20 MB no total.",
    remove: "Remover arquivo",
    name: "Nome completo",
    phone: "Celular ou WhatsApp",
    email: "E-mail (opcional)",
    observations: "Observações para a análise",
    placeholder: "Informe o que a equipe precisa saber sobre sua solicitação.",
    consent:
      "Autorizo o uso dos documentos e dados enviados para análise da minha solicitação e elaboração do orçamento.",
    privacy: "Ler aviso de privacidade",
    submit: "Enviar documentos",
    sending: "Enviando documentos…",
    received: "Documentos recebidos.",
    receivedText:
      "O arquivo e suas observações foram registrados juntos. Guarde o protocolo para falar com a equipe.",
    protocol: "Seu protocolo",
    notify: "Avisar pelo WhatsApp",
    another: "Enviar outra solicitação",
    confidential: "Acesso restrito à equipe autorizada.",
    confidentialText:
      "Os arquivos não são publicados nem enviados em links abertos.",
    error:
      "Não foi possível concluir o envio. Seus arquivos continuam selecionados. Tente novamente.",
    invalid_files:
      "Selecione até 3 arquivos PDF, JPG ou PNG, com até 10 MB cada e 20 MB no total.",
    invalid_fields: "Confira seu nome, telefone e e-mail.",
    invalid_form:
      "Preencha os campos obrigatórios e autorize o uso dos documentos.",
    too_large: "O envio ultrapassa o limite de 20 MB.",
    rate_limited:
      "Muitas solicitações em pouco tempo. Tente novamente mais tarde.",
    forbidden: "Atualize a página e tente enviar novamente.",
    unavailable:
      "O envio está temporariamente indisponível. Tente novamente em instantes.",
    store_failed: "Não foi possível salvar os documentos. Tente novamente.",
    server_error: "Não foi possível concluir o envio. Tente novamente.",
    whatsapp:
      "Olá! Enviei documentos pelo site da Cia da Terra. Meu protocolo é ",
    quoteLink: "Enviar receita ou guia com anexos",
    quoteHelp:
      "Tem uma receita, guia ou análise? Envie os arquivos junto com sua solicitação.",
    adminTitle: "Solicitações recebidas",
    adminIntro: "Documentos e observações enviados para avaliação da equipe.",
    loading: "Carregando solicitações…",
    empty: "Nenhuma solicitação recebida.",
    unauthorized: "Esta área está disponível apenas para a equipe autorizada.",
    refresh: "Atualizar",
    download: "Baixar documento",
    delete: "Excluir solicitação",
    confirmDelete:
      "Excluir definitivamente esta solicitação e seus documentos?",
    expires: "Disponível até",
    more: "Carregar mais",
    adminError: "Não foi possível carregar as solicitações.",
    deleteError: "Não foi possível excluir a solicitação.",
    receivedAt: "Recebido em",
    fileCount: "documento(s)",
  },
  en: {
    title: "Send your prescription or referral.",
    intro:
      "Attach your prescription, examination referral or report and add your notes. All documents are linked to the same request.",
    formTitle: "Your documents",
    files: "Prescription, referral or report",
    choose: "Choose files",
    drop: "or drag your files here",
    limits:
      "PDF, JPG or PNG. Up to 3 files, 10 MB per file and 20 MB in total.",
    remove: "Remove file",
    name: "Full name",
    phone: "Mobile or WhatsApp number",
    email: "Email (optional)",
    observations: "Notes for the review",
    placeholder: "Tell the team what they need to know about your request.",
    consent:
      "I authorise the use of the documents and details submitted to review my request and prepare a quote.",
    privacy: "Read the privacy notice",
    submit: "Send documents",
    sending: "Sending documents…",
    received: "Documents received.",
    receivedText:
      "Your files and notes have been saved together. Keep your reference when speaking with the team.",
    protocol: "Your reference",
    notify: "Notify the team on WhatsApp",
    another: "Send another request",
    confidential: "Restricted to authorised staff.",
    confidentialText:
      "Your files are not published or shared through public links.",
    error:
      "The upload could not be completed. Your files are still selected. Please try again.",
    invalid_files:
      "Choose up to 3 PDF, JPG or PNG files, no larger than 10 MB each and 20 MB in total.",
    invalid_fields: "Check your name, telephone number and email.",
    invalid_form:
      "Complete the required fields and authorise the use of your documents.",
    too_large: "The upload exceeds the 20 MB limit.",
    rate_limited:
      "Too many requests in a short period. Please try again later.",
    forbidden: "Refresh the page and try again.",
    unavailable:
      "Uploads are temporarily unavailable. Please try again shortly.",
    store_failed: "Your documents could not be saved. Please try again.",
    server_error: "The upload could not be completed. Please try again.",
    whatsapp:
      "Hello! I submitted documents through the Cia da Terra website. My reference is ",
    quoteLink: "Attach a prescription or referral",
    quoteHelp:
      "Have a prescription, referral or report? Send the files with your request.",
    adminTitle: "Received requests",
    adminIntro: "Documents and notes submitted for staff review.",
    loading: "Loading requests…",
    empty: "No requests received.",
    unauthorized: "This area is restricted to authorised staff.",
    refresh: "Refresh",
    download: "Download document",
    delete: "Delete request",
    confirmDelete: "Permanently delete this request and its documents?",
    expires: "Available until",
    more: "Load more",
    adminError: "Requests could not be loaded.",
    deleteError: "The request could not be deleted.",
    receivedAt: "Received on",
    fileCount: "document(s)",
  },
};
export const intake = (locale: Locale) => intakeCopy[locale];
