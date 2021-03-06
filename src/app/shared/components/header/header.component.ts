import { UsuarioService } from './../../../services/usuario.service';
import { MenuService } from './../../../services/menu.service';
import { Menu } from './../../../models/menu';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus:Menu[] = [];

  constructor(private menuService: MenuService,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(){
    this.menuService.getMenus()
    .subscribe(data =>{
      this.menus = data;
    })
  }
  cerrarSesion(){
    this.usuarioService.cerrarSesion();
  }

}
