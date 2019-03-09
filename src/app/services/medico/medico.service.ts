import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIO } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medico: Medico;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { 
    this.token = this._usuarioService.token;
  }

  crearMedico( nombre: string, hospital: string ) {
    const url = URL_SERVICIO + '/medico?token=' + this.token;
    return this.http.post( url, { nombre, hospital }  );
  }

  actualizarMedico( medico: Medico ) {
    const url = URL_SERVICIO + '/medico/' + medico._id + '?token=' + this.token;
    return this.http.put( url, medico );
  }


  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIO + '/medico?desde=' + desde;
    return this.http.get( url );
  }
  
  cargarMedico( id: string ) {
    const url = URL_SERVICIO + '/medico/' + id;
    return this.http.get( url );
  }

  busquedaMedicos(term: string) {
    const url = URL_SERVICIO + '/busqueda/coleccion/medicos/' + term;
    return this.http.get( url );
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIO + '/medico/' + id + '?token=' + this.token;
    return this.http.delete( url );
  }
}
