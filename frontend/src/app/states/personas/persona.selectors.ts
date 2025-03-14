import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonaState } from '../../states/personas/persona.reducer';

export const selectPersonaState = createFeatureSelector<PersonaState>('personas');

export const selectPersonas = createSelector(
    selectPersonaState,
    (state: PersonaState) => state.personas
);
