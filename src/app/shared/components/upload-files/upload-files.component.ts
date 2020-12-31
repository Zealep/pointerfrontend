import { ProcesoDocumento } from './../../../models/proceso-documento';
import { ProcesoDocumentoService } from './../../../services/proceso-documento.service';
import { DatoArchivo } from './../../../models/dato-archivo';
import { UploadFileService } from './../../../services/upload-file.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  @Input() id: string;
  @Input() idProceso: string;
  tiposDocumento: ProcesoDocumento[];
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService,
    private procesoDocumentoService: ProcesoDocumentoService) { }

  ngOnInit(): void {

  }

  getProcesosDocumentos(){
    this.procesoDocumentoService.getByProceso(this.idProceso)
    .subscribe(result =>{
      this.tiposDocumento = result;
    })
  }

  selectFiles(event) {
    this.progressInfos = [];
    const files = event.target.files;
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);

  }

  uploadFiles(archivo:DatoArchivo) {
    console.log('archivo ',archivo.idCodigoRelacional)
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i],archivo);
    }
  }

  upload(idx, file,archivo) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    const formData: FormData = new FormData();
    formData.append('file',file)
    formData.append('archivo',JSON.stringify(archivo));

    this.uploadService.upload(formData).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'No se pudo subir el archivo:' + file.name;
      });
  }

}
