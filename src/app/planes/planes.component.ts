import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Planes } from '../models/planes';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  formularioPlan: FormGroup;
  planes: any[] = new Array<any>();
  editando: boolean = false;

  idEditando: string;

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private mensaje: MensajesService) { }

  ngOnInit(): void {
    this.formularioPlan = this.fb.group({
      nombre: ['', Validators.required],
      valor: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]

    })
    this.actualizaLista()

  }
  actualizaLista() {
    this.planes.length = 0;
    this.db.collection('planes').get().subscribe(resultado => {
      resultado.docs.forEach(item => {
        let plan: Planes = new Planes();
        plan.id = item.id;
        plan.ref = item.ref;
        plan.data = item.data()
        this.planes.push(plan);
      })
    })
  }

  guardar() {
    this.db.collection('planes').add(this.formularioPlan.value).then(() => {
      this.mensaje.mensajeLogrado('Registrado', 'El plan' + this.formularioPlan.value.nombre + 'ha sido registrado correctamente');
      this.formularioPlan.reset();
      this.actualizaLista();
    }).catch(() => {
      this.mensaje.mensajeError('Error', 'Algo ha sucedido')
    })

  }

  editarPlan(item: any) {
    this.editando = true;
    this.idEditando = item.id;
    this.formularioPlan.setValue({
      nombre: item.data.nombre,
      valor: item.data.valor,
      duracion: item.data.duracion,
      tipoDuracion: item.data.tipoDuracion
    })

  }

  editar() {
    this.db.doc('planes/' + this.idEditando).update(this.formularioPlan.value).then(() => {
      this.mensaje.mensajeLogrado("Actualizado", "Plan actualizado correctamente");
      this.actualizaLista();
    }).catch(() => {
      this.mensaje.mensajeError("ERROR", "Algo paso y no sabemos qué ni por qué")
    })
  }

  cancelarEditar() {
    this.formularioPlan.reset();
    this.editando = false;
    this.idEditando = "";
  }

}
