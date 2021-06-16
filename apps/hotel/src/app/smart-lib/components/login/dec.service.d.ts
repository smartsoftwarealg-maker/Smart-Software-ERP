import { Observable } from 'rxjs';
import { Agent } from "../../common/models";
import { Person } from "./login.service";
import { HttpService } from "../../common/http.service";
import { LanguageService } from "../../common/language/language.service";
export declare class DecService {
    private langSrv;
    private http;
    constructor(langSrv: LanguageService, http: HttpService);
    private key;
    private OFFSET;
    private DIV;
    doDecrypt(msg: string): string;
    private isValidLicense2;
    isValidLicense(license: string, username: string): boolean;
    savePersonLicense(license: string, person: Person): Observable<number>;
    saveAgentLicense(license: string, agent: Agent): Observable<number>;
}
