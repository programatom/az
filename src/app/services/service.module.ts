import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesadorApiService, ProcesadorFraseDetService } from './service.index';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  providers:[
    ProcesadorApiService,
    ProcesadorFraseDetService

  ]
})
export class ServiceModule { }
