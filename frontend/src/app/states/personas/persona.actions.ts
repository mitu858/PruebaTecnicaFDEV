import { createAction, props } from '@ngrx/store';
import { Persona } from '../../models/persona.model';

// Cargar personas desde el backend
export const cargarPersonas = createAction('[Persona List] Cargar Personas');
export const cargarPersonasSuccess = createAction(
    '[Persona API] Cargar Personas Success',
    props<{ personas: Persona[] }>()
);
export const cargarPersonasError = createAction(
    '[Persona API] Cargar Personas Error',
    props<{ error: string }>()
);

// Crear persona
export const crearPersona = createAction(
    '[Persona Form] Crear Persona',
    props<{ persona: Persona }>()
);
export const crearPersonaSuccess = createAction(
    '[Persona API] Crear Persona Success',
    props<{ persona: Persona }>()
);
export const crearPersonaError = createAction(
    '[Persona API] Crear Persona Error',
    props<{ error: string }>()
);

// Actualizar persona
export const actualizarPersona = createAction(
    '[Persona Form] Actualizar Persona',
    props<{ persona: Persona }>()
);
export const actualizarPersonaSuccess = createAction(
    '[Persona API] Actualizar Persona Success',
    props<{ persona: Persona }>()
);
export const actualizarPersonaError = createAction(
    '[Persona API] Actualizar Persona Error',
    props<{ error: string }>()
);

// Eliminar persona
export const eliminarPersona = createAction(
    '[Persona List] Eliminar Persona',
    props<{ id: number }>()
);
export const eliminarPersonaSuccess = createAction(
    '[Persona API] Eliminar Persona Success',
    props<{ id: number }>()
);
export const eliminarPersonaError = createAction(
    '[Persona API] Eliminar Persona Error',
    props<{ error: string }>()
);
