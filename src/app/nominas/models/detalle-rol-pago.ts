import { EstructuraDetalleRolPago } from "./estructura-detalle-rol-pago";
import { RolPago } from "./rol-pago";

export class DetalleRolPago {
    private nombre: String;
    private descripcion: String;
    private estructura_detalle_rolpago: EstructuraDetalleRolPago;
    private rol_pago: RolPago;
    private valor: Number;
}
