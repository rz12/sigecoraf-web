import { Empresa } from "../../master/models/empresa";
export class Usuario {
    password: String;
    is_superuser: Boolean;
    username: String;
    first_name: String;
    last_name: String;
    email: String;
    is_active: String;
    empresa: Empresa;
}
