import { ObjFrase } from '../interfaces/interfaces';


export const FRASES: Array<ObjFrase> = [

  // ARTICULO SUSTANTIVO

  {
    "conectores": [{
      "conector": "articulo",
      "posicion": 1,
      "restricciones":
      {
        "numero": "plural",
        "genero": "femenino"
      }

    },
    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "plural",
      "genero": "femenino",
      "posicion": 2
    }]
  },
  {
    "conectores": [{
      "conector": "articulo",
      "posicion": 1,
      "restricciones":
      {
        "numero": "singular",
        "genero": "femenino"
      }

    },
    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "singular",
      "genero": "femenino",
      "posicion": 2
    }]
  },
  {
    "conectores": [{
      "conector": "articulo",
      "posicion": 1,
      "restricciones":
      {
        "numero": "plural",
        "genero": "masculino"
      }

    },
    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "plural",
      "genero": "masculino",
      "posicion": 2
    }]
  },

  // PRONOMBRE SUSTANTIVO

  {
    "conectores": [{
      "conector": "pronombre",
      "posicion": 1,
      "restricciones":
      {
        "numero": "plural",
        "genero": "masculino"
      }

    },
    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "plural",
      "genero": "masculino",
      "posicion": 2
    }]
  },
  {
    "conectores": [{
      "conector": "pronombre",
      "posicion": 1,
      "restricciones":
      {
        "numero": "singular",
        "genero": "femenino"
      }

    },
    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "singular",
      "genero": "femenino",
      "posicion": 2
    }]
  },
  {
    "conectores": [{
      "conector": "pronombre",
      "posicion": 1,
      "restricciones":
      {
        "numero": "singular",
        "genero": "femenino"
      }

    },
    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "singular",
      "genero": "femenino",
      "posicion": 2
    }]
  },

  // ARTICULO SUSTANTIVO CONJUNCION PRONOMBRE SUSTANTIVO

  {
    "conectores": [{
      "conector": "articulo",
      "posicion": 1,
      "restricciones":
      {
        "numero": "singular",
        "genero": "masculino"
      }

    },
    {
      "conector": "conjuncion",
      "posicion": 3,
      "restricciones":
      {
        "numero": "singular",
        "genero": "femenino"
      }

    },
    {
      "conector": "pronombre",
      "posicion": 4,
      "restricciones":
      {
        "numero": "plural",
        "genero": "femenino"
      }

    },

    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "singular",
      "genero": "masculino",
      "posicion": 2
    },
    {
      "caracter": "sustantivo",
      "numero": "plural",
      "genero": "femenino",
      "posicion": 5
    }]
  },

  // SUSTANTIVO SUSTANTIVO SUSTANTIVO


  {
    "conectores": [{
      "conector": "conjuncion",
      "posicion": 4,

    },
    ],
    "palabras": [{
      "caracter": "sustantivo",
      "numero": "singular",
      "genero": "femenino",
      "posicion": 1
    },
    {
      "caracter": "sustantivo",
      "numero": "singular",
      "genero": "femenino",
      "posicion": 2
    },
    {
      "caracter": "sustantivo",
      "numero": "plural",
      "genero": "masculino",
      "posicion": 3
    },
    {
      "caracter": "sustantivo",
      "numero": "singular",
      "genero": "femenino",
      "posicion": 5
    }]
  }
];
