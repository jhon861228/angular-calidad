import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  login( usuario: Usuario, recordar: boolean ) {

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    const url = URL_SERVICIO + '/login';

    return this.http.post( url, usuario )
    .subscribe( (resp: any) => {

        this.guardarStorage( resp.id, resp.token, resp.usuario );

        this.router.navigate(['/dashboard']);
      });
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIO + '/usuario';
    return this.http.post( url, usuario );
  }

  actualizarUsuario( usuario: Usuario ) {
    const url = URL_SERVICIO + '/usuario/' + usuario._id + '?token=' + this.token;
    console.log( usuario );
    this.http.put( url, usuario ).subscribe( ( resp: any ) => {
      if ( this.usuario._id === usuario._id ) {
        this.usuario = resp.usuario;
        localStorage.setItem( 'usuario', JSON.stringify( resp.usuario) );
      }
      Swal.fire( 'Usuario Actualizado', usuario.nombre, 'success' );
    });
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
    console.log( 'Storage actualizado' );
  }


  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIO + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  busquedaUsuarios(term: string) {
    const url = URL_SERVICIO + '/busqueda/coleccion/usuarios/' + term;
    return this.http.get( url );
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICIO + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete( url );
  }
}
