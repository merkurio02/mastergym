import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion {

    fecha:Date;
    fechaFinal:Date;
    cliente:DocumentReference;
    plan:DocumentReference;
    total:number;

    id:string;
    clienteObtenido:string;
    planObtenido:string;

    constructor() {
        this.fecha=null;
        this.fechaFinal=null;
        this.cliente=null;
        this.plan=this.plan;
        this.total=this.total;
        this.id=null;
        this.clienteObtenido=null;
        this.planObtenido=null;
        
    }
}