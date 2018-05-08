import { ConsolidadoRolPago } from "./consolidado-rol-pago";
import { Contrato } from "./contrato";
import { DetalleRolPago } from "./detalle-rol-pago";

export class RolPago {
    public id: Number;
    public fecha: Date;
    public total: Number;
    public consolidado_rolpago: ConsolidadoRolPago;
    public contrato: number;
    public contratoObject: Contrato;
    detalles: DetalleRolPago[]
}
