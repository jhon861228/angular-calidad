import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { 
  }

  cambiarTema(tema: string, link: any) {
    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );
  }

  aplicarCheck(link: any) {
    const selector: any = document.getElementsByClassName('selector');
    for ( const ref of selector ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
    this.colocarCheck();
  }

  colocarCheck() {
    
    const selector: any = document.getElementsByClassName('selector');
    
    for ( const ref of selector ) {
      if ( ref.getAttribute('data-theme') === this._ajustes.ajustes.tema ) {
        ref.classList.add( 'working' );
        break;
      }
    }
  }

  ngOnInit() {
    this.colocarCheck();
  }

}
