import { Injectable } from '@angular/core';
import { ParametrizacionService } from '../../master/services/parametrizacion.service';
import { enums } from '../../credentials';
@Injectable()
export class PaginationService {
  public pageSize;
  public pageSizeOptions = [];
  constructor(private parametrizacionService: ParametrizacionService) { }

  public loadPaginationData() {
    let parametros = this.parametrizacionService.getParametros()
    if (parametros) {
      this.parametrizacionService.getParametros().filter(param => param.codigo == enums.PARAM_SISTEMA_PAGINACION).forEach(res => {
        res.detalles.forEach(detalle => {
          if (detalle.codigo == enums.DETALLE_PAGESIZE) {
            this.pageSize = Number(detalle.valor);
          }
          if (detalle.codigo == enums.DETALLE_PAGESIZE_OPTIONS) {
            detalle.valor.split(",").forEach(element => {
              this.pageSizeOptions.push(Number(element));
            });
          }
        })
      })
    }
  }
}
