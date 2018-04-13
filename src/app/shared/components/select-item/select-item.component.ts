import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CatalogoService } from "../../../master/services/catalogo.service";
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { enums } from '../../../credentials';
import { Item } from '../../../master/models/item';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent implements OnInit {

  public itemList: Item[];
  public message: String;
  @Input() valor: String;
  @Input() codigo: String;
  @Input() placeHolder: String;
  @Output() notificador = new EventEmitter();
  selectedValue: number;
  public valueControl = new FormControl('', [Validators.required]);
  constructor(private catalogoService: CatalogoService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.itemList = [];
    let token = this.seguridadService.getToken();

    this.catalogoService.catalogosListByCodigo(token.token, { "CODIGO": this.codigo }).subscribe(data => {

      if (data.json().status == enums.HTTP_200_OK) {
        data.json().data.forEach(catalogo => {
          this.itemList = (catalogo.items)
        });

        this.selectItem(this.valor ? Number(this.valor) : null)
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
  selectItem(newValue) {
    this.selectedValue = newValue;
    this.notificador.emit(newValue);
  }
}
