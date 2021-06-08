import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import * as EventEmitter from 'events';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes:Cliente[]= new Array<Cliente>();
  @Input('nombre') nombre:string;
  @Output('seleccionoCliente') seleccionoCliente= new EventEmitter();
  @Output('canceloCliente') canceloCliente= new EventEmitter();

  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('clientes').get().subscribe(resultado=>{
      resultado.docs.forEach(item=>{
        let cliente:Cliente= new Cliente();
        cliente.data=item.data();
        cliente.id=item.id;
        cliente.ref=item.ref;
        cliente.visible=false;
        this.clientes.push(cliente);
      })
    })
  }

  buscaClientes(event){
    let value=event.target.value;
  
    this.clientes.forEach(c=>{
      if( value!=''  && c.data.nombre.toLowerCase(). includes(value.toLowerCase())){
        c.visible=true;
      }else{
        c.visible=false;
      }

    })
    
  }

  seleccionarCliente(cliente){
    this.nombre=cliente.data.nombre+" "+cliente.data.apellido;
    this.invisibilizar();

    this.seleccionoCliente.emit(cliente);
  }

  cancelarSeleccion(){
    this.nombre=undefined;
    this.canceloCliente.emit();
  }

  invisibilizar(){
    this.clientes.forEach(c=>{
        c.visible=false;
    })
  }

}
