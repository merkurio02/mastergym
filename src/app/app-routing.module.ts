import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { PlanesComponent } from './planes/planes.component';

const routes: Routes = [
  { path: '', redirectTo: 'agregar-inscripcion', pathMatch: 'full' },
  { path: 'agregar-inscripcion', component: InscripcionComponent },
  { path: 'listado-inscripciones', component: InscripcionesComponent },
  { path: 'listado-clientes', component: ListadoClientesComponent },
  { path: 'agregar-cliente', component: AgregarClienteComponent },
  { path: 'agregar-cliente/:clienteID', component: AgregarClienteComponent },
  { path: 'planes', component: PlanesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
