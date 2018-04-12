import { Empresa } from "../../master/models/empresa";
export class Menu {
    public codigo: String
    public nombre: String
    public descripcion: String
    public formulario: String
    public icono: String;
    public orden: String;
    public estado: Boolean
    public empresa: Empresa
    public activate: Boolean
    public submenus: Menu[]
    constructor() {
        this.activate = false;
        this.submenus = [];
    }
}

