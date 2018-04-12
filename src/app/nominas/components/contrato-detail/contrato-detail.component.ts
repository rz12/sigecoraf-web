import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Contrato } from '../../models/contrato';
import { ContratoService } from '../../services/contrato.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../shared/dialog/services/dialog.service';

@Component({
  selector: 'app-contrato-detail',
  templateUrl: './contrato-detail.component.html',
  styleUrls: ['./contrato-detail.component.css']
})
export class ContratoDetailComponent implements OnInit {
  @Input()
  Contrato: Contrato;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ContratoService: ContratoService,
    private seguridadService: SeguridadService, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
    this.Contrato = new Contrato();
  }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    let token = this.seguridadService.getToken()
    this.getContrato(token, id)
  }
  public onChangeComponente(value) {
    this.Contrato.empleado = value;
  }
  public save() {
    let token = this.seguridadService.getToken()
    let response = this.ContratoService.save(token, this.Contrato);
    response.subscribe(res => {
      this.dialogService.notificacion('', res.message, this.viewContainerRef)
    })

  }
  public cancel() {
    let link = ['/' + 'contrato'];
    this.router.navigate(link);
  }
  public getContrato(token, id) {
    this.ContratoService.getContrato(token, id).subscribe(res => {
      this.Contrato = res.json().data;
    });
  }
}