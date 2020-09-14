import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageService } from './services/image.service';
import { JuegoService } from './services/juego.service';
import { JuegoMainComponent } from './Components/Juego/juego-main/juego-main.component';
import { JuegoListComponent } from './Components/Juego/juego-main/juego-list/juego-list.component';
import { JuegoFormComponent } from './Components/Juego/juego-main/juego-form/juego-form.component';
import { JuegoCardComponent } from './Components/Juego/juego-main/juego-card/juego-card.component';
import { JuegoEditComponent } from './Components/Juego/juego-main/juego-edit/juego-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JuegoMainComponent,
    JuegoListComponent,
    JuegoFormComponent,
    JuegoCardComponent,
    JuegoEditComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    ImageService,
    {
      provide: LOCALE_ID,
      useValue: 'es-EC'
    },
    JuegoService,
    {
      provide: LOCALE_ID,
      useValue: 'es-EC'
    },
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
