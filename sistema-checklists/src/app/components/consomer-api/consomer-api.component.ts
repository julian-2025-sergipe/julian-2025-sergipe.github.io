import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sections, Section, Ticket } from './sections.data';


@Component({
  selector: 'app-consomer-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consomer-api.component.html',
  styleUrls: ['./consomer-api.component.css']
})
export class ConsomerApiComponent {
sections = sections;


  objectKeys(obj: Record<string, string> | undefined): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isString(value: string | Ticket): value is string {
    return typeof value === 'string';
  }

  isDescricaoComplexa(value: string | Record<string, string> | undefined): value is Record<string, string> {
    return typeof value === 'object' && value !== null;
  }

  hasTickets(section: Section | undefined): boolean {
    return !!section?.Tickets?.length;
  }

  hasComentarios(section: Section | undefined): boolean {
    return !!section?.Comentarios?.length;
  }

  hasFuncionalidades(section: Section | undefined): boolean {
    return !!section?.Funcionalidades?.length;
  }

  hasSubsecoes(section: Section | undefined): boolean {
    return !!section?.Subsecoes && Object.keys(section.Subsecoes).length > 0;
  }

  hasUrl(section: Section | undefined): boolean {
    return !!section?.url;
  }

  shouldDisplaySection(section: Section | undefined): boolean {
    return this.hasTickets(section) || this.hasComentarios(section) || this.hasFuncionalidades(section) || this.hasSubsecoes(section) || this.hasUrl(section);
  }
}