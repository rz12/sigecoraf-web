import { Item } from "../../master/models/item";
export class Persona {
    numero_identificacion:String;
    primer_apellido:String;
    segundo_apellido:String;
    primer_nombre:String;
    segundo_nombre:String;
    numero_celular:String;
    fecha_nacimiento:String;
    tipo_documento_identificacion:Item;
    genero:Item;
    estado_civil:Item
}
