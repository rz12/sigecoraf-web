import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { EmpleadoService } from '../../../nominas/services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { EmpresaService } from "../../../master/services/empresa.service";
import { enums } from '../../../credentials';
import { Empresa } from '../../../master/models/empresa';
import { Form } from '@angular/forms';
import { ItemService } from '../../../master/services/item.service';

@Component({
  selector: 'app-select-empresa',
  templateUrl: './select-empresa.component.html',
  styleUrls: ['./select-empresa.component.css']
})
export class SelectEmpresaComponent implements OnInit {
  public empresaList: Empresa[];
  public message: String;
  @Input() valor: Empresa;
  @Output() notificador = new EventEmitter();
  selectedValue: any;
  @Input() control: Form;
  constructor(private empresaService: EmpresaService, private changeDetector: ChangeDetectorRef, private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.empresaList = [];
    let token = this.seguridadService.getToken();
    this.empresaService.empresaList(token.token).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.empresaList = data.json().data;
        this.selectItem(this.valor.id)
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
  selectItem(newValue) {
    if (newValue) {
      this.selectedValue = newValue;
      this.changeDetector.detectChanges();
      this.empresaService.getEmpresa(newValue).subscribe(res => {
        this.notificador.emit(res.json().data);
      })
    }
  }
}
