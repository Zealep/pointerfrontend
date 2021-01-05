import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FamiliaService } from './../../services/familia.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Familia } from './../../models/familia';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {

  familiares: Familia[] = [];
  displayedColumns:string[] = ['tipoDocumento','numeroDocumento','nombres','apellidos','vinculo','acciones'];
  dataSource: MatTableDataSource<Familia>;
  idUserWeb: string;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private familiaService: FamiliaService,
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

     delete(exp: Familia) {
       const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         maxWidth: '600px',
         data: <ConfirmDialogModel>{
           title: 'Eliminar familiar',
           message: 'Deseas borrar el familiar?'
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
       this.familiaService.getFamiliasByPostulante(this.idUserWeb).subscribe(data => {
         let familiares = JSON.parse(JSON.stringify(data));
         console.log(familiares);
         this.dataSource = new MatTableDataSource(familiares);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       });
     }

     private sendDeleteRequest(exp: Familia) {
       this.familiaService.delete(exp.idFamilia)
       .subscribe(response => {
         this.load();
         this.snackBar.open('Familiar eliminado', 'Close', {
           duration: 300
         });
       });
     }

     callEdit(id: number){
      this.router.navigate(['/pages/familiares/form',{exp:id}]);
    }
  }
