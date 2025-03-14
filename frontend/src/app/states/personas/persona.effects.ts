import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonaService } from '../../services/persona.service';
import {
    cargarPersonas,
    cargarPersonasSuccess,
    cargarPersonasError,
    crearPersona,
    crearPersonaSuccess,
    crearPersonaError,
    actualizarPersona,
    actualizarPersonaSuccess,
    actualizarPersonaError,
    eliminarPersona,
    eliminarPersonaSuccess,
    eliminarPersonaError
} from './persona.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PersonaEffects {
    constructor(private actions$: Actions, private personaService: PersonaService) { }

    cargarPersonas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cargarPersonas),
            mergeMap(() =>
                this.personaService.getPersonas().pipe(
                    map(personas => cargarPersonasSuccess({ personas })),
                    catchError(error => of(cargarPersonasError({ error: error.message })))
                )
            )
        )
    );

    crearPersona$ = createEffect(() =>
        this.actions$.pipe(
            ofType(crearPersona),
            mergeMap(action =>
                this.personaService.createPersona(action.persona).pipe(
                    map(persona => crearPersonaSuccess({ persona })),
                    catchError(error => of(crearPersonaError({ error: error.message })))
                )
            )
        )
    );

    actualizarPersona$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actualizarPersona),
            mergeMap(action =>
                this.personaService.updatePersona(action.persona).pipe(
                    map(personaActualizada => {
                        if (!personaActualizada) {
                            return actualizarPersonaError({ error: "El backend devolvió null en la actualización." });
                        }
                        return actualizarPersonaSuccess({ persona: personaActualizada });
                    }),
                    catchError(error => {
                        return of(actualizarPersonaError({ error: error.message }));
                    })
                )
            )
        )
    );


    eliminarPersona$ = createEffect(() =>
        this.actions$.pipe(
            ofType(eliminarPersona),
            mergeMap(action =>
                this.personaService.deletePersona(action.id).pipe(
                    map(() => eliminarPersonaSuccess({ id: action.id })),
                    catchError(error => of(eliminarPersonaError({ error: error.message })))
                )
            )
        )
    );
}
