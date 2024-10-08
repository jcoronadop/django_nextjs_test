import BaseServiceFront from '../base-service';

export default class ChalecosService extends BaseServiceFront {
    constructor() {
        super('/api/chalecos');
    }
}