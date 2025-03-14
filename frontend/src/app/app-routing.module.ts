import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaPage } from './pages/persona/persona.page';

const routes: Routes = [
  { path: '', redirectTo: 'personas', pathMatch: 'full' }, // Redirige a la página de personas por defecto
  { path: 'personas', component: PersonaPage }, // Página que contiene el formulario y la lista
  { path: '**', redirectTo: 'personas' } // Redirige cualquier ruta desconocida a la página de personas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
