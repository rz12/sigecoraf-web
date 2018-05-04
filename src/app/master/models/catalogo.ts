import { Empresa } from "./empresa";
import { Item } from "./item";

export class Catalogo {
    codigo: String;
    nombre: String;
    descripcion: String;
    estado: Boolean;
    empresa: Empresa;
    items: Item[];
}
