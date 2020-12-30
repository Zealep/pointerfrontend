import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EstudioFormal } from 'src/app/models/estudio-formal';
import { EstudioFormalService } from 'src/app/services/estudio-formal.service';

@Component({
  selector: 'app-estudio-formal',
  templateUrl: './estudio-formal.component.html',
  styleUrls: ['./estudio-formal.component.css']
})
export class EstudioFormalComponent implements OnInit {

  estudios: EstudioFormal[] = [];
  displayedColumns:string[] = ['modalidad','titulo','institucion','fechaInicio','fechaFin','acciones'];
  dataSource: MatTableDataSource<EstudioFormal>;
  idUserWeb: string;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estudioService: EstudioFormalService,
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

     delete(exp: EstudioFormal) {
       const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         maxWidth: '600px',
         data: <ConfirmDialogModel>{
           title: 'Eliminar estudio formal',
           message: 'Deseas borrar el estudio formal?'
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
       this.estudioService.getEstudiosFormalByPostulante(this.idUserWeb).subscribe(data => {
         let experiencias = JSON.parse(JSON.stringify(data));
         this.dataSource = new MatTableDataSource(experiencias);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       });
     }

     private sendDeleteRequest(exp: EstudioFormal) {
       this.estudioService.delete(exp.idEstudioFormal)
       .subscribe(response => {
         this.load();
         this.snackBar.open('Estudio formal eliminado', 'Close', {
           duration: 300
         });
       });
     }

     callEdit(id: number){
      this.router.navigate(['/pages/edu-formal/form',{exp:id}]);
    }
  }
