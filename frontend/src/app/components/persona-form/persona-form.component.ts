import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { crearPersona } from '../../states/personas/persona.actions';
import { Persona } from 'src/app/models/persona.model';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss']
})
export class PersonaFormComponent implements OnInit {
    personaForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.personaForm.valid) {
      const persona: Persona = {
        id: Math.floor(Math.random() * 1000),
        ...this.personaForm.value
      };
      this.store.dispatch(crearPersona({ persona }));
      this.personaForm.reset();
    }
  }
}
