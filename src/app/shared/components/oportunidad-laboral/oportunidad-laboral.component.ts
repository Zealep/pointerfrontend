import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BandejaRequisicion } from 'src/app/models/dto/bandeja-requisicion';
import { BandejaRequisicionRequestIn } from 'src/app/models/dto/bandeja-requisicion-in';
import { Requisicion } from 'src/app/models/requisicion';
import { RequisicionPersonalService } from 'src/app/services/requisicion-personal.service';
import { element } from 'protractor';
import { MatDialog } from '@angular/material/dialog';
import { VerDetalleEmpleoComponent } from './ver-detalle-empleo/ver-detalle-empleo.component';

@Component({
  selector: 'app-oportunidad-laboral',
  templateUrl: './oportunidad-laboral.component.html',
  styleUrls: ['./oportunidad-laboral.component.scss']
})
export class OportunidadLaboralComponent implements OnInit {

  displayedColumns: string[] = ['puesto', 'acciones'];
  dataSource!: MatTableDataSource<BandejaRequisicion>;
  requisiciones: BandejaRequisicion[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private requisicionPersonalService: RequisicionPersonalService,
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

  ver(e: BandejaRequisicion) {
    const dialogRef = this.dialog.open(VerDetalleEmpleoComponent, {
      maxWidth: '800px',
      data: e
    });

    dialogRef.afterClosed()
      .subscribe(result => {

      });
  }

  postular() {
    this.router.navigate(['/login']);
  }

}
