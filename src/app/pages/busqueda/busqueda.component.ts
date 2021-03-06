import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_NODE } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params.subscribe( params => {
      this.buscar( params['term'] );
    } );
  }

  ngOnInit() {
  }

  buscar( term: string ) {
    const url = URL_SERVICIO_NODE + '/busqueda/todo/' + term;
    this.http.get( url )
            .subscribe( (resp: any) => {
              console.log( resp );
              this.usuarios = resp.usuarios;
            });
  }

}
