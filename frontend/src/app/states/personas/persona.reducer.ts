import { createReducer, on } from '@ngrx/store';
import { Persona } from '../../models/persona.model';
import {
    cargarPersonasSuccess,
    crearPersonaSuccess,
    actualizarPersonaSuccess,
    eliminarPersonaSuccess
} from './persona.actions';

export interface PersonaState {
    personas: Persona[];
}

export const initialState: PersonaState = {
    personas: []
};

export const personaReducer = createReducer(
    initialState,
    on(cargarPersonasSuccess, (state, { personas }) => ({ ...state, personas })),
    on(crearPersonaSuccess, (state, { persona }) => ({ ...state, personas: [...state.personas, persona] })),
    on(actualizarPersonaSuccess, (state, { persona }) => {
        console.log("Persona actualizada en el store:", persona);
        return {
            ...state,
            personas: state.personas.map(p => (p.id === persona.id ? persona : p))
        };
    }),
    on(eliminarPersonaSuccess, (state, { id }) => ({
        ...state,
        personas: state.personas.filter(p => p.id !== id)
    }))
);
