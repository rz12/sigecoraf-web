import { Cargo } from "./cargo";

export class Contrato {
    private fecha_incio: Date;
    private fecha_fin: Date;
    private estado: String;
    private mensualizar_decimos: Boolean;
    private empleado: String;
    private cargo: Cargo;
}
