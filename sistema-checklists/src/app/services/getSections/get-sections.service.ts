import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Section } from './sections.data';

@Injectable({
  providedIn: 'root'
})
export class GetSectionsService {
  private http = inject(HttpClient);
  private url = environment.apiSection;

getUrlImagem(): Observable<string[]> {
    console.log('getUrlImagem: Buscando seções em', this.url);

    return this.http.get<Record<string, Section>>(this.url).pipe(
      retry(2), // Mantém as 2 tentativas, como no método original
      map((sections: Record<string, Section>) => this.extractTelaUrls(sections)),
      catchError((error) => this.handleError(error))
    );
  }

  private extractTelaUrls(sections: Record<string, Section>): string[] {
    const telaUrls: string[] = [];

    // Itera sobre todas as seções
    for (const section of Object.values(sections)) {
      console.log('getUrlImagem: Processando seção', section.url);
      // Adiciona o campo 'tela' da seção, se existir e não for vazio
      if (section.tela && section.tela ) {
        telaUrls.push(section.tela);
      }
      // Verifica subseções recursivamente
      if (section.Subsecoes) {
        const subTelaUrls = this.extractTelaUrls(section.Subsecoes);
        telaUrls.push(...subTelaUrls);
      }
    }

    return telaUrls;
  }

  private handleError(error: any): Observable<never> {
    console.error(`Erro ao buscar seções da URL ${this.url}:`, error);
    return throwError(() => new Error('Falha ao buscar URLs das telas. Tente novamente.'));
  }




}



