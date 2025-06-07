import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetSectionsService } from '../../services/getSections/get-sections.service';
import { Section, Ticket } from '../visualiza-tickets/sections.data';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-janela-modal-section',
  standalone: true,
  templateUrl: './janela-modal-section.component.html'
})
export class JanelaModalSectionComponent implements OnInit {
  @Input() sectionData: (Section & { key: string }) | null = null;
  @Input() nome_imagem: string = '';
  @Input() etiqueta_imagem: string = '';
  imagemFixa: string = '';
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<string>();

  constructor(
    public modal: NgbActiveModal, // Injetar NgbActiveModal
    private readonly getSectionsService: GetSectionsService
  ) {}

  ngOnInit() {
    this.modalOpened.emit(); // Emitir evento ao abrir o modal
    console.log('Inicializando componente. Etiqueta da imagem:', this.etiqueta_imagem);
    this.getSectionsService.getUrlImagem().pipe(take(1)).subscribe({
      next: (telaUrls) => {
        this.nome_imagem = telaUrls.length > 0 ? telaUrls[0] : this.nome_imagem || '';
        this.imagemFixa = this.nome_imagem;
        console.log('URLs do campo tela carregadas:', telaUrls);
        console.log('Imagem selecionada:', this.nome_imagem);
      },
      error: (err) => {
        console.error('Erro ao carregar URLs do campo tela:', err);
        this.nome_imagem = this.nome_imagem || '';
        this.imagemFixa = this.nome_imagem;
      },
    });
  }

  objectKeys(obj: Record<string, any> | null | undefined): string[] {
    return Object.keys(obj || {});
  }

  isTicket(item: string | Ticket): item is Ticket {
    return typeof item === 'object' && item !== null;
  }

  // Método para fechar o modal, compatível com modalClosed
  close(result: string) {
    this.modal.close(result);
    this.modalClosed.emit(result);
  }

  dismiss(reason: string) {
    this.modal.dismiss(reason);
    this.modalClosed.emit(reason);
  }
}