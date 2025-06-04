export interface Ticket {
  descricao?: string | Record<string, string>;
  articulacao_solucionar?: string;
  url_ticket?: string;
}

export interface Section {
  Comentarios?: string[];
  Funcionalidades?: string[];
  Subsecoes?: Record<string, Section>;
  Tickets?: (string | Ticket)[];
  url?: string;
}



export const sections: Readonly<Record<string, Section>> = {
  Abastecimento: {
    Comentarios: [
      "O log aponta dois avisos de aninhamento inválido no componente AcademyTabComponent, onde elementos <div> e <fieldset> estão sendo usados como descendentes de <p>, o que viola as regras de validação de HTML do React. É necessário revisar a estrutura do componente AcademyTabComponent e CoursesTab para corrigir o aninhamento, possivelmente substituindo <p> por um elemento mais apropriado, como <div>. Os elementos <div> e <fieldset> não estão mais aninhados dentro de <p> no componente AcademyTabComponent. Os avisos \"Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>...\" não aparecem mais no console. A renderização visual do componente não é afetada negativamente. Referência no Log: \"Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s <div> p ...\" e \"Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s <fieldset> p ...\"."
    ],
    Funcionalidades: [],
    Subsecoes: {},
    Tickets: [
      {
        descricao: "Na tela de registro pode-se adicionar um filtro para não listar tantos carros",
        articulacao_solucionar: "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        url_ticket: "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    url: "https://stagging.dotelematics.com/fleet/fuel-supply"
  },
  Barcos: {
    Tickets: [
      {
        descricao: "Campo de ano ???",
        articulacao_solucionar: "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        url_ticket: "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    url: "https://stagging.dotelematics.com/marine/ships"
  },
  Cerca_administracao: {
    url: "https://stagging.dotelematics.com/geo-fence/manage?page=1&limit=10"
  },
  Cerca_relatorio: {
    Tickets: [
      {
        descricao: "Colunas deve ter pelo menos 1 selecionada",
        articulacao_solucionar: "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        url_ticket: "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    url: "https://stagging.dotelematics.com/geo-fence/report"
  },
  Cerca_Virtual: {
    Tickets: [
      {
        descricao: {
          filtro: "Parece que o filtro (input Buscar) não está funcionando corretamente...",
          listagem_inicial: "Na tela de relatório de cerca virtual...",
          listagem_inicial_jornadas: "o mesmo está acontecendo ao redirecionar para a tela de jornadas..."
        },
        url_ticket: "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    url: "https://stagging.dotelematics.com/geo-fence/manage?page=1&limit=10"
  }
};