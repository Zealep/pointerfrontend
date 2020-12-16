import { TipoDocumento } from "./TipoDocumento";

export class Usuario{
   idUsuarioWeb:string;
   idEmpresa:string;
	 tipoDocumentosIdentidad:TipoDocumento;
	 numeroDocumento:string;
	 apellidoPaterno:string;
	 apellidoMaterno:string;
	 nombres:string;
	 correo:string;
	 contraseña:string;
}
