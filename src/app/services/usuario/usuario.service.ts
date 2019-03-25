import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO_NODE, URL_SERVICIO_JAVA } from '../../config/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioJava } from 'src/app/models/usuario.java';


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

    // const url = URL_SERVICIO_JAVA + '/login';
    this.guardarStorage( '1', 'tywe5623t2y323t2y3ty2t52',
    {nombre: 'Jhon Diaz',
    email: 'admin@gmail.com',
    password: '',
    img: 'https://cdn4.iconfinder.com/data/icons/people-avatars-12/24/people_avatar_head_wolverine_logan_xman_marvel-512.png'
  }
    );

    this.router.navigate(['/dashboard']);
    /*return this.http.post( url, usuario )
    .subscribe( (resp: any) => {

        this.guardarStorage( resp.id, resp.token, resp.usuario );

        this.router.navigate(['/dashboard']);
      });*/
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

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
    console.log( 'Storage actualizado' );
  }

  crearUsuario( usuario: UsuarioJava ) {
    console.log('Creando usuario');
    const url = URL_SERVICIO_JAVA + '/user-api/create';
    return this.http.post( url, usuario);
  }

  actualizarUsuario( usuario: UsuarioJava ) {
    const url = URL_SERVICIO_JAVA + '/user-api/update';
    console.log( usuario );
    return this.http.put( url, usuario );
  }

  cargarUsuarios() {
    const url = URL_SERVICIO_JAVA + '/user-api/findAll';
    return this.http.get( url );
  }

  busquedaUsuarios(term: string) {
    const url = URL_SERVICIO_JAVA + '/user-api/findByFirstOrLastName/' + term;
    return this.http.get( url );
  }

  borrarUsuario(id: number) {
    const url = URL_SERVICIO_JAVA + '/user-api/deleteById?id=' + id;
    return this.http.delete( url );
  }
}
