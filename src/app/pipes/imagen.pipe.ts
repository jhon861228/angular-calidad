import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    const url = URL_SERVICIO + '/img/';
    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }
    console.log( url );
    switch( tipo ) {
      
      case 'usuario' :
        return url + '/usuarios/' + img;
      case 'medico' :
        return url + '/medicos/' + img;

      case 'hospital' :
        return url + '/hospitales/' + img;
      default:
        return url + '/usuarios/xxx'; 

    }

  }

}
