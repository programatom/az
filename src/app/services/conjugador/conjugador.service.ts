import { Injectable } from '@angular/core';
import { CONJUGACION } from "../../data/conjugacion";

@Injectable({
  providedIn: 'root'
})
export class ConjugadorService {


  constructor() { }

  conjugate(palabra:{
    infinitivo:string
    tiempo:string
    persona:number
    numero:string
  }){

    // VALIDACION DE INFINITIVO

    //Reconozco tipo de verbo
    let infinitivo = palabra.infinitivo;
    let lengthInf = infinitivo.length;
    let tipo = infinitivo.substring(lengthInf - 2, lengthInf);
    let R = infinitivo.substring(lengthInf - 1, lengthInf);
    if( R != "r"){
      return false;
    };

    let tiempo = (palabra.tiempo).replace(" ", "_");
    let persona = palabra.persona;
    let numero = palabra.numero;

    let objTiempo = CONJUGACION[tiempo + "_" + tipo];
    let terminacion = objTiempo[numero + "_" + persona];

    let infinitivoPuro = infinitivo.substring(0, lengthInf - 2);
    return infinitivoPuro + terminacion;

  }

}
