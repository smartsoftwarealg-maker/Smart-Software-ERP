import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Agent, Person} from './models';
import {HttpService} from './http.service';

@Injectable({
    providedIn: 'root'
})
export class DecService {

    constructor(private http: HttpService) {
    }

    // license: string = null;
    private key = '3112446620478417397617965250217336647183';
    private OFFSET = 20180001;
    private DIV = 1;

    public doDecrypt(msg: string): string {
        const idx = msg.lastIndexOf('-');
        const scs = msg.substr(idx + 1);
        let cs = 0;
        msg = msg.substr(0, idx).split('-').join('');
        while (msg.startsWith('0')) {
            msg = msg.substr(1);
        }
        if (msg && msg.length % 2 === 1) {
            msg = '0' + msg;
        }
        const msgParts = msg.match(/.{1,2}/g) || ['00', '00'];
        const tokens = msgParts
            .map((str, i) => {
                const value1 = parseInt(str, 16);
                const value2 = this.key[i].charCodeAt(0);

                // tslint:disable-next-line:no-bitwise
                const xorValue = value1 ^ value2;
                cs += value1;
                return String.fromCharCode(xorValue);
            })
            .join('')
            .split('-');
        if (tokens.length > 1) {
            if (cs === parseInt(scs, 16)) {
                tokens[1] = (+tokens[1] * this.DIV / 2 + this.OFFSET) + '';
            } else {
                tokens[1] = '0';
            }
        }
        return tokens.join('-');
    }

    private isValidLicense2(lk2: string, username: string): boolean {
        const today = new Date();
        const dday = today.getFullYear() * 10000 +
            today.getMonth() * 100 +
            today.getDate();
        const lic = this.doDecrypt(lk2).split('-');
        return lic[0] === username && +lic[1] >= dday;
    }

    public isValidLicense(license: string, username: string): boolean {
        return license != null &&
            license.length > 10 && this.isValidLicense2(license, username);
    }

    public savePersonLicense(license: string, person: Person): Observable<number> {
        if (!this.isValidLicense(license, person.customCode)) {
            throw new Error('INVALID_LICENSE');
        }
        return this
            .http
            .put(`/persons/${person.id}/license`, {license: license});
    }

    public saveAgentLicense(license: string, agent: Agent): Observable<number> {
        if (!this.isValidLicense(license, agent.code)) {
            throw new Error('INVALID_LICENSE');
        }
        return this.http
            .put(`/persons/${agent.id}/license`, {license: license});
    }
}
