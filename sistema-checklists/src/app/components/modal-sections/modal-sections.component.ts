import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';

import { Section } from '../../services/getSections/sections.data'; 



@Component({
  selector: 'app-modal-sections',
  imports: [],
  templateUrl: './modal-sections.component.html',
  styleUrl: './modal-sections.component.css'
})


export class ModalSectionsComponent implements OnInit {

  @Input() sectionData: (Section & { key: string }) | null = null;
  

  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<string>();





  constructor(
    private readonly modalService: NgbModal,

  ) { }


  ngOnInit() {
    console.log('Inicializando componente. ----ModalSectionsComponent');



  }

  open(content: TemplateRef<any>) {


    this.modalOpened.emit(); // Notifica que o modal foi aberto
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Modal fechado com: ${result}`);
        this.modalClosed.emit(result); // Notifica que o modal foi fechado
      },

    );
  }
}
