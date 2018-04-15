import { ConsolidadoRolPago } from "./consolidado-rol-pago";
import { Contrato } from "./contrato";

export class RolPago {
    public fecha_inicio: Date;
    public total: Number;
    public consolidado_rolpago: ConsolidadoRolPago;
    public contrato: Contrato;
}
