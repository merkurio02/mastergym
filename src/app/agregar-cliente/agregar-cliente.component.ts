import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';



@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  porcentajeImg: number = 0;

  urlIcolink: string;
  editando: boolean = false;
  id:string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private ar: ActivatedRoute,
    private mensajes:MensajesService
  ) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      telefono: [''],
      correo: ['', Validators.compose([Validators.email, Validators.required])],
      fechaNac: ['', Validators.required]
      ,
      icolink: ['']//, Validators.required]
    });

    this.id = this.ar.snapshot.params.clienteID;
    if (this.id != undefined) {

      this.editando=true;

      this.db.doc<any>('clientes/' + this.id).valueChanges().subscribe(cliente => {
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          rut: cliente.rut,
          telefono: cliente.telefono,
          correo: cliente.correo,
          fechaNac: new Date(cliente.fechaNac.seconds * 1000).toISOString().substring(0, 10),
          icolink: ''
        })
        this.urlIcolink = cliente.icolink;
      })
    }

  }

  guardar() {
    this.formularioCliente.value.icolink = this.urlIcolink;
    this.formularioCliente.value.fechaNac = new Date(this.formularioCliente.value.fechaNac);
    this.db.collection('clientes').add(this.formularioCliente.value).then(x => {
this.mensajes.mensajeLogrado('Guardado','Cliente guardado correctamente')

    })
  }
  editar(){

    this.formularioCliente.value.icolink = this.urlIcolink;
    this.formularioCliente.value.fechaNac = new Date(this.formularioCliente.value.fechaNac);
    this.db.doc('clientes/'+this.id).update(this.formularioCliente.value)
    .then(resultado=>{
      this.mensajes.mensajeLogrado('Actualizado','Cliente actualizado correctamente')
      
      
    }).catch(error=>{
      this.mensajes.mensajeError('ERROR','Algo sucedio')
      
    })
  }

  subirImagen(evento) {

    if (evento.target.files.length > 0) {
      let nombre = new Date().getTime().toString();

      let file = evento.target.files[0]
      let extencion = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let ref = this.storage.ref('clientes/' + nombre + extencion);
      let task = ref.put(file);
      task.then(objeto => {

        ref.getDownloadURL().subscribe(url => {
          this.urlIcolink = url;
        })

      });

      task.percentageChanges().subscribe(p => {
        this.porcentajeImg = parseFloat(p.toFixed(2));
      })

    }
  }

 
}
