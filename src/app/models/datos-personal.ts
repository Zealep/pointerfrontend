import { AreaInteres } from './area-interes';
import { TipoDocumentoService } from './../services/tipo-documento.service';
import { TipoDocumento } from './TipoDocumento';
export class DatosPersonal{

  idPostulante: string;
  idUsuarioWeb: string;
  idEmpresa: string;
  tipoDocumentosIdentidad: TipoDocumento;
  numeroDocumento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  idDatoGenero: string;
  idDatoEstadoCivil: string;
  fechaNacimiento: Date;
  idDatoPaisNacimiento: string;
  idDptoNacimiento: string;
  idProvNacimiento: string;
  idDistNacimiento: string;
  idDatoPaisResidencia: string;
  idDptoResidencia: string;
  idProvResidencia: string;
  idDisResidencia: string;
  iddatoSunatTipoVia: string;
  nombreVia: string;
  numeroVia: number;
  interior: string;
  iddatoSunatTipoZona: string;
  nombreZona: string;
  referencia: string;
  telefonoFijo: number;
  telefonoMovil: number;
  indAceptoDatosPersonales: string;
  indDispViajarInterior: string;
  indDispViajarExterior: string;
  indDispInmediata: string;
  tiempoDisponibilidad: string;
  idCargo: string;
  expectativaSalarial: number;
  idMedioInformativo: string;
  indTieneDiscapacidad: string;
  numeroConadis: number;

}
