import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import Swal from 'sweetalert2';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;
  editar: boolean = false;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos( this.desde )
        .subscribe( (resp: any) => {
          console.log( resp );
          this.totalRegistros = resp.total;
          this.medicos = resp.medicos;
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
    
    this.cargarMedicos();
  }
  
  buscarMedicos(term: string) {

    if ( term || term.length > 0 ) {
      this._medicoService.busquedaMedicos( term )
            .subscribe( (resp: any) => {
              this.medicos = resp.medicos;
            });
    } else {
      this.cargarMedicos();
    }
    
  }

  borrarMedico( medico: Medico ) {
    
    Swal.fire({
      title: '¿Está seguro de borrar el médico ' + medico.nombre + ' ?',
      text: 'Una vez borrado no se podrá recuperar!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((willDelete) => {
      if (willDelete) {
        this._medicoService.borrarMedico( medico._id )
              .subscribe( resp => {
                Swal.fire({
                  text: 'El medico ' + medico.nombre + ' fue borrado exitósamente!',
                  type: 'success',
                });
                this.cargarMedicos();
              });

      } else {
        Swal.fire('No se borrará el médico ' + medico.nombre + '!');
      }
    });
  }


  editarMedico( medico: Medico ) {

  }
}
