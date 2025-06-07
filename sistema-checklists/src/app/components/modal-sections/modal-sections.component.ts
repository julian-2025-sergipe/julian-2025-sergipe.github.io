import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';

import { Section, Ticket } from '../visualiza-tickets/sections.data';
import { GetSectionsService } from '../../services/getSections/get-sections.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-modal-sections',
  imports: [],
  templateUrl: './modal-sections.component.html',
  styleUrl: './modal-sections.component.css'
})


export class ModalSectionsComponent implements OnInit {

  @Input() sectionData: (Section & { key: string }) | null = null;


  @Input() nome_imagem: string = '';
  imagemFixa: string = '';
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<string>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly getSectionsService: GetSectionsService

  ) { }


  ngOnInit() {
    console.log('Inicializando componente. Nome da imagem:', this.nome_imagem);


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

  open(content: TemplateRef<any>) {
    this.imagemFixa = this.nome_imagem;


    this.modalOpened.emit(); // Notifica que o modal foi aberto
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Modal fechado com: ${result}`);
        this.modalClosed.emit(result); // Notifica que o modal foi fechado
      },

    );
  }
}
