import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeLogrado(titulo:string,mensaje:string){
    Swal.fire({
      title:titulo,
      text:mensaje,
      icon:'success'
    });
  }


  mensajeError(titulo:string,mensaje:string){
    Swal.fire({
      title:titulo,
      text:mensaje,
      icon:'error'
    });
  }
}
