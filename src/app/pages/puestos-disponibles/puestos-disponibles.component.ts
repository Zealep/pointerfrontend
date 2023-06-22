import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BandejaRequisicion } from 'src/app/models/dto/bandeja-requisicion';
import { BandejaRequisicionRequestIn } from 'src/app/models/dto/bandeja-requisicion-in';
import { RequisicionPersonalService } from 'src/app/services/requisicion-personal.service';

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
    private router: Router) { }

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
    this.router.navigate(['/login']);
  }
}
