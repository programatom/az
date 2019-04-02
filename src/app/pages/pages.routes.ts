import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { FraseGeneratorComponent } from './frase-generator/frase-generator.component';
import { FrasesVisualizerComponent } from './frases-visualizer/frases-visualizer.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const pagesRoutes:Routes = [
  {
    path:"",
    component: PagesComponent,
    children:[
      {path:"principal", component: PrincipalComponent, data:{ titulo: "Principal"}},
      {path:"fraseGen", component: FraseGeneratorComponent, data:{ titulo: "Generador"}},
      {path:"frasesVisual", component: FrasesVisualizerComponent, data:{ titulo: "Generador"}},
      {path:"login", component: LoginComponent, data:{ titulo: "Generador"}},
      {path:"forbidden", component: ForbiddenComponent, data:{ titulo: "Generador"}},

      {path:"", redirectTo: "/principal", pathMatch:"full"},
    ]
  },
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
