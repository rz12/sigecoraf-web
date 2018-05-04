import { Empresa } from "../../master/models/empresa";

export class EstructuraDetalleRolPago {
    public nombre: String;
    public descripcion: String;
    public estado: Boolean;
    public empresa: Empresa;
    public operacion: Number;
}
