import { url_host } from './config';
import AuthService from '../connections/auth';
let auth_service = new AuthService();

class BadRequestError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestError);
        }
    }
}

export default class BaseServiceFront {
    constructor(URL) {
        this.URL = URL;
        this.HOST = url_host;
    }

    async get(tkn, tknrf) {

        let sToken = await auth_service.validate_token(tkn, tknrf);

        let oHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`,
            'Referrer-Policy': 'no-referrer'
        };

        let params = {
            method: 'GET',
            headers: oHeader,
        };
        let response = await fetch(this.HOST + this.URL, params);
        if (!response.ok) {
            if (response.status === 400) {
                const errResponse = await response.json();
                throw new BadRequestError(errResponse.message);
            }
            if (response.status === 404) {
                throw new BadRequestError('Not Found API');
            }
            if (response.status === 500) {
                throw new BadRequestError('Error in connect to server');
            }
            throw new Error('Error to get data');
        }
        return response.json();
    }

    async insert(tkn, tknrf, oInfo) {

        let sToken = await auth_service.validate_token(tkn, tknrf);

        let oHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`,
        };

        let params = {
            body: JSON.stringify(oInfo),
            method: 'POST',
            headers: oHeader
        };

        let response = await fetch(this.HOST + this.URL + '/', params);
        if (!response.ok) {
            if (response.status === 400) {
                const errResponse = await response.json();
                throw new BadRequestError(errResponse.message);
            }
            if (response.status === 404) {
                throw new BadRequestError('Not Found API');
            }
            if (response.status === 500) {
                throw new BadRequestError('Error in connect to server');
            }
            throw new Error('Error to insert data');
        } else {
            return response.json();
        }
    }

    async udpate(tkn, tknrf, id, oInfo) {

        let sToken = await auth_service.validate_token(tkn, tknrf);

        let oHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`,
        };

        let params = {
            method: 'PUT',
            body: JSON.stringify(oInfo),
            headers: oHeader,
        };

        let response = await fetch(this.HOST + this.URL + `/${id}`, params);
        if (!response.ok) {
            if (response.status === 400) {
                const errResponse = await response.json();
                throw new BadRequestError(errResponse.message);
            }
            if (response.status === 404) {
                throw new BadRequestError('Not Found API');
            }
            if (response.status === 500) {
                throw new BadRequestError('Error in connect to server');
            }
            throw new Error('Error to get data');
        }
        return response.ok;
    }

    async delete(tkn, tknrf, id) {

        let sToken = await auth_service.validate_token(tkn, tknrf);

        let oHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`,
        };

        let params = {
            method: 'DELETE',
            headers: oHeader,
        };

        let response = await fetch(this.HOST + this.URL + `/${id}`, params);
        if (!response.ok) {
            if (response.status === 400) {
                const errResponse = await response.json();
                throw new BadRequestError(errResponse.message);
            }
            if (response.status === 404) {
                throw new BadRequestError('Not Found API');
            }
            if (response.status === 500) {
                throw new BadRequestError('Error in connect to server');
            }
            throw new Error('Error to get data');
        }
        return response.ok;
    }

}