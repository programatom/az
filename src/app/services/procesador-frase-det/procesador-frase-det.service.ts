import { Injectable } from '@angular/core';
import { FRASES } from 'src/app/data/frases';
import { ObjFrase, ObjPalabra } from 'src/app/interfaces/interfaces';
import { PALABRAS } from 'src/app/data/palabras';
import { ARTICULOS } from 'src/app/data/articulos';
import { CONJUNCIONES } from 'src/app/data/conjunciones';
import { PREPOSICIONES } from 'src/app/data/preposiciones';
import { PRONOMBRES } from 'src/app/data/pronombres';
import { HttpCallsService } from '../auxiliar-http-frase/http-calls.service';
import { ConjugadorService } from '../conjugador/conjugador.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesadorFraseDetService {

  frasesArray: Array<ObjFrase> = FRASES;
  randomMin: number;
  randomMax: number;
  frasesResultantes = new Array();

  restriccionesVerbos = new Object() as any;

  constructor(private http: HttpCallsService,
              private conjugador: ConjugadorService) { }


  generarFrase() {

    // ACÁ DEBERÍA BUSCAR LAS FRASE Y LUEGO, EN CONECTORES LOS TIENE ACÁ.
    // LAS PALABRAS QUE NECESITA LAS BUSCA EN EL SERVIDOR.

    return new Promise((resolve, reject) => {
      this.http.buscarFrases().subscribe((respuesta: any) => {
        var frase: {
          palabras: any,
          conectores: any
        } = respuesta.data;

        if (respuesta.status == "success") {
          let frases = respuesta.data;
          let frasesLength = frases.length;
          let numeroRand = this.generateRandomNumber(0, frasesLength - 1);
          console.log("La frase numero rand es: " + numeroRand);
          frase = frases[numeroRand];
        }

        let restringir = true;
        console.log("La frase elegida es: ", JSON.parse(JSON.stringify(frase)));


        //BUSCAR PALABRAS

        // SI ES UN VERBO, SI EL TIEMPO ES INFINITIVO, SINO TRAEME SOLO LOS IS_REGULAR = 1,

        this.conjugationLogic(frase);

        console.log(frase.palabras);

        let arrayPalabrasFinal = [];

        let palabraAEnviar = [];
        for(let i = 0; i < frase.palabras.length; i ++){
          let palabra = frase.palabras[i];
          let caracter = palabra.caracter;
          if(caracter == "palabra_fija"){
            let palabra_fija = palabra.fijo;
            let posicion = palabra.posicion;
            arrayPalabrasFinal.push({
              "palabra":palabra_fija,
              "posicion":posicion
            });
          }else{
            palabraAEnviar.push(palabra);
          }
        }

        this.http.buscarPalabrasConRestricciones(palabraAEnviar).subscribe((palabrasElegidas:any) => {
          //BUSCAR CONECTORES
          console.log(palabrasElegidas);

          let arrayPalabras = palabrasElegidas.data;
          // array de { palabras: [...] , posicion: XX}
          for(let i = 0; i < arrayPalabras.length; i ++){
            let palabras = arrayPalabras[i]["palabras"];
            if(palabras.length == 0){
              reject();
              return;
            }


            let posicion = arrayPalabras[i]["posicion"]
            let palabrasLength = palabras.length;
            let randomNum = this.generateRandomNumber(0, palabrasLength - 1);
            let palabraRandomFull = palabras[randomNum];
            let palabraRandom = palabraRandomFull.palabra;
            let caracter = palabraRandomFull["caracter"]

            if( caracter == "verbo"){

              // EN EL CASO DE VERBOS REGULARES, TENGO QUE HACER ESTE NUEVO OBJETO PARA ALMACENAR LAS RESTRICCIONES
              // IMPUESTAS POR LA FRASE. PORQUE TENGO QUE ENVIAR LA PALABRA SIN ESAS RESTRICCIONES
              // PARA QUE ME TRAIGA TODOS LOS INFINITIVOS REGULARES Y DESPUES CONJUGARLO Y DESPUES
              // VOLVER A PONERLO EN LA PALABRA

              if(this.restriccionesVerbos[posicion].tiempo != "infinitivo"){
                let restricciones = this.restriccionesVerbos[posicion];
                let infinitivo = palabraRandomFull.infinitivo;
                restricciones.infinitivo = infinitivo;
                let palabraConjugada = this.conjugador.conjugate(restricciones);
                if(palabraConjugada == false){
                  reject();
                  return;
                };
                arrayPalabrasFinal.push({
                  "palabra":palabraConjugada,
                  "posicion":posicion
                });
              }else{
                arrayPalabrasFinal.push({
                  "palabra":palabraRandomFull.infinitivo,
                  "posicion":posicion
                })
              }

            }else{
              arrayPalabrasFinal.push({
                "palabra":palabraRandom,
                "posicion":posicion
              })
            }

          }


          let conectores = this.buscarConectores(frase, restringir);

          let concat = arrayPalabrasFinal.concat(conectores);
          console.log(concat)
          // Ahora meto cada uno en su posicion
          let fraseFinal = "";

          for(let i = 0; i < concat.length; i ++){
            for(let j = 0; j < concat.length;j ++){
              let posicion = concat[j].posicion;
              if( i + 1 == posicion){
                fraseFinal = fraseFinal + " " + concat[j].palabra;
              }
            }
          }

          resolve(fraseFinal);
        })
      })
    })
  }

  conjugationLogic(frase){
    for(let i = 0 ; i < frase.palabras.length ; i ++){
      var palabra =  frase.palabras[i];
      let caracter = palabra.caracter;
      if(caracter == "verbo"){
        let tiempo = palabra.tiempo;
        if(tiempo != "infinitivo"){
          palabra.is_regular = 1;
          this.saveRestriccionesAndReinitializePalabra(palabra);
        }else{
          this.saveRestriccionesAndReinitializePalabra(palabra)
        }
      }
    }

    console.log(this.restriccionesVerbos)

    return;
  }

  saveRestriccionesAndReinitializePalabra(palabra){
    this.restriccionesVerbos[palabra.posicion] = {
      "tiempo": palabra.tiempo,
      "persona": palabra.persona,
      "numero": palabra.numero,
    };
    palabra.tiempo = "";
    palabra.persona = "";
    palabra.numero = "";
  }

  buscarConectores(frase: ObjFrase, restringir: boolean) {

    let conectoresResultantes = new Array();
    let conectoresLength = frase.conectores.length;

    for (let i = 0; i < conectoresLength; i++) {

      let conectorObj: any = frase.conectores[i];
      let conector = conectorObj.caracter;

      if (conector == "articulo") {
        let articulo = this.elegirConector(restringir, conectorObj, ARTICULOS);
        conectoresResultantes.push({
          "palabra": articulo.articulo,
          "posicion": conectorObj.posicion
        })
      }
      if (conector == "conjuncion") {
        let conjuncion = this.elegirConector(restringir, conectorObj, CONJUNCIONES);
        conectoresResultantes.push({
          "palabra": conjuncion.conjuncion,
          "posicion": conectorObj.posicion
        })
      }
      if (conector == "preposicion") {
        let preposicion = this.elegirConector(restringir, conectorObj, PREPOSICIONES);
        conectoresResultantes.push({
          "palabra": preposicion,
          "posicion": conectorObj.posicion
        })
      }
      if (conector == "pronombre") {
        let pronombre = this.elegirConector(restringir, conectorObj, PRONOMBRES);
        conectoresResultantes.push({
          "palabra": pronombre.pronombre,
          "posicion": conectorObj.posicion
        })
      }
    }

    return conectoresResultantes;
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  elegirConector(restringir, conectorObj, superArray) {

    let restricciones = conectorObj;
    if (restricciones == undefined) {
      restringir = false;
    }

    if (restringir) {
      let restriccionesKeys = Object.keys(conectorObj);
      // Aca tengo que sacar las que no tienen nada y la posicion

      restriccionesKeys = restriccionesKeys.filter(function(item) {
        if(item != "posicion"){
          if(restricciones[item] != ""){
            return item
          }
        }
      });

      let restriccionesLength = restriccionesKeys.length;

      // Ahora barro el array de articulos y lo comparo con las restricciones

      let elementosValidos = new Array();
      for (let i = 0; i < superArray.length; i++) {
        let elementoInvalido = false;
        for (let j = 0; j < restriccionesLength; j++) {
          var elemento = superArray[i];
          let key = restriccionesKeys[j];

          let restriccion = restricciones[key];
          let comparador = elemento[key];
          if (comparador != restriccion && comparador != undefined) {
            elementoInvalido = true;
          }
        }
        if (elementoInvalido == false) {
          elementosValidos.push(elemento);
        }
      }
      if (elementosValidos.length == 0) {
        console.log("Ocurrió un error! No se encontró un elemento conector.")
        return;
      }
      let numeroRandom = this.generateRandomNumber(0, elementosValidos.length - 1);
      console.log(elementosValidos)
      return elementosValidos[numeroRandom];
    } else {
      let numeroRandom = this.generateRandomNumber(0, superArray.length - 1);
      return superArray[numeroRandom];
    }
  }
}
