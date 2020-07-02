import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const url = environment.imgPath
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: unknown, size: string = 'w300'): unknown {
    if(!imagen){
      return 'assets/no-image-banner.jpg';
    }

    return `${url}${size}${imagen}`;
  }

}
