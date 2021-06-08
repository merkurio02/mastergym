import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(private auth:AngularFireAuth) { }

  user:firebase.User;
  ngOnInit(): void {
    this.auth.user.subscribe(usuario=> {
      this.user = usuario;
    });
  }

  logout(){

    this.auth.signOut();

  }
}
