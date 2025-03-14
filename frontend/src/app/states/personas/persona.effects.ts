import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PersonaService } from '../../services/persona.service';
import { MessageService } from 'primeng/api';
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

@Injectable()
export class PersonaEffects {
    constructor(private actions$: Actions, private personaService: PersonaService, private messageService: MessageService) { }

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
                    map(persona => {
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Persona creada correctamente' });
                        return crearPersonaSuccess({ persona });
                    }),
                    catchError(error => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la persona' });
                        return of(crearPersonaError({ error: error.message }));
                    })
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
    mostrarMensajeExito$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actualizarPersonaSuccess),
                tap(() => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Persona actualizada correctamente' });
                })
            ),
        { dispatch: false }
    );

    mostrarMensajeError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actualizarPersonaError),
                tap(() => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la persona' });
                })
            ),
        { dispatch: false }
    );
}
