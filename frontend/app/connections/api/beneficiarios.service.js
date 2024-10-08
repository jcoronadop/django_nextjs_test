import BaseServiceFront from '../base-service';

export default class BeneficiariosService extends BaseServiceFront {
    constructor() {
        super('/api/beneficiarios');
    }
}