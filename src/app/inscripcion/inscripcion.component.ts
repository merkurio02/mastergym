import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Planes } from '../models/planes';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

inscripcion:Inscripcion = new Inscripcion();
clienteSeleccionado:Cliente = new Cliente();
nombreCliente:string;

planes:Planes[]= new Array<Planes>();
planSeleccionado:Planes= new Planes();

icolink:string="";

total:number=null;

  constructor(private db:AngularFirestore, private mensaje:MensajesService) { }

  ngOnInit(): void {
    this.getPlanes();
  }

  getPlanes(){
    this.db.collection('planes').get().subscribe(resultado=>{
      resultado.docs.forEach(item=>{
        let plan:Planes = new Planes();
        plan.data=item.data();
        plan.id=item.id;
        plan.ref=item.ref;
        this.planes.push(plan);
      })
    })

  }

  asignarCliente(cliente){
    this.inscripcion.cliente=cliente.ref;
    this.clienteSeleccionado=cliente;
    this.nombreCliente=cliente.data.nombre+" "+cliente.data.apellido;
    this.icolink=this.clienteSeleccionado.data.icolink;    
  }

  eliminarCliente(){
    this.inscripcion.cliente=undefined;
    this.clienteSeleccionado=new Cliente();
    this.nombreCliente="";
  }

  seleccionarPlan(event){
    let id:string=event.target.value;
    
    if(id!="null"){
    this.planSeleccionado=this.planes.find(x=> x.id==id)
    console.log(this.planSeleccionado);
    this.inscripcion.plan=this.planSeleccionado.ref;  
    this.inscripcion.total=this.planSeleccionado.data.valor;

    this.inscripcion.fecha=new Date();

    this.inscripcion.fechaFinal=this.getFechaFinal(this.inscripcion.fecha,this.planSeleccionado.data.duracion,this.planSeleccionado.data.tipoDuracion);
    
    this.total=this.planSeleccionado.data.valor;
    }
    else{
      
    this.planSeleccionado = new Planes();
    this.inscripcion.cliente=null;
    this.inscripcion.plan=null;  
    this.inscripcion.total=0;

    this.inscripcion.fecha=null;

    this.inscripcion.fechaFinal=null;
    
    this.total=0;
    }
  }

  guardarInscripcion(){
    if(this.validar().valido){

      this.db.collection('inscripciones').add({
        fecha:this.inscripcion.fecha,
        fechaFinal:this.inscripcion.fechaFinal,
        cliente:this.inscripcion.cliente,
        plan:this.inscripcion.plan,
        total:this.inscripcion.total
      }).then(resultado=>{
      this.mensaje.mensajeLogrado("LISTO","logrado");
      this.eliminarCliente();
      this.inscripcion= new Inscripcion();
      this.total=0;

      })
    }else{
      this.mensaje.mensajeError('ERROR',this.validar().mensaje);
      
    }
  }

  validar():any{

    let respuesta={
      valido:false,
      mensaje:""
    }

    if(this.inscripcion.cliente==null){
      respuesta.mensaje="No se ha seleccionado ningun cliente"
      return respuesta;
    }
    if(this.inscripcion.plan==null){
      
      respuesta.mensaje="No se ha seleccionado ningun plan"
      return respuesta;
    }
    respuesta.valido=true;
    return respuesta;



  }

  getFechaFinal(fechaInicio:Date, duracion:number, tipoDuracion:string){

    if(tipoDuracion=="Dia"){
      return new Date(fechaInicio.getFullYear(),fechaInicio.getMonth(),fechaInicio.getDate()+duracion);
    }
    if(tipoDuracion=="Semana"){
      return new Date(fechaInicio.getFullYear(),fechaInicio.getMonth(),fechaInicio.getDate()+(7*duracion));
    }
    if(tipoDuracion=="Quincena"){
      return new Date(fechaInicio.getFullYear(),fechaInicio.getMonth(),fechaInicio.getDate()+(15*duracion));
    }
    if(tipoDuracion=="Mes"){
      return new Date(fechaInicio.getFullYear(),fechaInicio.getMonth()+duracion,fechaInicio.getDate());
    }
    if(tipoDuracion=="año"){
      return new Date(fechaInicio.getFullYear()+duracion,fechaInicio.getMonth(),fechaInicio.getDate());
    }
    return new Date()    
  }

}
