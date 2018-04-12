import { Empresa } from "./../models/empresa";
import { DetalleParametrizacion } from "./../models/detalle-parametrizacion"
export class Parametrizacion {
    public id: Number;
    public codigo: String
    public nombre: String
    public descripcion: String
    public empresa: Empresa
    public estado: Boolean
    public detalles: DetalleParametrizacion[]
}
