import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { sections, Section, Ticket } from './sections.data';

@Component({
  selector: 'app-consomer-api',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollingModule],
  templateUrl: './consomer-api.component.html',
  styleUrls: ['./consomer-api.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsomerApiComponent implements OnInit {
  sections: { key: string; value: Section }[] = [];
  filteredSections: { key: string; value: Section }[] = [];
  searchQuery: string = '';

  ngOnInit() {
    // Pré-processar sections
    this.sections = Object.entries(sections).map(([key, value]) => ({ key, value }));
    this.filteredSections = [...this.sections];
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredSections = this.sections.filter(
      ({ key, value }) =>
        key.toLowerCase().includes(query) ||
        value.Comentarios?.some((c) => c.toLowerCase().includes(query)) ||
        value.Funcionalidades?.some((f) => f.toLowerCase().includes(query)) ||
        value.Tickets?.some((t) =>
          typeof t === 'string'
            ? t.toLowerCase().includes(query)
            : t.descricao && typeof t.descricao === 'string'
            ? t.descricao.toLowerCase().includes(query)
            : t.descricao && typeof t.descricao === 'object'
            ? Object.values(t.descricao).some((v) => v.toLowerCase().includes(query))
            : false
        )
    );
  }

  objectKeys(obj: Record<string, string> | undefined): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isString(value: string | Ticket): value is string {
    return typeof value === 'string';
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
    return (
      this.hasTickets(section) ||
      this.hasComentarios(section) ||
      this.hasFuncionalidades(section) ||
      this.hasSubsecoes(section) ||
      this.hasUrl(section)
    );
  }
}