import { RequisicionPersonalPregunta } from "./requisicion-personal-pregunta";

export class PostulanteRespuesta {
  idPostulanteRespuesta!: number
  requisicionPersonalPregunta!: RequisicionPersonalPregunta
  idPostulante!: string
  respuesta!: string
}
