import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate, CanActivateChild {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) {}

  canActivate(): boolean {
    console.log( 'Pasó por el guard' );
    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
  canActivateChild() {
    return this.canActivate();
 }
}
