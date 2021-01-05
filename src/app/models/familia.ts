import { TipoDocumento } from './tipoDocumento';
export class Familia{
  idFamilia:string;
  idEmpresa:string;
  idPostulante:string;
  tipoDocumentosIdentidad: TipoDocumento;
  numeroDocumento:string;
  apellidoPaterno:string;
  apellidoMaterno:string;
  nombres:string;
  idDatoGenero:string;
  idDatoTipoParentesco:string;
  idDatoGradoInstruccion:string;
  ocupacion:string;
  fechaNacimiento:Date;
  idDatoPaisNacimiento:string;
  idDptoNacimiento:string;
  idProvNacimiento:string;
  idDistNacimiento:string;
}
