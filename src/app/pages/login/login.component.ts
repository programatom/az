import { Component, OnInit } from '@angular/core';
import { ProcesadorApiService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string = ""
  contrasena:string = ""

  constructor(private apiCall: ProcesadorApiService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.apiCall.login({
      "email":this.usuario,
      "password":this.contrasena
    }).subscribe((respuesta:any)=>{
      console.log(respuesta)
      if(respuesta["status"] == "success"){
        this.apiCall.token = respuesta.data.api_token;
        localStorage.setItem("token", respuesta.data.api_token );
        this.router.navigateByUrl("/fraseGen");
      }else{
        this.router.navigateByUrl("/forbidden");
      }
    })
  }



}
