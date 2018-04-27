import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef, } from '@angular/core';
import { CatalogoService } from "../../../master/services/catalogo.service";
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { enums } from '../../../credentials';
import { Item } from '../../../master/models/item';
import { Form } from '@angular/forms';
import { ItemService } from '../../../master/services/item.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css'],

})
export class SelectItemComponent implements OnInit {

  public itemList: Item[];
  public message: String;
  @Input() valor: Item;
  @Input() codigo: String;
  @Input() placeHolder: String;
  @Output() notificador = new EventEmitter();
  public selectedValue: any;
  @Input() control: Form;

  constructor(private catalogoService: CatalogoService, private itemService: ItemService,
    private changeDetector: ChangeDetectorRef, private seguridadService: SeguridadService) {
  }
  ngOnInit() {
    this.itemList = [];
    let token = this.seguridadService.getToken();
    this.catalogoService.catalogosListByCodigo(token.token, { "CODIGO": this.codigo }).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        data.json().data.forEach(catalogo => {
          this.itemList = (catalogo.items)
        });
        this.selectItem(this.valor ? this.valor.id : null)
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });

  }

  selectItem(newValue) {
    if (newValue) {
      this.selectedValue = newValue;
      this.changeDetector.detectChanges();
      this.itemService.getItem(this.seguridadService.getToken(), newValue).subscribe(res => {
        this.notificador.emit(res.json().data);
      })
    }
  }
}
