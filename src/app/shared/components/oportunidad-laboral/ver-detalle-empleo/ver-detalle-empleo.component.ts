import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequisicionPersonalService } from '../../../../services/requisicion-personal.service';
import { RequisicionPersonal } from '../../../../models/requisicion-personal';
import { BandejaRequisicion } from '../../../../models/dto/bandeja-requisicion';
import { PROCESO_REQUISICION } from 'src/app/shared/var.constant';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { DatoArchivo } from 'src/app/models/dato-archivo';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ver-detalle-empleo',
  templateUrl: './ver-detalle-empleo.component.html',
  styleUrls: ['./ver-detalle-empleo.component.css']
})
export class VerDetalleEmpleoComponent implements OnInit {

  idRequisicion!: string
  requisicionPersonal!: RequisicionPersonal
  bandeja!: BandejaRequisicion
  file?: File | null;
  archivo!: DatoArchivo;


  constructor(public dialogRef: MatDialogRef<VerDetalleEmpleoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BandejaRequisicion,
    private requisicionPersonalService: RequisicionPersonalService,
    private uploadService: UploadFileService) { }

  ngOnInit() {
    this.idRequisicion = this.data.idRequisicionPersonal!;
    this.bandeja = this.data
    this.getRequisicionById()
  }

  getRequisicionById() {
    this.requisicionPersonalService.getBydId(this.idRequisicion)
      .subscribe(x => {
        console.log('requi', x)
        this.requisicionPersonal = x;
      })
  }

  descargarPdf(r: RequisicionPersonal) {
    console.log('descargar')

    this.uploadService.getFiles(this.idRequisicion!, PROCESO_REQUISICION)
      .pipe(
        map(archs => archs[0]),
        mergeMap((arch) => {
          const path = arch.pathArchivo
          return this.uploadService.downloadByProceso(path, PROCESO_REQUISICION)
        }
        )
      )
      .subscribe(x => {

        var file = new Blob([x], { type: "application/pdf" });
        const url = URL.createObjectURL(file);

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
        iframe.contentWindow!.print();
      })

  }

}
