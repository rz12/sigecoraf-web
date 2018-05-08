import { EstructuraDetalleRolPago } from "./estructura-detalle-rol-pago";
import { RolPago } from "./rol-pago";

export class DetalleRolPago {
    public nombre: String;
    public descripcion: String;
    public estructura_detalle_rolpago: EstructuraDetalleRolPago;
    public rol_pago: RolPago;
    public valor: Number;
    public cantidad: Number;
}
