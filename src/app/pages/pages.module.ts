import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"

// RUTAS
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { BrowserModule } from '@angular/platform-browser';
import { PrincipalComponent } from './principal/principal.component';
import { FraseGeneratorComponent } from './frase-generator/frase-generator.component';
import { FrasesVisualizerComponent } from './frases-visualizer/frases-visualizer.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


@NgModule({
  declarations:[
    PagesComponent,
    PrincipalComponent,
    FraseGeneratorComponent,
    FrasesVisualizerComponent,
    LoginComponent,
    ForbiddenComponent
    ],
  exports:[
    PagesComponent
  ],
  imports:[
    PAGES_ROUTES,
    FormsModule,
    BrowserModule
  ]
})

export class PagesModule {}
