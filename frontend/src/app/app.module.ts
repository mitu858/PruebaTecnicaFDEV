import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { PersonaListComponent } from './components/persona-list/persona-list.component';
import { StoreModule } from '@ngrx/store';
import { personaReducer } from '../app/states/personas/persona.reducer';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { PersonaEffects } from './states/personas/persona.effects';
import { InputTextModule } from 'primeng/inputtext';
import { PersonaPage } from './pages/persona/persona.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PersonaFormComponent,
    PersonaListComponent,
    PersonaPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ personas: personaReducer }),
    TableModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    EffectsModule.forRoot([PersonaEffects]),
    InputTextModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
