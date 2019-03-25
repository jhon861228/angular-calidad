import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { UsuarioJava } from 'src/app/models/usuario.java';

declare var swal: any;
declare var $ ;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioJava[] = [];
  usuario: UsuarioJava;
  totalRegistros: number = 0;
  cargando: boolean = false;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = new UsuarioJava();
   }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios()
        .subscribe( (resp: any) => {
          console.log( resp );
          this.totalRegistros = resp.length;
          this.usuarios = resp;
          this.cargando = false;
        });
  }

  buscarUsuarios(term: string) {

    console.log( term );

    if ( term || term.length > 0 ) {
      this._usuarioService.busquedaUsuarios( term )
            .subscribe( (resp: any) => {
              this.usuarios = resp;
            });
    } else {
      this.cargarUsuarios();
    }

  }

  borrarUsuario( usuario: UsuarioJava ) {
    Swal.fire({
      text: 'Una vez borrado no se podrá recuperar!',
      title: '¿Está seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'Cancelar'
    })
    .then((willDelete) => {

      if (willDelete.value) {
        this._usuarioService.borrarUsuario( usuario.id )
              .subscribe( resp => {
                Swal.fire({
                  text: 'El usuario ' + usuario.email + ' fue borrado exitósamente!',
                  type: 'success',
                });
                this.cargarUsuarios();
              });
      } else {
        Swal.fire('No se borrará el usuario ' + usuario.email + '!');
      }
    });
  }

  guardar( forma: any ) {
    if ( this.usuario.id > 0 ) {
      this._usuarioService.actualizarUsuario( this.usuario ).subscribe( ( resp: any ) => {
        Swal.fire( 'Usuario ', this.usuario.firstName + ' ' + this.usuario.lastName + ' actualizado', 'success' );
        this.cargarUsuarios();
      });
    } else {
      this._usuarioService.crearUsuario( this.usuario ).subscribe( ( resp: any ) => {
        Swal.fire( 'Usuario ', this.usuario.firstName + ' ' + this.usuario.lastName + ' creado', 'success' );
        this.cargarUsuarios();
      });
    }
    $('#modal-usuarios').modal('hide');
  }

  modificar(usuario: UsuarioJava) {
    this.usuario = this.simpleClone(usuario);
    $('#modal-usuarios').modal('show');
  }
  simpleClone(obj: any) {
    return Object.assign({}, obj);
  }
  agregar() {
    this.usuario = new UsuarioJava();
    $('#modal-usuarios').modal('show');
  }
}
