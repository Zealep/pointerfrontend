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
  cargarArchivos: UploadDocument[] = [];
  message = '';
  idTipoDocumento:string = '';

  fileInfos: DatoArchivo[];

  constructor(private uploadService: UploadFileService,
    private procesoDocumentoService: ProcesoDocumentoService) { }

  ngOnInit(): void {
    this.getProcesosDocumentos();
    this.getFiles();
  }

  getProcesosDocumentos(){
    console.log('idProceso',this.idProceso)
    this.procesoDocumentoService.getByProceso(this.idProceso)
    .subscribe(result =>{
      console.log('result',result);
      this.tiposDocumento = result;
    })
  }

  descargar(url:string,name:string){
    this.uploadService.download(url)
    .subscribe(x=>{
      const url = window.URL.createObjectURL(x);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = name;
      a.click();
      return url;
    })
  }

  getFiles(){
    if(this.id!=null){
      this.uploadService.getFiles(this.id,this.idProceso).subscribe
      (x=>{
        this.fileInfos=x;
      })
    }

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
  eliminar(index){
      this.cargarArchivos.splice(index,1);
  }

  eliminarFisico(path:string,id:string){
    this.uploadService.deleteFile(path,id).subscribe
    (X=>{
      this.getFiles();
      console.log('archivo borrado');
    })
  }

  uploadFiles(archivo:DatoArchivo) {
    console.log('archivo ',archivo.idCodigoRelacional)

    this.message = '';
    for (let i = 0; i < this.cargarArchivos.length; i++) {
      let file = this.cargarArchivos[i];
      archivo.idDocumento = file.tipoDocumento
      this.upload(file.archivo ,archivo);
    }

  }

  upload(file,archivo) {
    const formData: FormData = new FormData();
    formData.append('file',file)
    formData.append('archivo',JSON.stringify(archivo));

    this.uploadService.upload(formData);

  }

}
