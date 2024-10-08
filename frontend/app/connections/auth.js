import { url_host } from './config';

export default class AuthService {
    constructor() {
        this.HOST = url_host;
    }

    async generate_token() {

        let params = {
            body: JSON.stringify({ 
                username: 'admin',
                password: '123'
            }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        let oResponse = await fetch(this.HOST + '/api/token/', params);
        
        if (!oResponse.ok) {
            if (oResponse.status === 400 || oResponse.status === 401) {
                let jsRes = await oResponse.json();
                return {data: [], mess: jsRes.detail, type: 'Error' };
            } 
        }

        return {data: await oResponse.json(), mess: 'Login user success', type: 'Success' };
    }

    async validate_token(tkn,tknrf) {
        let newTkn = tkn;
        let params = {
            body: JSON.stringify({ token: tkn }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        let oResponse = await fetch(this.HOST + '/api/token/verify/', params);

        if (!oResponse.ok) {
            if (oResponse.status === 401) {
                newTkn =  this.refresh_token(tknrf);
            } else {
                console.error('Error to verify user');
            }
        }
        return newTkn;
    }

    async refresh_token(tkn) {
        
        let params = {
            body: JSON.stringify({refresh: tkn}),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        let oResponse = await fetch(this.HOST + '/api/token/refresh/', params);
        
        if (!oResponse.ok) {
            if (oResponse.status === 401) {
                console.error('Error to refresh consult');
            }
        }
        oResponse = await oResponse.json();
        return oResponse.access

    }
}