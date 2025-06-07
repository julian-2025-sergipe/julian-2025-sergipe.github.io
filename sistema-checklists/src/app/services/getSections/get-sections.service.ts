import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Section } from './sections.data';

@Injectable({
  providedIn: 'root',
})
export class GetSectionsService {
  private http = inject(HttpClient);
  private url = environment.apiSection;

  /**
   * Obtém todas as seções do endpoint.
   * @returns Observable com o JSON completo das seções.
   */
  getSections(): Observable<Record<string, Section>> {
    console.log('getSections: Buscando seções em', this.url);
    return this.http.get<Record<string, Section>>(this.url).pipe(
      retry(2),
      catchError((error) => this.handleError(error, 'seções')),
    );
  }

  /**
   * Obtém as URLs das imagens (campo 'tela') de todas as seções e subseções.
   * @returns Observable com um array de URLs de imagens.
   */
  getUrlImagem(): Observable<string[]> {
    console.log('getUrlImagem: Buscando seções em', this.url);
    return this.http.get<Record<string, Section>>(this.url).pipe(
      retry(2),
      map((sections: Record<string, Section>) => this.extractTelaUrls(sections)),
      catchError((error) => this.handleError(error, 'URLs de imagens')),
    );
  }

  /**
   * Obtém as URLs dos sistemas (campo 'url') de todas as seções e subseções.
   * @returns Observable com um array de URLs de sistemas.
   */
  getUrlSistema(): Observable<string[]> {
    console.log('getUrlSistema: Buscando seções em', this.url);
    return this.http.get<Record<string, Section>>(this.url).pipe(
      retry(2),
      map((sections: Record<string, Section>) => this.extractSystemUrls(sections)),
      catchError((error) => this.handleError(error, 'URLs de sistemas')),
    );
  }

  /**
   * Extrai as URLs do campo 'tela' de seções e subseções recursivamente.
   * @param sections Objeto contendo seções ou subseções.
   * @returns Array de URLs de imagens.
   */
  private extractTelaUrls(sections: Record<string, Section>): string[] {
    const telaUrls: string[] = [];
    for (const section of Object.values(sections)) {
      if (section.tela && section.tela.trim() !== '') {
        // Corrige URLs inválidas, como em "Barcos"
        const cleanedTela = section.tela.replace(/^[-]+/, '');
        telaUrls.push(cleanedTela);
      }
      if (section.Subsecoes && Object.keys(section.Subsecoes).length > 0) {
        telaUrls.push(...this.extractTelaUrls(section.Subsecoes));
      }
    }
    return telaUrls;
  }

  /**
   * Extrai as URLs do campo 'url' de seções e subseções recursivamente.
   * @param sections Objeto contendo seções ou subseções.
   * @returns Array de URLs de sistemas.
   */
  private extractSystemUrls(sections: Record<string, Section>): string[] {
    const systemUrls: string[] = [];
    for (const section of Object.values(sections)) {
      if (section.url && section.url.trim() !== '') {
        systemUrls.push(section.url);
      }
      if (section.Subsecoes && Object.keys(section.Subsecoes).length > 0) {
        systemUrls.push(...this.extractSystemUrls(section.Subsecoes));
      }
    }
    return systemUrls;
  }

  /**
   * Trata erros de requisições HTTP.
   * @param error Erro retornado pela requisição.
   * @param context Contexto da requisição (para mensagem de erro).
   * @returns Observable com erro formatado.
   */
  private handleError(error: HttpErrorResponse, context: string): Observable<never> {
    let errorMessage = `Erro ao buscar ${context} da URL ${this.url}: `;
    if (error.status === 0) {
      errorMessage += 'Falha na conexão com o servidor. Verifique sua rede.';
    } else {
      errorMessage += `Código ${error.status} - ${error.message}`;
    }
    console.error(errorMessage, error);
    return throwError(() => new Error(`Falha ao buscar ${context}. Tente novamente.`));
  }
}