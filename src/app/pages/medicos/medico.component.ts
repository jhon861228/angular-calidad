import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    
    this.medico.hospital = this.hospital;
    activatedRoute.params.subscribe( params => {

      const id: string = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );

      }

    });
   }

  ngOnInit() {

      this.hospitales = [];

  }

  guardarMedico(form: NgForm) {
    console.log( form );
    if ( !form.valid ) {
      return;
    }

    if ( this.medico._id ) {
      this._medicoService.actualizarMedico( this.medico )
                  .subscribe( (resp: any) => {
                    Swal.fire('Médico ', form.value.nombre + ' actualizado correctamente', 'success');
                    this.router.navigate(['/medicos']);
                  });
    } else {
      this._medicoService.crearMedico( form.value.nombre, form.value.hospital )
                  .subscribe( (resp: any) => {
                    Swal.fire('Médico creado', form.value.nombre + ' creado correctamente', 'success');
                    this.router.navigate(['/medicos']);
                  });
    }
    
  }

  cambiarHospital( id: string ) {
    /*this._hospitalService.obtenerHospital( id )
                .subscribe( (resp: any) => {
                  this.hospital = resp.hospital;
                });*/
  }

  cargarMedico( id: string) {

    this._medicoService.cargarMedico( id )
              .subscribe( (resp: any) => {
                this.medico = resp.medico;
                this.cambiarHospital( this.medico.hospital._id );
              });

  }

}
