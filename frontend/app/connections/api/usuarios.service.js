import BaseServiceFront from '../base-service';

export default class UsuariosService extends BaseServiceFront {
    constructor() {
        super('/api/usuarios');
    }
}