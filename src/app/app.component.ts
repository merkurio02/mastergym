import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mastergym';
  cargando: boolean = true;
  user: firebase.User;

  constructor(public auth: AngularFireAuth) {

    this.auth.user.subscribe(usuario => {
      setTimeout(() => {
        this.auth.user.subscribe(usuario => {
          this.user = usuario;
          this.cargando = false;
        });
      }, 2000)
    });
  }


}
