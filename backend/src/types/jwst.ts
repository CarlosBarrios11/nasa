
//Modela la respuesta de la API del James Webb Space Telescope, aquí se definen los campos que me interesan de la respuesta de la api

export interface JwstImage {
    id : string;
    location : string;
    description?: string;
}

export interface JwstResponse {
    statusCode : number;
    body : JwstImage[]; //Este campo tiene que cumplir con la interfaz de arriba (es donde se va a encontrar la imagen)
}