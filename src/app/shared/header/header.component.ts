import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(    
    public _usuarioService: UsuarioService,
    public router: Router
    ) { }

  ngOnInit() {
  }

  logout() {
    this._usuarioService.logout();
  }
  
  buscar( term: string ) {
    this.router.navigate(['/busqueda', term ]);
  }
}
