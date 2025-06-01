import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { fetchAuthSession } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        return true;
      }
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    } catch (err) {
      console.error('Erro ao verificar sessão:', err);
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}