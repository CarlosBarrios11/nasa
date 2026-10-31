export interface JwstInstrument {
  instrument: string;
}

export interface JwstDetails {
  mission: string;
  instruments: JwstInstrument[];
  suffix: string;
  description: string;
}

export interface JwstData {
  id: string;
  observation_id: string;
  program: number;
  details: JwstDetails;
  file_type: string;
  thumbnail: string;
  location: string;
  source?: "user"; // marca de "creado por el usuario"
}

export interface JwstObject {
  id?: string;
  name: string;
  data: JwstData;
}