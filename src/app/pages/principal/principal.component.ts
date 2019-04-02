import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ProcesadorApiService, ProcesadorFraseDetService } from 'src/app/services/service.index';
import TypeIt from 'typeit';
import swal from "sweetalert"
import { DOCUMENT } from '@angular/platform-browser';

declare function initPlugin();


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css', '../../../assets/css/clock/flipclock.css'
    , '../../../assets/css/clock/style-clock.css'],
})
export class PrincipalComponent implements OnInit {

  palabra: string = "";
  showLoader = false;

  stringFrases: string = "";
  fraseNueva = "";
  fraseTypeada = "";

  typingAudio = new Audio();
  timeOutFrase: any;
  stopAnimation = false;
  lastCount: any;
  enviandoPalabra = false;

  uno:number = 0;
  dos:number = 0;
  tres:number = 0;
  cuatro:number = 0;

  constructor(private procesadorApi: ProcesadorApiService,
    private procesadorFraseDetServ: ProcesadorFraseDetService,
    @Inject(DOCUMENT) private _document) {


  }


  filtrarPalabra(palabra) {

    if (typeof palabra != "string") {
      return false;
    };
    if (palabra == "") {
      return false;
    }

    if (palabra.split(" ").length > 1) {
      swal("Solo se puede enviar una palabra..")
      return false;
    }
    return true;
  }

  enviarPalabra() {

    if (this.filtrarPalabra(this.palabra) == false) {
      console.log("error de tipo")
      this.palabra = "";
      return;
    }

    var palabra = JSON.parse(JSON.stringify(this.palabra))
    this.palabra = "";

    this.procesadorApi.apiCallPalabra(palabra.toLowerCase()).subscribe((respuestaServidor) => {
      this.palabra = "";
      console.log(respuestaServidor);
      if (respuestaServidor == null) {
        console.log("No se reconocio la palabra");
        return;
      }

      if (respuestaServidor.data == "ya_ingresada") {
        console.log("Ya se ingresó la palabra")
        return;
      }

      this.searchNewCountAndApply();

      (err) => {
        console.log("Error de servidor");
        console.log(err);
      }
    })
  }

  generarFrase() {

    if (this.stopAnimation) {
      return;
    }

    this.procesadorFraseDetServ.generarFrase().then((frase: any) => {
      console.log(frase)

      if (this.stopAnimation) {
        return;
      }
      this.fraseNueva = frase;
      this.nuevaInstanciaDeType();
    })
      .catch(() => {
        console.log("No se encontró una palabra de la frase..");
        this.generarFrase();
      });

  }

  nuevaInstanciaDeType() {

    if (this.stopAnimation) {
      return;
    }

    this.stringFrases = this.fraseTypeada + this.stringFrases;
    this.typingAudio.play().catch((err) => {
      console.log(err);
      this.initAudio();
    }).then(() => {
      console.log("Se dio al play con éxito");
    })
    let interval = setInterval(() => {
      if (this.typingAudio.ended) {
        console.log("Se termina el audio antes de que se termine de tipear")
        this.typingAudio.play();
        clearInterval(interval);
      }
    }, 100);
    const instance = new TypeIt('#frases', {
      lifeLike: true,
      strings: this.fraseNueva,
      afterComplete: () => {
        if (this.stopAnimation) {
          return;
        }
        clearInterval(interval);
        this.typingAudio.pause();
        console.log("Se termina de tipear");
        this.fraseTypeada = this.fraseNueva;
        this.timeOutFrase = setTimeout(() => {
          this.generarFrase();
        }, 3000)
      },
    }).go();
  }

  frenarAnimacion() {
    clearTimeout(this.timeOutFrase);
    this.stopAnimation = true;
    this.typingAudio.pause();
  }

  initAudio() {
    this.typingAudio = new Audio();
    this.typingAudio.src = "../../../assets/audio/typewriter-1.mp3";
    this.typingAudio.volume = 0.6;
    this.typingAudio.load();
  }




  applyCount(count:number){
    let splitNumber:Array<any> = this.splitNumWithLeftPad(count);
    this.insertNumbersInDiv(splitNumber)

  }

  insertNumbersInDiv(splitNumber:Array<any>){
    this.cuatro = splitNumber[0];
    this.tres = splitNumber[1];
    this.dos = splitNumber[2];
    this.uno = splitNumber[3];

  }

  splitNumWithLeftPad(number:number) {
    let lengthNumero = number.toString().length;
    let lastCountSplit = number.toString().split("");
    if (lengthNumero < 4) {
      let dif = 4 - lengthNumero;
      for (let i = 0; i < dif; i++) {
        lastCountSplit.unshift("0");
      }
    }
    return lastCountSplit;
  }



  timeoutContadorDePalabras() {
    setInterval(() => {
      this.searchNewCountAndApply();
    }, 3000);
  }

  searchNewCountAndApply() {
    this.procesadorApi.cantidadDePalabras().subscribe((respuesta: any) => {
      let count = respuesta.data;
      this.applyCount(count);
    })
  }


  ngOnInit() {
    initPlugin();
    this.initAudio();
    setTimeout(() => {
      this.generarFrase()
    }, 6000);
    this.searchNewCountAndApply();
    this.timeoutContadorDePalabras();

  }

}
