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
  indiceImagem = signal<number>(0);
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
  imagemAtual = computed(() => this.imagens()[this.indiceImagem()] || '');

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

  // Navegação entre imagens
  private increment() {
    this.indiceImagem.update((i) =>
      i + 1 < this.maximoIndiceSection() ? i + 1 : i,
    );
  }

  private decrement() {
    this.indiceImagem.update((i) => (i > 0 ? i - 1 : i));
  }

  private increment10() {
    this.indiceImagem.update((i) =>
      i + 10 < this.maximoIndiceSection() ? i + 10 : i,
    );
  }

  private decrement10() {
    this.indiceImagem.update((i) => (i >= 10 ? i - 10 : i));
  }

  private avancoCertificados() {
    this.indiceImagem.update((i) =>
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