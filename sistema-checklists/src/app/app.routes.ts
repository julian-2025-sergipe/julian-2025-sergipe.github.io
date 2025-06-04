import { Routes } from '@angular/router';
import { NovosComponent } from './components/novos/novos.component';
import { LoginCognitoComponent } from './components/login-cognito/login-cognito.component';
import { ConsomerApiComponent } from './components/consomer-api/consomer-api.component';

import { AuthGuardService } from './services/auth-cognito/auth.guard.service'; // Importe o guarda

export const routes: Routes = [
  { path: 'consomer', component: ConsomerApiComponent },
  { path: 'login', component: LoginCognitoComponent },
  { 
    path: ':parametro/:parametro', 
    component: NovosComponent, 
    canActivate: [AuthGuardService] // Protege a rota com o guarda
  },
];


