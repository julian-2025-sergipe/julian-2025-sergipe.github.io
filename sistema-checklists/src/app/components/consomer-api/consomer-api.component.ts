import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Ticket {
  descricao?: string | Record<string, string>;
  articulacao_solucionar?: string;
  url_ticket?: string;
}

interface Section {
  Tickets?: (string | Ticket)[];
  url?: string;
}

@Component({
  selector: 'app-consomer-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consomer-api.component.html',
  styleUrls: ['./consomer-api.component.css']
})
export class ConsomerApiComponent {
  sections: Readonly<Record<string, Section>> = {
    Abastecimento: {
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

  // Função para obter chaves de um objeto (necessária para o template)
  objectKeys(obj: Record<string, string> | undefined): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Verifica se o ticket é uma string
  isString(value: string | Ticket): value is string {
    return typeof value === 'string';
  }

  // Verifica se a descrição é um objeto complexo
  isDescricaoComplexa(value: string | Record<string, string> | undefined): value is Record<string, string> {
    return typeof value === 'object' && value !== null;
  }

  // Verifica se a seção tem tickets
  hasTickets(section: Section | undefined): boolean {
    return !!section?.Tickets?.length;
  }
}