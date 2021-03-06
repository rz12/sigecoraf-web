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
    ws_seguridad_menus_haspermission: credentials.host + '/api/v1/seguridad/menus/has_permission',

    /**
     * RUTAS DEL API REST DE LA APP MASTER
     */
    ws_master_parametrizaciones: credentials.host + '/api/v1/master/parametrizaciones',
    ws_master_catalogos: credentials.host + '/api/v1/master/catalogos',
    ws_master_catalogos_list_by_codigo: credentials.host + '/api/v1/master/catalogos/list_by_codigo',
    ws_master_empresas: credentials.host + '/api/v1/master/empresas',
    ws_master_direcciones: credentials.host + '/api/v1/master/direcciones',
    ws_master_items: credentials.host + '/api/v1/master/items',
    /**
     * API REST NOMINAS
     */
    ws_nominas_cargos: credentials.host + '/api/v1/nominas/cargos',
    ws_nominas_contratos: credentials.host + '/api/v1/nominas/contratos',
    ws_nominas_contrato_empleado: credentials.host + '/api/v1/nominas/contrato-empleado',
    ws_nominas_rolPagos: credentials.host + '/api/v1/nominas/rol-pago',
    ws_nominas_rolpago_list_by_consolidado: credentials.host + '/api/v1/nominas/rol-pago/list_by_consolidado',
    ws_nominas_empleados: credentials.host + '/api/v1/nominas/empleados',
    ws_nominas_consolidado_rol_pago: credentials.host + '/api/v1/nominas/consolidado-rolpago',
    ws_nominas_detalle_rol_pago: credentials.host + '/api/v1/nominas/detalle-rolpago',
    ws_nominas_detalle_rol_pago_list_by_rolpago: credentials.host + '/api/v1/nominas/detalle-rolpago/list_by_rolpago',
    ws_nominas_detalle_rol_pago_get_valor_by_rule: credentials.host + '/api/v1/nominas/detalle-rolpago/get_valor_by_rule',
    ws_reportes_nominas_rol_pago: credentials.host + '/reportes/v1/nominas_report/rol-pago',
}
export var enums = {
    /**
     * Parametros
     */
    PARAM_SISTEMA: 'SISTEMA',
    PARAM_SISTEMA_PAGINACION: 'SISTEMA_PAGINACION',

    /**
     * COMUN
     */
    SISTEMA_AUTHKEY: "AUTH_KEY",
    SISTEMA_MENUS: "SISTEMA_MENUS",
    SISTEMA_PARAM: "SISTEMA_PARAM",
    SESSION_USUARIO: "SESSION_USUARIO",
    /**
     * Detalles de Parametrizacion
     */
    SISTEMA_DETALLE_PARAM_TIMEOUT: "SISTEMA_TIMEOUT",
    SISTEMA_DETALLE_PARAM_TIMEOUT_INTERVAL: "SISTEMA_TIMEOUT_INTERVAL",
    DETALLE_PAGESIZE: "PAGE_SIZE",
    DETALLE_PAGESIZE_OPTIONS: "PAGE_SIZE_OPTIONS",
    /**
     * HTTP STATUS
     */
    HTTP_200_OK: 200,
    HTTP_201_CREATED: 201,
    HTTP_400_BAD_REQUEST: 400,
    HTTP_401_UNAUTHORIZED: 401,
    HTTP_500_INTERNAL_SERVER_ERROR: 500,
    /**
     * CODIGOS DE MENUS
     */
    MENU_CARGOS: "CARGOS",
    MENU_EMPLEADOS: "EMPLEADOS",
    MENU_CONTRATOS: "CONTRATOS",
    MENU_CONSOLIDADOS: "CONSOLIDADO_ROL_PAGO",
    MENU_CARGOS_ADD: "ADD_CARGO",
    MENU_CARGOS_EDIT: "EDIT_CARGO",
    MENU_EMPLEADOS_ADD: "ADD_EMPLEADO",
    MENU_EMPLEADOS_EDIT: "EDIT_EMPLEADO",
    MENU_CONTRATOS_ADD: "ADD_CONTRATOS",
    MENU_CONTRATOS_EDIT: "EDIT_CONTRATOS",

}