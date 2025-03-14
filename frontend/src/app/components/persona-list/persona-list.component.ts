import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona.model';
import { selectPersonas } from '../../states/personas/persona.selectors';
import { cargarPersonas, eliminarPersona, actualizarPersona } from '../../states/personas/persona.actions'
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss'],
  providers: [MessageService]
})
export class PersonaListComponent implements OnInit {
  personas$: Observable<Persona[]>;
  personaEditando: Persona | null = null;

  constructor(private store: Store, private messageService: MessageService) {
    this.personas$ = this.store.select(selectPersonas).pipe(
      map(personas => personas ? [...personas] : [])
    );
  }

  ngOnInit(): void {
    this.store.dispatch(cargarPersonas());
  }

  eliminar(id: number): void {
    this.store.dispatch(eliminarPersona({ id }));
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Persona eliminada correctamente' });
  }
  editar(persona: Persona): void {
    this.personaEditando = { ...persona };  // Clonar la persona para edición
  }
  guardarEdicion(): void {
    if (this.personaEditando) {
      this.store.dispatch(actualizarPersona({ persona: this.personaEditando }));
      this.personaEditando = null;
    }
  }



  cancelarEdicion(): void {
    this.personaEditando = null;
  }

}