import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef, } from '@angular/core';
import { CatalogoService } from "../../../master/services/catalogo.service";
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { enums } from '../../../credentials';
import { Item } from '../../../master/models/item';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css'],

})
export class SelectItemComponent implements OnInit {

  public itemList: Item[];
  public message: String;
  @Input() valor: String;
  @Input() codigo: String;
  @Input() placeHolder: String;
  @Output() notificador = new EventEmitter();
  public selectedValue: Number;
  @Input() control: Form;

  constructor(private changeDetector: ChangeDetectorRef, private catalogoService: CatalogoService, private seguridadService: SeguridadService) {
  }
  ngOnInit() {
    this.itemList = [];
    let token = this.seguridadService.getToken();
    this.catalogoService.catalogosListByCodigo(token.token, { "CODIGO": this.codigo }).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        data.json().data.forEach(catalogo => {
          this.itemList = (catalogo.items)
        });
        this.selectItem(this.valor ? this.valor : null)
        this.changeDetector.detectChanges();
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
