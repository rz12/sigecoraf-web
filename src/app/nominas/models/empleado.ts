import { Persona } from "../../master/models/persona";
import { Empresa } from "../../master/models/empresa";
export class Empleado extends Persona {
    public fecha_inicio: Date;
    public fecha_fin: Date;
    public fecha_ingreso_iess: Date;
    public estado: Boolean;
    public empresa: Empresa;
}