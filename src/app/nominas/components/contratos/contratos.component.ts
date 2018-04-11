import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato';
import { MatTableDataSource } from '@angular/material';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  public contratoList: Contrato[]
  displayedColumns = [ 'empleado', 'sueldo']
  dataSource = new MatTableDataSource();
  public urlEdit = "contrato-detail/0"
  public urlAdd = "contrato-detail/0"
  public message: String;
  constructor(private contratoService: ContratoService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    let token = this.seguridadService.getToken();
    this.contratoService.contratosList(token.token).subscribe(data => {    
      if (data.json().status == enums.HTTP_200_OK) {
      this.dataSource.data = this.contratoList = data.json().data
    } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
      this.message = data.json().message;
    }
  
  });
}

}
