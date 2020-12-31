import { ProcesoDocumento } from './../../../models/proceso-documento';
import { ProcesoDocumentoService } from './../../../services/proceso-documento.service';
import { DatoArchivo } from './../../../models/dato-archivo';
import { UploadFileService } from './../../../services/upload-file.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadDocument } from 'src/app/models/dto/upload-document';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  @Input() id: string;
  @Input() idProceso: string;
  tiposDocumento: ProcesoDocumento[];
  filesUpload: Array<File> = [];
  cargarArchivos: UploadDocument[] = [];
  message = '';
  idTipoDocumento:string = '';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService,
    private procesoDocumentoService: ProcesoDocumentoService) { }

  ngOnInit(): void {
    this.getProcesosDocumentos();
  }

  getProcesosDocumentos(){
    console.log('idProceso',this.idProceso)
    this.procesoDocumentoService.getByProceso(this.idProceso)
    .subscribe(result =>{
      console.log('result',result);
      this.tiposDocumento = result;
    })
  }

  selectFiles(event) {
    const files = event.target.files;
    for(let i=0;i<files.length;i++){
      let up = new UploadDocument();
      up.archivo = files[i];
      up.tipoDocumento = this.idTipoDocumento;
      this.cargarArchivos.push(up);
    }
    
  }

  uploadFiles(archivo:DatoArchivo) {
    console.log('archivo ',archivo.idCodigoRelacional)
    this.message = '';
    for (let i = 0; i < this.filesUpload.length; i++) {
      this.upload(i, this.filesUpload[i],archivo);
    }
  }

  upload(idx, file,archivo) {
    const formData: FormData = new FormData();
    formData.append('file',file)
    formData.append('archivo',JSON.stringify(archivo));

    this.uploadService.upload(formData).subscribe(
      event => {
      },
      err => {
        this.message = 'No se pudo subir el archivo:' + file.name;
      });
  }

}
