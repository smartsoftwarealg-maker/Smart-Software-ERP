import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Agent, AGENT_URL} from "@ss/logistics/api-agent";
import {Observable, of} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AgentTestService extends BaseEntityService<Agent> {


    constructor(protected httpSrv: HttpService) {
        super(httpSrv, AGENT_URL);
    }


    get(id: number): Observable<Agent> {
        return of({
            activity: 1,
            address: "Agent first address",
            address2: "Agent second address",
            address2Ar: "Agent first address arabic",
            addressAr: "Agent second address arabic",
            agentType: 1,
            articleNo: "Article 01",
            bank: "Bank 01",
            bankAccount: "Bank Account 01",
            blockingReason: "Blocking reason 01",
            capital: "Capital 01",
            checkDueDays: 10,
            city: 1,
            code: "2",
            commRegister: "Comm Register 01",
            companyType: 1,
            contact: "Contact 01",
            country: 1,
            currency: 2,
            customerCode: "Customer Code 01",
            debtLimit: 20,
            debtTerm: 3,
            denomination: "Denomination 01",
            denominationAr: "Denomination ar",
            email: "email@email.com",
            fax: "fax",
            fiscalID: "fiscal id",
            id: 1,
            info: "info",
            isInternal: true,
            mobile: "0669788862",
            nif: "nif",
            nis: "nif",
            payMode: 1,
            phone: "0317618956",
            price: 1,
            recordBlocked: true,
            stampPayable: true,
            subcontractor: true,
            swift: "swift 01",
            taxPayable: true,
            tin: "tin",
            website: "website 01",
        } as Agent);
    }
}
