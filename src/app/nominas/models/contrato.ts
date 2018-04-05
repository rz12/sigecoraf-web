import { Cargo } from "./cargo";
import { Empleado } from "./empleado";

export class Contrato {
    private fecha_incio: Date;
    private fecha_fin: Date;
    private estado: String;
    private mensualizar_decimos: Boolean;
    private empleado: Empleado;
    private cargo: Cargo;
}
