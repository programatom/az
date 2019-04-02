import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from "../../config/config";

export interface ObjRespuestaApi {

  palabraEnviada: string
  caracterGramatical: string
  numeroSignifDesconocido: string
  genero: string
  lemma: string
  modo: string
  numero: string
  persona: string
  posicion: string
  tiempo: string
  token: string
  tipo: string

}
@Injectable({
  providedIn: 'root'
})


export class ProcesadorApiService {

  headerGet = {
    'Accept': 'application/json',
  };

  requestOptionsGet = {
    headers: new HttpHeaders(this.headerGet),
  };


  headerDictPost = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  requestOptionsPost = {
    headers: new HttpHeaders(this.headerDictPost),
  };

  token:string = "";

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("token")
  }

  buscarFrases(){

    let headerDictPost = {
      'Accept': 'application/json',
      'Authorization':'Bearer ' + this.token
    }

    let requestOptionsPost = {
      headers: new HttpHeaders(headerDictPost),
    };
    let url = URL_SERVICIOS + "api/fraseEstructura";

    return this.http.get(url, requestOptionsPost);
  }

  cantidadDePalabras(){
    let headerDictPost = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    let requestOptionsPost = {
      headers: new HttpHeaders(headerDictPost),
    };
    let url = URL_SERVICIOS + "api/count";
    return this.http.get(url, requestOptionsPost);
  }

  login(data){
    let headerDictPost = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    let requestOptionsPost = {
      headers: new HttpHeaders(headerDictPost),
    };
    let url = URL_SERVICIOS + "api/login";
    return this.http.post(url, data, requestOptionsPost);
  }


  // INGRESO DE DATA EN LA DB


  apiCallPalabra(palabra: string, ): Observable<any> {

    let url = URL_SERVICIOS + "api/palabra";

    let data = {
      "palabra":palabra
    };

    return this.http.post(url, data, this.requestOptionsPost);
  }

  guardarFraseEstructura(data){

    let headerDictPost = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer ' + this.token
    }

    let requestOptionsPost = {
      headers: new HttpHeaders(headerDictPost),
    };
    let url = URL_SERVICIOS + "api/fraseEstructuraStore";

    return this.http.post(url, data, requestOptionsPost);
  }
  eliminarFrase(data){

    let headerDictPost = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer ' + this.token
    }

    let requestOptionsPost = {
      headers: new HttpHeaders(headerDictPost),
    };
    let url = URL_SERVICIOS + "api/eliminarFrase";
    return this.http.post(url, data, requestOptionsPost);
  }



}
