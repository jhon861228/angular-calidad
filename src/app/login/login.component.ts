import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
     ) { }

  ngOnInit() {
    init_plugins();

    this.googleInit();

    this.email = localStorage.getItem( 'email' ) || '';
  }
  
  googleInit() {

    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '193193152166-q7cs5tatvgunv8rikgom64c33q19n9b4.apps.googleusercontent.com',
        scope: 'profile'
      });
      this.attachSignin( document.getElementById('btn-google') );
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, (googleUser) => {
      
      const profile = googleUser.getBasicProfile();
      
    });
  }

  ingresar( forma: NgForm ) {

    if ( !forma.valid ) {
      return;
    }

    const usuario: Usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );
    this._usuarioService.login( usuario, forma.value.recuerdame );

  }

  
}
