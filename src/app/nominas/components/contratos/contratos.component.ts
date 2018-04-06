import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  public mensaje = 'mi primer proyecto'

  constructor(private contratoService: ContratoService) { }

  ngOnInit() {
    this.contratoService.contratosList('aa').subscribe(data => console.log(data));
  }

}
