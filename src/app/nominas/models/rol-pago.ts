import { ConsolidadoRolPago } from "./consolidado-rol-pago";
import { Contrato } from "./contrato";

export class RolPago {
    public id: Number;
    public fecha: Date;
    public total: Number;
    public consolidado_rolpago: ConsolidadoRolPago;
    public contrato: number;
    public contratoObject: Contrato;
}
