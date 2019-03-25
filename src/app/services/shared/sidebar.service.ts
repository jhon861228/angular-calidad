import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [{
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    subMenu: [
      {titulo: 'Dashboard', url: '/dashboard'},
      {titulo: 'Usuarios', url: '/usuarios'}
    ]
  }
];

  constructor() { }
}
