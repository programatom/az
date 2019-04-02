
export interface ObjArticulo{
  articulo:string
  genero:string
  numero:string
  tipo:string
}

export interface ObjConjunciones{
  conjuncion:string
  tipo:string
}

export interface ObjPronombres{
  pronombre:string
  tipo:string
  numero:string
  genero:string
  persona:string
}

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

export interface ObjPalabra{
  palabra?:string,
  posicion?:number,
  genero?:string,
  numero?:string,
  caracter?:string,
  persona?:string
}


export interface ObjFrase{
  conectores?:Array<{
    conector:string
    posicion:number
    restricciones?:{
      numero?:string
      genero?:string
      tipo?:string
      persona?:string
    },
  }>
  palabras:Array<ObjPalabra>

}
