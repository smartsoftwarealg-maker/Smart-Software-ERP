import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {AgentType, Bank, City, CompanyType, Country, Currency, LookupsService, PayMode} from "@ss/common/api-lookup";
import {Agent, AgentService} from "@ss/logistics/api-agent";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {MatExpansionPanel} from "@angular/material/expansion";
import {UserService} from "@ss/common/api-common";
import {FormValidators} from "../../../../common/api-common/src/lib/FormValidators";


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
    prices: PayMode[];
    banks: Bank[];


    constructor(
        public agentService: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public centerService: UserService,
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
                tap(x => this.activities = x),
                switchMap(() => this.lookupsSrv.getPrices()),
                tap(x => this.prices = x),
                switchMap(() => this.lookupsSrv.getBanks()),
                tap(x => this.banks = x)
            );
    }

    public setupForm(a: Agent) {
        const urlRegExp: RegExp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            customerCode: [a.customerCode, Validators.compose([Validators.required, Validators.maxLength(18)])],
            isInternal: [a.isInternal],
            denomination: [a.denomination, Validators.required],
            address: [a.address],
            address2: [a.address2],
            city: [a.city],
            country: [a.country],
            phone: [a.phone],
            mobile: [a.mobile],
            fax: [a.fax],
            contact: [a.contact],
            info: [a.info],
            currency: [a.currency, Validators.required],
            taxPayable: [a.taxPayable],
            commRegister: [a.commRegister],
            fiscalID: [a.fiscalID],
            articleNo: [a.articleNo],
            stampPayable: [a.stampPayable],
            price: [a.price, Validators.required],
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
            website: [a.website, Validators.pattern(urlRegExp)],
            nis: [a.nis],
            nif: [a.nif],
            debtLimit: [a.debtLimit],
            debtTerm: [a.debtTerm, FormValidators.integerValidator],
            payMode: [a.payMode],
            checkDueDays: [a.checkDueDays, FormValidators.integerValidator],
            activity: [a.activity],
            recordBlocked: [a.recordBlocked],
            blockingReason: [a.blockingReason],
            subcontractor: [a.subcontractor],
            tin: [a.tin],
            creationTime: [a.creationTime]
        });
    }

    public isGeneralSectionInvalid(): boolean {
        return this.form.touched &&
            (this.form.controls['denomination'].invalid ||
                this.form.controls['customerCode'].invalid ||
                this.form.controls['price'].invalid ||
                this.form.controls['currency'].invalid ||
                this.form.controls['agentType'].invalid)
    }

    public isLatinSectionInvalid(): boolean {
        return this.form.touched &&
            (this.form.controls['email'].invalid ||
                this.form.controls["website"].invalid);
    }

    public isFiscalSectionInvalid(): boolean {
        return this.form.touched &&
            (this.form.controls['checkDueDays'].invalid ||
                this.form.controls["debtTerm"].invalid);
    }

    public isSectionInvalid(section): boolean {
        switch (section) {
            case "general":
                return this.isGeneralSectionInvalid();
            case "latin":
                return this.isLatinSectionInvalid();
            case "fiscal":
                return this.isFiscalSectionInvalid();
            default:
                return false;
        }
    }

    public getPanelHeaderClass(section, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (this.isSectionInvalid(section)) {
            return "b-warn-expansion-panel";
        }

        // if expanded return primary background class
        if (panel.expanded)
            return "b-primary-expansion-panel"
        else
            return "";
    }


}
