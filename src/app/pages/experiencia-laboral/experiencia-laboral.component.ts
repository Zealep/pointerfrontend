import { Component, OnInit, ViewChild } from '@angular/core';
import { ExperienciaLaboral } from 'src/app/models/experiencia-laboral';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExperienciaLaboralService } from 'src/app/services/experiencia-laboral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styles: []
})
export class ExperienciaLaboralComponent implements OnInit {

  experiencias: ExperienciaLaboral[] = [];
  displayedColumns:string[] = ['idExpLaboral', 'empresa', 'fechaIngreso','fechaRetiro','acciones'];
  dataSource: MatTableDataSource<ExperienciaLaboral>;

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private experienciaService: ExperienciaLaboralService,
    private snackBar: MatSnackBar, 
    public route: ActivatedRoute ,
    private dialog: MatDialog) { }
    ngOnInit(): void {
      this.loadExperiencias();
     }
      applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
       this.dataSource.filter = filterValue.trim().toLowerCase();
     }
   
     delete(exp: ExperienciaLaboral) {
       const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         maxWidth: '600px',
         data: <ConfirmDialogModel>{
           title: 'Eliminar experiencia laboral',
           message: 'Deseas borrar la exp. laboral?'
         }
       });
   
       dialogRef.afterClosed()
         .subscribe(result => {
           if(result) {
             this.sendDeleteRequest(exp);
           }
         });
     }
   
     private loadExperiencias(){
       this.experienciaService.getExperiencias().subscribe(data => {
         let experiencias = JSON.parse(JSON.stringify(data));
         this.dataSource = new MatTableDataSource(experiencias);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;    
       });
     }
   
     private sendDeleteRequest(exp: ExperienciaLaboral) {
       this.experienciaService.delete(exp.idExpLaboral)
       .subscribe(response => {
         this.loadExperiencias();
         this.snackBar.open('Experiencia Laboral eliminada', 'Close', {
           duration: 3000
         });
       });
     }
  
}
