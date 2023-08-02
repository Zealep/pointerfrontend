import { Pregunta } from "./pregunta"
import { RequisicionPersonal } from "./requisicion-personal"

export class RequisicionPersonalPregunta {
  idRequisicionpersonalPregunta!: number
  pregunta!: Pregunta
  requisicionPersonal!: RequisicionPersonal
}
