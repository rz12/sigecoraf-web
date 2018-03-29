import { Empresa } from "./../models/empresa";
import { DetalleParametrizacion } from "./../models/detalle-parametrizacion"
export class Parametrizacion {
    private id: Number;
    private codigo: String
    private nombre: String
    private descripcion: String
    private empresa: Empresa
    private estado: Boolean
    private detalles: DetalleParametrizacion[]
}
