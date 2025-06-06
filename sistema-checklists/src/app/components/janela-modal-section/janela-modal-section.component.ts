

import { GetSectionsService } from '../../services/getSections/get-sections.service';


import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-janela-modal-section',
  standalone: true,
  imports: [],
  templateUrl: './janela-modal-section.component.html',
})
export class JanelaModalSectionComponent implements OnInit {
  @Input() nome_imagem: string = ''; // Mantido como fallback
  @Input() etiqueta_imagem: string = '';
  imagemFixa: string = '';
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<string>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly getSectionsService: GetSectionsService // Injeta o serviço
  ) {}

  ngOnInit() {
    console.log('Inicializando componente. Etiqueta da imagem:', this.etiqueta_imagem);
    this.getSectionsService.getUrlImagem().pipe(take(1)).subscribe({
      next: (telaUrls) => {
        // Seleciona a primeira URL válida ou mantém o valor de input
        this.nome_imagem = telaUrls.length > 0 ? telaUrls[0] : this.nome_imagem || '';
        this.imagemFixa = this.nome_imagem;
        console.log('URLs do campo tela carregadas:', telaUrls);
        console.log('Imagem selecionada:', this.nome_imagem);
      },
      error: (err) => {
        console.error('Erro ao carregar URLs do campo tela:', err);
        this.nome_imagem = this.nome_imagem || ''; // Usa o valor de input como fallback
        this.imagemFixa = this.nome_imagem;
      }
    });
  }

  open(content: TemplateRef<any>) {
    console.log('Abrindo modal com imagem fixa:', this.imagemFixa, 'e etiqueta:', this.etiqueta_imagem);
    this.modalOpened.emit(); // Notifica que o modal foi aberto
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Modal fechado com: ${result}`);
        this.modalClosed.emit(result); // Notifica que o modal foi fechado
      },
      (reason) => {
        console.log(`Modal dispensado com: ${reason}`);
        this.modalClosed.emit(reason); // Notifica que o modal foi dispensado
      }
    );
  }
}