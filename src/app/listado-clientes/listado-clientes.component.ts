import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  clientes:any[]= new Array<any>();

  constructor( private db:AngularFirestore) { }

  ngOnInit(): void {

    // this.db.collection('clientes').valueChanges().subscribe(resultado=>{
    //   this.clientes=resultado;
    //   console.log(resultado);
      
    // });

    this.clientes.length=0;
    this.db.collection('clientes').get().subscribe(resultado=>{
      

      resultado.docs.forEach(item=>{
        let cliente:Cliente= new Cliente();
        cliente.id=item.id;
        cliente.ref=item.ref;
        cliente.data=item.data()
        this.clientes.push(cliente);
        
      });
      console.log(this.clientes);
      
    })
    
  }

}
