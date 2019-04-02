import { Component, OnInit } from '@angular/core';
import { ProcesadorApiService } from 'src/app/services/service.index';

@Component({
  selector: 'app-frases-visualizer',
  templateUrl: './frases-visualizer.component.html',
  styleUrls: ['./frases-visualizer.component.css']
})
export class FrasesVisualizerComponent implements OnInit {

  frases:any;

  constructor(private apiCall: ProcesadorApiService) { }

  ngOnInit() {
    this.apiCall.buscarFrases().subscribe((frases:any)=>{
      this.frases = frases.data;
      console.log(this.frases)
    })
    document.getElementById("loader12345").style.visibility = "hidden";

  }
  eliminarFrase(frase, index){
    console.log(frase.id)
    document.getElementById("loader12345").style.visibility = "visible";
    this.apiCall.eliminarFrase({
      "frase_id": frase.id,
    }).subscribe((data)=>{
      document.getElementById("loader12345").style.visibility = "hidden";
      console.log(data);
      this.frases.splice(index, 1);
    })
  }


}
