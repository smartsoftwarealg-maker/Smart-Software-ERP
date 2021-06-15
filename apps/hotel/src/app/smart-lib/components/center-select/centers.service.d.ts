import { Observable } from 'rxjs';
import { HttpService } from "../../common/http.service";
import { Center, Company } from "../../common/models";
export declare class CentersService {
    private httpSrv;
    constructor(httpSrv: HttpService);
    getCompanyList(): Observable<Company[]>;
    getCenterList(company: number): Observable<Center[]>;
}
