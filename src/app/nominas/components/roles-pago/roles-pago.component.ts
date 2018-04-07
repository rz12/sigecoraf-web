import { Component, OnInit } from '@angular/core';
import { RolPagoService } from '../../services/rol-pago.service';

@Component({
  selector: 'app-roles-pago',
  templateUrl: './roles-pago.component.html',
  styleUrls: ['./roles-pago.component.css']
})
export class RolesPagoComponent implements OnInit {
  public mensaje = 'bienvenido a roles de pago'

  constructor(private contratoService: RolPagoService) { }

  ngOnInit() {
  }

}
