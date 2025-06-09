import { Component, HostListener, OnInit, signal, computed, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';


import { ModalSectionsComponent } from '../modal-sections/modal-sections.component';

import { ListaPastasComponent } from '../lista-pastas/lista-pastas.component';
import { ListaTicketsComponent } from '../lista-tickets/tickets.component';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

import { GetSectionsService } from '../../services/getSections/get-sections.service';

import { Section } from './sections.data';

// Definindo as constantes para os códigos de tecla
enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  UP_ARROW = 'ArrowUp',
  DOWN_ARROW = 'ArrowDown',
}

@Component({
  selector: 'app-visualiza-tickets',
  standalone: true,
  imports: [
    CommonModule,
    ListaPastasComponent,
    ListaTicketsComponent,
    ModalSectionsComponent,
    ModalLoginComponent,
  ],
  templateUrl: './visualiza-tickets.component.html',
  styleUrls: ['./visualiza-tickets.component.css'],
})
export class VisualizaTicketsComponent implements OnInit {
  // Signals para estado
  etiqueta = signal<string>('geral');
  //indiceImagem = signal<number>(0);
  maximoIndiceImagem = signal<number>(0);
  imagens = signal<string[]>([]);
  sistemas = signal<string[]>([]);
  isAuthenticated = signal<boolean>(false);
  sections = signal<Record<string, Section>>({});
  indiceSection = signal<number>(0); // Substitui indiceImagem
  maximoIndiceSection = signal<number>(0);

  // Signal para a seção atual, incluindo a chave
  currentSection = signal<(Section & { key: string }) | null>(null); // Ajuste do tipo

  // Computed signal para a imagem atual
  imagemAtual = computed(() => this.imagens()[this.indiceSection()] || '');

  private timerSubscription: Subscription | null = null;
  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private fotosService: GetSectionsService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    // Carrega o parâmetro da rota
    const parametro = this.route.snapshot.paramMap.get('parametro');
    if (parametro) {
      this.etiqueta.set(parametro);
    }

    // Carrega dados do serviço
    this.loadSections();
    this.loadUrls();
  }

  // Manipulação de eventos de teclado
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

console.log('Tecla pressionada:', event.key);
console.log('Indice atual:', this.indiceSection());

    this.pauseTimer();

    switch (event.key) {
      case KEY_CODE.RIGHT_ARROW:
        this.increment();
        break;
      case KEY_CODE.LEFT_ARROW:
        this.decrement();
        break;
      case KEY_CODE.UP_ARROW:
        this.increment10();
        break;
      case KEY_CODE.DOWN_ARROW:
        this.decrement10();
        break;
    }

    this.startTimer();
  }

  // Carrega seções do JSON
  private loadSections() {
    this.fotosService.getSections().subscribe({
      next: (sections: Record<string, Section>) => {
        this.sections.set(sections);
        this.maximoIndiceSection.set(Object.keys(sections).length);

      },
      error: (err) => {
        console.error('Erro ao carregar seções:', err);
      },
    });
  }

  // Carrega URLs de imagens e sistemas
  private loadUrls() {
    this.fotosService.getUrlImagem().subscribe({
      next: (urls) => {
        if (urls?.length) {
          this.imagens.set(urls.reverse());
          this.startTimer();
        } else {
          console.warn('Nenhuma imagem carregada.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar imagens:', err);
      },
    });

    this.fotosService.getUrlSistema().subscribe({
      next: (urls) => {
        if (urls?.length) {
          this.sistemas.set(urls.reverse());
        } else {
          console.warn('Nenhum URL de sistema carregado.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar sistemas:', err);
      },
    });
  }

  // Navegação entre Sections

  private increment() {
    if (this.indiceSection() + 1 < this.maximoIndiceSection()) {
      this.indiceSection.update(i => i + 1);
    }
  }

   private decrement() {
    if (this.indiceSection() - 1 >0) {
      this.indiceSection.update(i => i - 1);
    }
  }
// Navegação rápida entre Sections
  private increment10() {
    if (this.indiceSection() + 10 < this.maximoIndiceSection()) {
      this.indiceSection.update(i => i + 10);
    }
  }

   private decrement10() {
    if (this.indiceSection() - 10 >0) {
      this.indiceSection.update(i => i - 10);
    }
  }



  private avancoCertificados() {
    this.indiceSection.update((i) =>
      i >= this.maximoIndiceSection() - 1 ? 0 : i + 1,
    );
  }

  // Gerenciamento do timer
  startTimer() {
    this.pauseTimer();
    if (this.maximoIndiceSection() > 0) {
      this.timerSubscription = timer(3000, 3000).subscribe(() => {
        this.avancoCertificados();
      });
      this.destroyRef.onDestroy(() => this.pauseTimer());
    }
  }

  pauseTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  // Abertura do modal
  openModal(sectionKey: string) {
    const sectionData = this.sections()[sectionKey];
    if (!sectionData) {
      console.warn(`Seção ${sectionKey} não encontrada.`);
      return;
    }

    this.currentSection.set({ ...sectionData, key: sectionKey });
    const modalRef = this.modalService.open(ModalSectionsComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });

    // Passa os dados para o componente do modal
    modalRef.componentInstance.sectionData = this.currentSection();

    modalRef.result.then(
      (result) => {
        this.startTimer();
        console.log('Modal fechado com resultado:', result);
      },
      () => {
        this.startTimer();
        console.log('Modal descartado.');
      },
    );
  }

  // Manipula eventos do modal
  modalOpened() {
    this.pauseTimer();
  }

  modalClosed(result: string) {
    this.startTimer();
  }

  // Manipula autenticação
  handleAuthStateChange(isAuthenticated: boolean) {
    this.isAuthenticated.set(isAuthenticated);
  }

  // Função auxiliar para ngFor com objetos
  objectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }



}


/***
 * Comentário explicativo do código do componente NovosComponent:
 *
 * Este componente Angular, chamado `NovosComponent`, é responsável por exibir e navegar por uma lista de imagens obtidas de um serviço (`GetFotosBucketService`), 
 * permitindo a navegação por meio de teclas de seta e controlando um timer para avançar automaticamente entre as imagens. Ele também gerencia a autenticação do usuário
 * e exibe modais para classificação e login.
 *
 * ### Estrutura e funcionalidades principais:
 *
 * 1. **Imports e Decorator Component**:
 *    - O componente utiliza módulos do Angular (`Component`, `HostListener`, `OnInit`, `signal`, `DestroyRef`, `inject`) para gerenciar o ciclo de vida, eventos e 
 *      estados reativos (usando signals, uma funcionalidade mais recente do Angular para gerenciamento de estado).
 *    - Importa `ActivatedRoute` para capturar parâmetros da URL e `GetFotosBucketService` para obter URLs de imagens.
 *    - Importa componentes filhos como `JanelaModalClassificarComponent`, `ModalLoginComponent`, `ListaPastasComponent` e `ListaTicketsComponent` para compor a interface.
 *    - O decorator `@Component` define o seletor (`app-novos`), o template HTML (`novos.component.html`) e declara os componentes importados como dependências standalone.
 *
 * 2. **Constantes e Enum**:
 *    - A enum `KEY_CODE` define códigos de teclas (setas para direita, esquerda, cima e baixo) para facilitar a leitura e manutenção do código ao lidar com eventos de teclado.
 *
 * 3. **Propriedades do Componente**:
 *    - `etiqueta`: Signal que armazena o parâmetro da rota (ex.: 'geral'), usado para filtrar as imagens.
 *    - `indice_imagen`: Signal que controla o índice da imagem atual exibida.
 *    - `maximo_indice_imagen`: Signal que armazena o número total de imagens disponíveis.
 *    - `imagem`: Signal que armazena a lista de URLs das imagens.
 *    - `isAuthenticated`: Signal que controla o estado de autenticação do usuário.
 *    - `timerSubscription`: Armazena a subscrição do timer para avanço automático das imagens.
 *    - `destroyRef`: Injetado para gerenciar a limpeza de recursos (como o timer) quando o componente é destruído.
 *
 * 4. **Ciclo de Vida e Inicialização**:
 *    - No método `ngOnInit`, o componente:
 *      - Captura o parâmetro da rota (`parametro`) e atualiza o signal `etiqueta` com ele.
 *      - Chama `getUrlImagem` para carregar as URLs das imagens com base na `etiqueta`.
 *
 * 5. **Navegação por Teclado**:
 *    - O decorator `@HostListener('window:keyup', ['$event'])` escuta eventos de teclado no nível da janela.
 *    - O método `keyEvent` mapeia as teclas de seta para ações específicas:
 *      - **Seta Direita**: Incrementa o índice da imagem (`increment`).
 *      - **Seta Esquerda**: Decrementa o índice da imagem (`decrement`).
 *      - **Seta Cima**: Avança 10 imagens (`increment10`).
 *      - **Seta Baixo**: Retrocede 10 imagens (`decrement10`).
 *    - Antes de executar qualquer ação, o timer é pausado (`pauseTimer`), e após a ação, ele é reiniciado (`startTimer`).
 *
 * 6. **Métodos de Navegação**:
 *    - `increment` e `decrement`: Atualizam o índice da imagem atual, respeitando os limites (não avança além do máximo nem retrocede abaixo de 0).
 *    - `increment10` e `decrement10`: Permitem navegação rápida, avançando ou retrocedendo 10 imagens, também respeitando os limites.
 *    - `avancoCertificados`: Usado pelo timer para avançar automaticamente para a próxima imagem, reiniciando do zero ao atingir o máximo.
 *
 * 7. **Controle do Timer**:
 *    - `startTimer`: Inicia um timer (usando `timer` do RxJS) que avança as imagens a cada 3 segundos. Evita múltiplos timers ao chamar `pauseTimer` antes de iniciar um novo.
 *    - `pauseTimer`: Cancela a subscrição do timer atual, se existente.
 *    - O `destroyRef.onDestroy` garante que o timer seja pausado quando o componente é destruído, evitando vazamentos de memória.
 *
 * 8. **Integração com Modais**:
 *    - `modalOpened`: Pausa o timer quando um modal é aberto.
 *    - `modalClosed`: Reinicia o timer quando o modal é fechado.
 *    - `handleAuthStateChange`: Atualiza o estado de autenticação (`isAuthenticated`) com base em eventos de login/logout.
 *
 * 9. **Carregamento de Imagens**:
 *    - O método `getUrlImagem` usa o serviço `GetFotosBucketService` para obter URLs de imagens com base na `etiqueta`.
 *    - As URLs são armazenadas no signal `imagem` (em ordem reversa), e o número total de imagens é salvo em `maximo_indice_imagen`.
 *    - Após carregar as imagens, o timer é iniciado. Caso não haja imagens ou ocorra um erro, mensagens de log são exibidas no console.
 *
 * ### Objetivo Geral:
 * Este componente é projetado para exibir uma galeria de imagens com navegação interativa (teclado) e automática (timer), integrando-se a modais para classificação e login, 
 * com gerenciamento eficiente de recursos e estados reativos usando Angular Signals. Ele é ideal para aplicações que precisam exibir e classificar imagens dinamicamente, 
 * como em sistemas de gerenciamento de certificados ou fotos.
 *
 * ### Pontos de Atenção:
 * - O uso de `signals` reflete uma abordagem moderna para gerenciamento de estado no Angular, garantindo reatividade e eficiência.
 * - O `DestroyRef` é essencial para evitar vazamentos de memória, especialmente com subscrições do RxJS.
 * - A lógica de navegação respeita os limites do índice para evitar erros de acesso fora dos limites da lista de imagens.
 * - O código é modular e bem estruturado, facilitando manutenção e extensibilidade.
 */