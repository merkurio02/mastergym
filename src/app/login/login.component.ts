import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin :FormGroup;
  datosCorrectos=true;
  mensajeError="Revise que las credenciales esten correctas.";

  constructor( private fb:FormBuilder , public auth:AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin=this.fb.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password:['',Validators.required]
    })
  }
  
  login(){

    if(this.formularioLogin.valid){
      this.datosCorrectos=true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password).then(usuario=>{
      
        this.spinner.hide();
      }).catch(error=>{
        this.datosCorrectos=false;
        this.mensajeError=error.message;
        this.spinner.hide();

      });

    }else{
      this.datosCorrectos=false;
    }
    
    
  }

  
}
