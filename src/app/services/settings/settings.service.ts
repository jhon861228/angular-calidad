import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
 ajustes: Ajustes = {
   temaUrl: 'assets/css/colors/default.css',
   tema: 'default'
 };

  constructor(@Inject(DOCUMENT) private _document) { this.cargarAjustes(); }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      this.aplicarTema( this.ajustes.tema );
    } else {
      this.aplicarTema( this.ajustes.tema );
    }
    
  }

  aplicarTema( tema: string ) {
    
    const url: string =  `assets/css/colors/${tema}.css`;
    this.ajustes = {temaUrl: url, tema: tema};
    this.guardarAjustes();
    this._document.getElementById('tema').setAttribute('href', url);
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}