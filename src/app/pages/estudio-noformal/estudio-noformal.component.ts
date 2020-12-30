import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstudioNoFormalService } from './../../services/estudio-noformal.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EstudioNoFormal } from './../../models/estudio-noformal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-estudio-noformal',
  templateUrl: './estudio-noformal.component.html',
  styleUrls: ['./estudio-noformal.component.css']
})
export class EstudioNoformalComponent implements OnInit {

  estudios: EstudioNoFormal[] = [];
  displayedColumns:string[] = ['nombre','institucion','fechaInicio','fechaFin','acciones'];
  dataSource: MatTableDataSource<EstudioNoFormal>;
  idUserWeb: string;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estudioService: EstudioNoFormalService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute ,
    private router: Router,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      this.idUserWeb = sessionStorage.getItem('ID-USER');
      this.load();
     }

      applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
       this.dataSource.filter = filterValue.trim().toLowerCase();
     }

     delete(exp: EstudioNoFormal) {
       const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         maxWidth: '600px',
         data: <ConfirmDialogModel>{
           title: 'Eliminar estudio no formal',
           message: 'Deseas borrar el estudio no formal?'
         }
       });

       dialogRef.afterClosed()
         .subscribe(result => {
           if(result) {
             this.sendDeleteRequest(exp);
           }
         });
     }

     private load(){
       this.estudioService.getEstudiosNoFormalByPostulante(this.idUserWeb).subscribe(data => {
         let estudios = JSON.parse(JSON.stringify(data));
         this.dataSource = new MatTableDataSource(estudios);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       });
     }

     private sendDeleteRequest(exp: EstudioNoFormal) {
       this.estudioService.delete(exp.idEstudioNoFormal)
       .subscribe(response => {
         this.load();
         this.snackBar.open('Estudio no formal eliminado', 'Close', {
           duration: 300
         });
       });
     }

     callEdit(id: number){
      this.router.navigate(['/pages/edu-noformal/form',{exp:id}]);
    }
  }
