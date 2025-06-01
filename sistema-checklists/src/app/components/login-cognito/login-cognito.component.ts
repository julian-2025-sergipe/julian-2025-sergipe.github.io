import { Component, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { fetchAuthSession, signOut } from '@aws-amplify/auth';
import { Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-login-cognito',
  standalone: true,
  imports: [AmplifyAuthenticatorModule,RouterLink],
  templateUrl: './login-cognito.component.html',
  styleUrl: './login-cognito.component.css'
})
export class LoginCognitoComponent {
  @Output() authStateChange = new EventEmitter<boolean>(); // Emite o estado de autenticação
  user: any = null; // Armazena informações do usuário

  constructor(private readonly modalService: NgbModal, private router: Router) {}

  async ngOnInit() {
    await this.checkAuthState(); // Aguarda a verificação do estado
  }

  async checkAuthState() {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        this.user = { username: session.tokens.accessToken.payload['username'] || 'Usuário' };
        this.authStateChange.emit(true); // Usuário está logado
        console.log('Usuário logado:', this.user);
        this.router.navigate(['/geral/geral']); // Redireciona se o usuário estiver logado
      } else {
        this.user = null;
        this.authStateChange.emit(false); // Usuário não está logado
        console.log('Nenhum usuário logado');
      }
    } catch (err) {
      this.user = null;
      this.authStateChange.emit(false); // Usuário não está logado
      console.log('Erro ao verificar sessão:', err);
    }
  }

  open(content: TemplateRef<any>) {
    console.log('Abrindo modal de login');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log('Fechou o modal de login com:', result);
        this.checkAuthState(); // Verifica o estado após fechar o modal
      },
      (reason) => {
        console.log('Modal fechado por:', reason);
        this.checkAuthState(); // Verifica o estado após fechar o modal
      }
    );
  }

  updateUser(authUser: any) {
    this.user = { username: authUser.username || 'Usuário' };
    this.authStateChange.emit(true); // Emite que o usuário está logado
    console.log('Usuário atualizado:', this.user);
    this.router.navigate(['/geral/geral']); // Redireciona após login bem-sucedido
  }

  async entrar(content: TemplateRef<any>) {
    this.open(content); // Abre a modal de login
  }

  async logSignOut() {
    try {
      await signOut();
      this.user = null;
      this.authStateChange.emit(false); // Emite que o usuário deslogou
      console.log('Usuário deslogado');
    } catch (err) {
      console.error('Erro ao deslogar:', err);
    }
  }
}