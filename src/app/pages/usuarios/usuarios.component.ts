import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( (resp: any) => {
          console.log( resp );
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });
  }

  cambiarDesde(valor: number) {
    
    const desde = this.desde + valor;
    console.log(desde);
    if (desde < 0) {
      this.desde = 0;
      return;
    }
    if (desde >= this.totalRegistros) {
      this.desde = this.totalRegistros;
      return;
    }

    this.desde += valor;
    
    this.cargarUsuarios();
  }
  
  buscarUsuarios(term: string) {

    console.log( term );

    if ( term || term.length > 0 ) {
      this._usuarioService.busquedaUsuarios( term )
            .subscribe( (resp: any) => {
              this.usuarios = resp.usuarios;
            });
    } else {
      this.cargarUsuarios();
    }
    
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioService.usuario._id ) {
      Swal.fire('Error al borrar', 'No se puede borar el usuario logueado', 'error');
      return;
    }

    Swal.fire({
      text: 'Una vez borrado no se podrá recuperar!',
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.borrarUsuario( usuario._id )
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

  actualizarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario );
  }

}
