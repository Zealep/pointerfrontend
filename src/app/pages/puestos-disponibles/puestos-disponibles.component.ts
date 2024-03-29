import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BandejaRequisicion } from 'src/app/models/dto/bandeja-requisicion';
import { BandejaRequisicionRequestIn } from 'src/app/models/dto/bandeja-requisicion-in';
import { RequisicionPersonalService } from 'src/app/services/requisicion-personal.service';
import { PreguntasAdicionalComponent } from './preguntas-adicional/preguntas-adicional.component';
import { RequisicionPersonalPreguntaService } from 'src/app/services/requisicion-personal-pregunta.service';
import { RequisicionPersonalPostulante } from 'src/app/models/requisicion-personal-postulante';
import { RequisicionPersonal } from 'src/app/models/requisicion-personal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-puestos-disponibles',
  templateUrl: './puestos-disponibles.component.html',
  styleUrls: ['./puestos-disponibles.component.css']
})
export class PuestosDisponiblesComponent implements OnInit {

  displayedColumns: string[] = ['puesto', 'lugarTrabajo', 'modalidad', 'areaSolicitante', 'acciones'];
  dataSource!: MatTableDataSource<BandejaRequisicion>;
  requisiciones: BandejaRequisicion[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private requisicionPersonalService: RequisicionPersonalService,
    private requisicionPersonalPreguntaService: RequisicionPersonalPreguntaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getRequisiciones();
  }

  getRequisiciones() {
    let req = new BandejaRequisicionRequestIn()
    this.requisicionPersonalService.bandeja(req)
      .subscribe(x => {
        this.requisiciones = x;
        this.dataSource = new MatTableDataSource(this.requisiciones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  inscribirse(bandeja: BandejaRequisicion) {

    this.requisicionPersonalPreguntaService.getBydIdRequisicion(bandeja.idRequisicionPersonal)
      .subscribe(x => {

        if (x.length > 0) {
          this.openDialog(bandeja)
        }
        else {
          let reqPos = new RequisicionPersonalPostulante()
          let req = new RequisicionPersonal()
          req.idRequisicionPersonal = bandeja.idRequisicionPersonal
          reqPos.requisicionPersonal = req
          reqPos.idPostulante = sessionStorage.getItem('usuario')
          this.requisicionPersonalService.savePostulante(reqPos)
            .subscribe(x => {
              this.snackBar.open('Se inscribio correctamente a la postulación', 'X', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 3000
              });

            })
        }
      })

  }

  openDialog(bandeja: BandejaRequisicion) {
    const dialogRef = this.dialog.open(PreguntasAdicionalComponent, {
      maxWidth: '800px',
      data: bandeja
    });
    dialogRef.afterClosed()
      .subscribe(result => {

      });
  }

}
