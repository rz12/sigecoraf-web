import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../seguridad/services/menu.service';
import { Token } from '@angular/compiler';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-tool-bar-acction',
  templateUrl: './tool-bar-action.component.html',
  styleUrls: ['./tool-bar-action.component.css']
})
export class ToolBarAcctionComponent implements OnInit {

  constructor(private router: Router, private seguridadService: SeguridadService, private menuService: MenuService) { }
  @Input() urlEdit: String;
  @Input() urlAdd: String;
  @Input() codigoAdd: String = "";
  @Input() codigoEdit: String = "";
  @Input() codigoDelete: String = "";
  public hasPermissionAdd: Boolean;
  public hasPermissionEdit: Boolean;
  public hasPermissionDelete: Boolean;
  @Output() notificadorDelete = new EventEmitter();
  ngOnInit() {
    this.hasPermissionOptions()
  }
  public add() {
    let link = ['/' + this.urlAdd];
    this.router.navigate(link);
  }
  public edit() {
    if (this.urlEdit) {
      let link = ['/' + this.urlEdit];
      this.router.navigate(link);
    }
  }
  public delete() {
    this.notificadorDelete.emit(true)
  }
  public hasPermissionOptions() {
    let token = this.seguridadService.getToken();
    this.menuService.hasPermission(token.token, this.codigoAdd).subscribe(res => {
      if (res.json().status == enums.HTTP_200_OK) {
        this.hasPermissionAdd = res.json().data
      }
    })
    this.menuService.hasPermission(token.token, this.codigoEdit).subscribe(res => {
      if (res.json().status == enums.HTTP_200_OK) {
        this.hasPermissionEdit = res.json().data
      }
    })
    this.menuService.hasPermission(token.token, this.codigoDelete).subscribe(res => {
      if (res.json().status == enums.HTTP_200_OK) {
        this.hasPermissionDelete = res.json().data
      }
    })
  }
}
