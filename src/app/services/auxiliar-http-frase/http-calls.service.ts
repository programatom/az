import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from "../../config/config";

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {


    headerGet = {
      'Accept': 'application/json',
    };

    requestOptionsGet = {
      headers: new HttpHeaders(this.headerGet),
    };

    headerDictPost:any;
    requestOptionsPost:any

    token: string = "";
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("token")

    this.headerDictPost = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : "Bearer " + this.token
    }

    this.requestOptionsPost = {
      headers: new HttpHeaders(this.headerDictPost),
    };
    
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


  buscarFraseRandom(){

    let url = URL_SERVICIOS + "api/frase";

    return this.http.get(url, this.requestOptionsGet);
  }



  buscarPalabrasConRestricciones(palabrasArray) {
    let data = {
      "palabras" : palabrasArray
    }
    let url = URL_SERVICIOS + "api/palabraRandFilter";

    return this.http.post(url, data, this.requestOptionsPost);
  }

}
