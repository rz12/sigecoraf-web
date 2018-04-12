import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Item } from "../../../master/models/item";

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnInit {

  public empresaList: Item[];
  public message: String;
  @Input() valor: String;
  @Output() notificador = new EventEmitter();
  selectedValue: number;
  constructor(private empresaService: EmpresaService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.empresaList = [];
    let token = this.seguridadService.getToken();
    this.empresaService.empresaList(token.token).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.empresaList = data.json().data;
        this.selectItem(this.valor ? Number(this.valor) : null)
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
  selectItem(newValue) {
    this.selectedValue = newValue;
    th

  }
