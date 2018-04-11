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
    ws_master_empresas: credentials.host + '/api/v1/master/empresas',
    /**
     * API REST NOMINAS
     */
    ws_nominas_cargos: credentials.host + '/api/v1/nominas/cargos',
    ws_nominas_contratos: credentials.host + '/api/v1/nominas/contratos',
    ws_nominas_rolPagos: credentials.host + '/api/v1/nominas/roles-pago',
}
export var enums = {
    SISTEMA_AUTHKEY: "AUTH_KEY",
    SISTEMA_MENUS: "SISTEMA_MENUS",

    SISTEMA_PARAM: "SISTEMA_PARAM",
    SISTEMA_DETALLE_PARAM_TIMEOUT: "SISTEMA_TIMEOUT",
    SISTEMA_DETALLE_PARAM_TIMEOUT_INTERVAL: "SISTEMA_TIMEOUT_INTERVAL",
    /**
     * HTTP STATUS
     */
    HTTP_200_OK: 200,
    HTTP_201_CREATED: 201,
    HTTP_400_BAD_REQUEST: 400,
    HTTP_401_UNAUTHORIZED: 401,
    HTTP_500_INTERNAL_SERVER_ERROR: 500,

}