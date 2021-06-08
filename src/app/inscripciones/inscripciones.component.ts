import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  incripciones: Inscripcion[] = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('inscripciones').get().subscribe(resultado => {
      resultado.forEach(inscripcion => {
        let inscripcionObtenida = inscripcion.data() as Inscripcion;
        inscripcionObtenida.id = inscripcion.id;

        inscripcionObtenida.fecha = new Date(inscripcion.data().fecha.seconds * 1000);
        inscripcionObtenida.fechaFinal = new Date(inscripcion.data().fechaFinal.seconds * 1000);

        this.db.doc(inscripcionObtenida.cliente).get().subscribe(cliente => {
          inscripcionObtenida.clienteObtenido = cliente.data().nombre + ' ' + cliente.data().apellido;
        })

        this.db.doc(inscripcionObtenida.plan).get().subscribe(plan=>{
          inscripcionObtenida.plan= plan.data().nombre
        })



        this.incripciones.push(inscripcionObtenida)


      })

    })

    console.log(this.incripciones);

  }

}
