export var credentials = {
    host: 'http://localhost:8000'
}
export var services = {
    /*
     * URLS relacionadas al modulo de SEGURIDAD
     * Autenticación
     * Usuario
     * Funcionalidad Group
     */
    ws_seguridad_login: credentials.host + "/api/v1/seguridad/api-token-auth/",
    ws_seguridad_user_by_token: credentials.host + "/api/v1/seguridad/usuarios/get_usuario_by_token",
    ws_seguridad_menus: credentials.host + '/api/v1/seguridad/menus',

    /**
     * RUTAS DEL API REST DE LA APP MASTER
     */
    ws_master_parametrizaciones: credentials.host + '/api/v1/master/parametrizaciones',
    /**
     * API REST NOMINAS
     */
    ws_nominas_cargos: credentials.host + '/api/v1/nominas/cargos',
}
export var enums = {
    SISTEMA_AUTHKEY: "AUTH_KEY",

    SISTEMA_PARAM: "SISTEMA_PARAM",
    SISTEMA_DETALLE_PARAM_TIMEOUT: "SISTEMA_TIMEOUT",
    SISTEMA_DETALLE_PARAM_TIMEOUT_INTERVAL: "SISTEMA_TIMEOUT_INTERVAL",

}