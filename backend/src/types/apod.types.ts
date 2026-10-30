//Modela la respuesta de APOD (Astronomy Picture of the Day)
export interface ApodRaw {
    date: string;
    title: string;
    media_type: "image" | "video" | "iframe";
    explanation: string;
    url: string; //post url
    hdurl?: string; //Imagen
    alt?: string;
}
