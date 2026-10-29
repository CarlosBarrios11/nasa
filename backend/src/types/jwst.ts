
//Modela la respuesta de la API del James Webb Space Telescope, aquí se definen los campos que me interesan de la respuesta de la api

export interface JwstImage {
  id: string;
  location: string;
}

export interface JwstResponse {
  body: JwstImage[];
}

//Datos como se le va a enviar al frontend, otros nombres de atributos, no los originales, la intención es normalizar los datos enviados al frontend

export interface JwstImageNormalizada {
  id: string;
  url: string; //diferente nombre de atributo location a url
}

export interface JwstResponseNormalizada {
    body : JwstImageNormalizada[];
    hayMas : boolean;
}
