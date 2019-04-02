import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
