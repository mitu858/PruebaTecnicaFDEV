import { Persona } from "src/app/models/persona.model";

export interface PersonaState {
    personas: Persona[];
}

export const initialState: PersonaState = {
    personas: []
};
