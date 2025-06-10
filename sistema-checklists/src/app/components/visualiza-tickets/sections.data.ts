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
  tela?: string;
  TestScript?: string;

}


export const sections: Readonly<Record<string, Section>> = {
}
