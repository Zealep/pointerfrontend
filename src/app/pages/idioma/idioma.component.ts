import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IdiomaService } from './../../services/idioma.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Idioma } from './../../models/idioma';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit {

  idiomas: Idioma[] = [];
  displayedColumns:string[] = ['idioma','oral','lectura','escritura','acciones'];
  dataSource: MatTableDataSource<Idioma>;
  idUserWeb: string;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private idiomaService: IdiomaService,
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

     delete(exp: Idioma) {
       const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         maxWidth: '600px',
         data: <ConfirmDialogModel>{
           title: 'Eliminar idioma',
           message: 'Deseas borrar el idioma?'
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
       this.idiomaService.getIdiomasByPostulante(this.idUserWeb).subscribe(data => {
         let idiomas = JSON.parse(JSON.stringify(data));
         this.dataSource = new MatTableDataSource(idiomas);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       });
     }

     private sendDeleteRequest(exp: Idioma) {
       this.idiomaService.delete(exp.idDatoIdioma)
       .subscribe(response => {
         this.load();
         this.snackBar.open('Idioma eliminado', 'Close', {
           duration: 300
         });
       });
     }

     callEdit(id: number){
      this.router.navigate(['/pages/idiomas/form',{exp:id}]);
    }
  }
