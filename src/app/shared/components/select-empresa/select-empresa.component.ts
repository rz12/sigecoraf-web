import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmpleadoService } from '../../../nominas/services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { EmpresaService } from "../../../master/services/empresa.service";
import { enums } from '../../../credentials';
import { Empresa } from '../../../master/models/empresa';

@Component({
  selector: 'app-select-empresa',
  templateUrl: './select-empresa.component.html',
  styleUrls: ['./select-empresa.component.css']
})
export class SelectEmpresaComponent implements OnInit {
  public empresaList: Empresa[];
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
    this.notificador.emit(newValue);
  }
}
