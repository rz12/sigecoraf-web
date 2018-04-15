import { Item } from "../../master/models/item";
import { Direccion } from "./direccion";
export class Persona {
    id: Number;
    numero_identificacion: String;
    primer_apellido: String;
    segundo_apellido: String;
    primer_nombre: String;
    segundo_nombre: String;
    numero_celular: String;
    fecha_nacimiento: Date;
    tipo_documento_identificacion: Number;
    genero: Number;
    estado_civil: Number
    direcciones: Direccion[]
}