import { Persona } from "../../master/models/persona";
import { Empresa } from "../../master/models/empresa";
export class Empleado extends Persona {
    fecha_inicio: Date;
    fecha_fin: Date;
    fecha_ingreso_iess: Date;
    estado: Boolean;
    empresa: Number;
}