import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador-component',
  templateUrl: './buscador-component.component.html',
  styles: []
})
export class BuscadorComponentComponent implements OnInit {
  
  @Input() cargando: boolean = false;
  @Output() digitaLetra: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  buscar( term: string ) {
    this.digitaLetra.emit( term );
    console.log( term );
  }

}
