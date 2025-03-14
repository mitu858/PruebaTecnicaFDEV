import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { crearPersona } from '../../states/personas/persona.actions';
import { Persona } from 'src/app/models/persona.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss'],
  providers: [MessageService]
})
export class PersonaFormComponent implements OnInit {
  personaForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.personaForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios' });
      return;
    }

    const persona: Persona = this.personaForm.value;
    this.store.dispatch(crearPersona({ persona }));

    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Persona creada correctamente' });
    this.personaForm.reset();
  }
}
