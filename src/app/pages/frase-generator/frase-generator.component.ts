import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ProcesadorApiService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import swal from "sweetalert";
@Component({
  selector: 'app-frase-generator',
  templateUrl: './frase-generator.component.html',
  styleUrls: ['./frase-generator.component.css']
})
export class FraseGeneratorComponent implements OnInit {

  tipoDeForm:string = "Conector";
  objPalabra = new Object() as objPalabra;

  loading = false;

  arrayConectores:Array<objPalabra> = [];
  arrayPalabras:Array<objPalabra> = [];
  htmlIds = [
    "caracter_C",
    "posicion_C",
    "numero_C",
    "genero_C",
    "persona_C",
    "tipo_C",
    "caracter_P",
    "posicion_P",
    "genero_P",
    "fijo_P",
    "numero_P",
    "persona_P",
    "tiempo_P",
    "modo_P",
  ];

  constructor(@Inject(DOCUMENT) private _document,
              private apiServ: ProcesadorApiService,
              private router: Router) { }

  cambiarTipoDeForm(){
    if(this.tipoDeForm == "Conector"){
      this.tipoDeForm = "Palabra";
      document.getElementById("palabras").style.display = "inline";
      document.getElementById("conectores").style.display = "none";
      this.reInitObj();

    }else{
      this.tipoDeForm = "Conector";
      document.getElementById("palabras").style.display = "none";
      document.getElementById("conectores").style.display = "inline";
      this.reInitObj();

    }
  }

  ngOnInit() {
    document.getElementById("palabras").style.display = "none";
    this.agregarEventListeners();
    document.getElementById("loader1234").style.visibility = "hidden";
  }

  eliminar(tipo, index){
    if(tipo=="conector"){
      this.arrayConectores.splice(index,1)
    }else{
      this.arrayPalabras.splice(index,1)
    }
  }

  agregarEventListeners(){
    for(let i = 0; i < this.htmlIds.length; i ++){
      let id:string = this.htmlIds[i];
      let element:any = document.getElementById(id);
      element
      .addEventListener("change", ()=> {
        let idPipe = id.split("_");

        // Este evento se emite cuando cambia el valor de alguno de los dos forms
        // En palabras, sustantivos muestro solo genero y numero.
        // Verbos todo, adjetivos genero y numero.
        if(idPipe[1] == "P"){
          let inputChanged = idPipe[0];
          if(inputChanged == "caracter"){
            let caracter = element.value;
            if(caracter == "sustantivo"){
              // Debería ocultar todos los campos menos genero y numero.
              this.showAccordingToCaracter(["genero" , "numero"], "P");
            }
            if(caracter == "verbo"){
              this.showAccordingToCaracter([ "numero" , "persona", "tiempo" , "modo"] , "P");
            }

            if(caracter == "adverbio"){
              this.showAccordingToCaracter([], "P")
            }

            if(caracter == "adjetivo"){
              this.showAccordingToCaracter(["genero" , "numero"], "P")
            }
            if(caracter == "palabra_fija"){
              this.showAccordingToCaracter(["fijo"], "P")
            }
          }
        }else{
          let inputChanged = idPipe[0];
          if(inputChanged == "caracter"){
            let caracter = element.value;
            if(caracter == "articulo"){
              // Debería ocultar todos los campos menos genero y numero.
              this.showAccordingToCaracter(["genero" , "numero", "tipo"], "C");
            }
            if(caracter == "pronombre"){
              this.showAccordingToCaracter(["genero" , "numero", "tipo", "persona"], "C");
            }

            if(caracter == "preposicion"){
              this.showAccordingToCaracter([], "C")
            }

            if(caracter == "conjuncion"){
              this.showAccordingToCaracter(["tipo"], "C")
            }
          }
        }


        if(element.value != "default"){
          this.objPalabra[idPipe[0]] = element.value;
        }else{
          this.objPalabra[idPipe[0]] = undefined;
        }
        console.log("El obj palabra: " , this.objPalabra);
      });
    }
    let interval = setInterval(()=>{
      let readyState = document.readyState;
      if(readyState == "complete"){
        clearInterval(interval);
      }
    },100);
  }


  // Tipo P o C y array de ids a mostrar

  showAccordingToCaracter(arrayForShow , tipo){

    arrayForShow.push("posicion" , "caracter");

    for(let i = 0; i < this.htmlIds.length; i ++){
      let id = this.htmlIds[i];
      let idSplit = id.split("_");
      if(idSplit[1] == tipo){
        let campo = idSplit[0];
        if(arrayForShow.includes(campo)){
          document.getElementById(id).style.display = "inline";
        }else{
          document.getElementById(id).style.display = "none";
        }
      }
    }
  }

  reInitObj(){
    this.objPalabra = new Object() as objPalabra;
    for(let i = 0; i < this.htmlIds.length; i ++){
      let id = this.htmlIds[i];
      let element:any = document.getElementById(id);
      if(id == "posicion_C" || id == "posicion_P"){
        element.value = 1;
        this.objPalabra.posicion = 1;
      }else{
        element.value = "default";
      }
    }
  }

  guardarFrase(){

    let data = {
      "palabras":this.arrayPalabras,
      "conectores":this.arrayConectores
    }
    this.loading = true;
    document.getElementById("loader1234").style.visibility = "visible";
    this.apiServ.guardarFraseEstructura(data).subscribe((resp)=>{
      this.loading = false;
      swal("Exito!", "Se guardó la frase con éxito", "success");
      console.log(resp);
      document.getElementById("loader1234").style.visibility = "hidden";
      this.reinitAll();
    })
  }

  reinitAll(){
    this.arrayPalabras = [];
    this.arrayConectores = [];
    this.reInitObj();
  }


  agregar(){

    let posicion = this.objPalabra.posicion;

    for(let i = 0; i < this.arrayPalabras.length; i ++){
      let posicionPalabra = this.arrayPalabras[i].posicion;
      if(posicion == posicionPalabra){
        swal("Error!", "Ya hay una palabra con la posición: " + posicion +" !", "error");
        return;
      }
    }
    for(let j = 0; j < this.arrayConectores.length; j ++){
      let posicionConector = this.arrayConectores[j].posicion;
      if(posicion == posicionConector){
        swal("Error!", "Ya hay un conector con la posición: " + posicion +" !", "error");
        return;
      }
    }
    if(this.tipoDeForm == "Conector"){
      if(this.objPalabra.posicion == undefined || this.objPalabra.caracter == undefined){
        swal("Error!", "Los campos posicion y caracter son requeridos", "error");
        return;
      }
      this.arrayConectores.push(this.objPalabra);
    }else{
      if(this.objPalabra.posicion == undefined || this.objPalabra.caracter == undefined){
        swal("Error!", "Los campos posicion y caracter son requeridos", "error");
        return;
      }
      this.arrayPalabras.push(this.objPalabra);
    }
    console.log(this.arrayPalabras, this.arrayConectores)
    this.reInitObj();
  }

}

export interface objPalabra{
  caracter:string
  genero?:string
  numero?:string
  persona?:string
  tiempo?:string
  modo_tipo?:string
  posicion?:number
}
