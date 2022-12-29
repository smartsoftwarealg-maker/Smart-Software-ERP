import {Injectable} from "@angular/core";
import {BaseEntityExtendedService} from "@ss/common/api-base-entity";
import {Patient, PATIENT_URL} from "./patients.api";
import {HttpService, Password} from "@ss/common/api-common";
import {AGENT_URL} from "@ss/logistics/api-agent";
import {Observable, of} from "rxjs";
import {Payment} from "@ss/logistics/api-common";

@Injectable({
    providedIn: 'root'
})

export class PatientService extends BaseEntityExtendedService<Patient> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, PATIENT_URL);
    }

    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }
}
