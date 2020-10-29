import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {AgentType, City, CompanyType, Country, Currency, LookupsService, PayMode} from "@ss/common/api-lookup";
import {Agent, AgentService} from "@ss/logistics/api-agent";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-agent-detail',
    styleUrls: ['./agent-detail.component.scss'],
    templateUrl: './agent-detail.component.html'
})
export class AgentDetailComponent extends BaseEntityDetailComponent<Agent> {

    agentTypes: AgentType[];
    companyTypes: CompanyType[];
    cities: City[];
    countries: Country[];
    currencies: Currency[];
    payModes: PayMode[];
    activities: PayMode[];

    constructor(
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(agentService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_AGENT');
    }

    public preload(): Observable<any> {
        return this.lookupsSrv.getAgentTypes()
            .pipe(
                tap(x => this.agentTypes = x),
                switchMap(() => this.lookupsSrv.getCities()),
                tap(x => this.cities = x),
                switchMap(() => this.lookupsSrv.getCountries()),
                tap(x => this.countries = x),
                switchMap(() => this.lookupsSrv.getCompanyTypes()),
                tap(x => this.companyTypes = x),
                switchMap(() => this.lookupsSrv.getCurrencies()),
                tap(x => this.currencies = x),
                switchMap(() => this.lookupsSrv.getPayModes()),
                tap(x => this.payModes = x),
                switchMap(() => this.lookupsSrv.getActivities()),
                tap(x => this.activities = x)
            );
    }

    public setupForm(a: Agent) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            customerCode: [a.customerCode, Validators.compose([Validators.required, Validators.maxLength(12)])],
            isInternal: [a.isInternal],
            denomination: [a.denomination, Validators.required],
            code: [a.code],
            address: [a.address],
            address2: [a.address2],
            city: [a.city],
            country: [a.country],
            phone: [a.phone],
            mobile: [a.mobile],
            fax: [a.fax],
            contact: [a.contact],
            info: [a.info],
            currency: [a.currency],
            taxPayable: [a.taxPayable],
            commRegister: [a.commRegister],
            fiscalID: [a.fiscalID],
            articleNo: [a.articleNo],
            stampPayable: [a.stampPayable],
            price: [a.price],
            denominationAr: [a.denominationAr],
            addressAr: [a.addressAr],
            address2Ar: [a.address2Ar],
            capital: [a.capital],
            bank: [a.bank],
            bankAccount: [a.bankAccount],
            swift: [a.swift],
            agentType: [a.agentType, Validators.required],
            companyType: [a.companyType],
            email: [a.email, Validators.email],
            website: [a.website],
            nis: [a.nis],
            nif: [a.nif],
            debtLimit: [a.debtLimit],
            debtTerm: [a.debtTerm],
            payMode: [a.payMode],
            checkDueDays: [a.checkDueDays],
            activity: [a.activity],
            recordBlocked: [a.recordBlocked],
            blockingReason: [a.blockingReason],
            subcontractor: [a.subcontractor],
            tin: [a.tin]
        });
    }

}
