import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AbstractControl, UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {
    ActivityService,
    AgentPrice,
    AgentType,
    City,
    CompanyType,
    Country,
    Currency, DepartmentService,
    LookupsService,
    PayMode
} from '@ss/common/api-lookup';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import {FormValidators, IsParamService, LoginService} from '@ss/common/api-common';
import {Bank, BankService} from '@ss/administration/api-bank';
import {Lookup} from '@ss/logistics/ui-doc-import';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AGENT_ARCHIVES} from '@ss/common/app-archive';


@Component({
    selector: 'ss-agent-detail',
    styleUrls: ['./agent-detail.component.scss'],
    templateUrl: './agent-detail.component.html'
})
export class AgentDetailComponent extends BaseEntityDetailComponent<Agent> implements OnInit {
    private bankSrv = inject(BankService);
    private loginSrv = inject(LoginService);
    private departmentSrv =  inject(DepartmentService);
    private activitySrv =  inject(ActivityService);

    public LOCAL_AGENT_ARCHIVES = AGENT_ARCHIVES;
    AQS = false;
    departmentLookup = new DefaultAutoCompleteModel(this.departmentSrv);
    activityLookup = new DefaultAutoCompleteModel(this.activitySrv);
    bankLookup     = new DefaultAutoCompleteModel(this.bankSrv);
    isSales = this.route.snapshot.data['sales'];
    pwd1 = new UntypedFormControl();
    pwd2 = new UntypedFormControl();
    agentTypes: AgentType[];
    companyTypes: CompanyType[] = [];
    cities: City[] = [];
    categories: Lookup[] = [];
    countries: Country[] = [];
    currencies: Currency[] = [];
    payModes: PayMode[] = [];
    prices: AgentPrice[] = [];

    constructor(
        public agentSrv: AgentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private router: Router,
        private isParamSrv: IsParamService) {
        super(agentSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_AGENT');
        // this.isSales = this.route.snapshot.data['sales'];
    }

    public override preload(): Observable<any> {
        return this.lookupsSrv
            .getAgentTypes()
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
                switchMap(() => this.lookupsSrv.getPrices()),
                catchError(e => of([])),
                tap(x => this.prices = x),
                switchMap(_ => this.lookupsSrv.getSalesCategories()),
                tap(x => this.categories = x),
                switchMap(_ => this.isParamSrv.is('AQS')),
                tap(res => this.AQS = res)
            );
    }

    override finishLoading(e: Agent) {
        super.finishLoading(e);
        this.form.controls['recordBlocked']
            .valueChanges
            .subscribe(x => {
                if (x) {
                    this.form.controls['blockingReason'].disable();
                    this.form.controls['blockingReason'].setValue('');
                } else {
                    this.form.controls['blockingReason'].enable();
                }

            });
    }

    public override setupForm(a: Agent) {
        const urlRegExp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            customerCode: [a.customerCode, Validators.compose([Validators.maxLength(14)])],
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
            currency: [a.currency || 10],
            taxPayable: [a.taxPayable],
            commRegister: [a.commRegister],
            fiscalID: [a.fiscalID],
            articleNo: [a.articleNo],
            stampPayable: [a.stampPayable],
            price: [a.price || 0],
            denominationAr: [a.denominationAr],
            addressAr: [a.addressAr],
            address2Ar: [a.address2Ar],
            capital: [a.capital],
            bank: [a.bank],
            bankAccount: [a.bankAccount],
            swift: [a.swift],
            agentType: [a.agentType],
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
            blockingReason: {value: a.blockingReason, disabled: a.recordBlocked},
            subcontractor: [a.subcontractor],
            postalCode: [a.postalCode],
            approval: [a.approval],
            category: [a.category],
            tin: [a.tin],
            department: [a.department],
            creationTime: { value: a.creationTime, disabled: true }
        });
    }

    public isTouchedAndInvalid(control: AbstractControl): boolean {
        return control.invalid && control.touched;
    }

    public isGeneralSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['denomination']) ||
            this.isTouchedAndInvalid(this.form.controls['customerCode']) ||
            this.isTouchedAndInvalid(this.form.controls['price']) ||
            this.isTouchedAndInvalid(this.form.controls['currency']) ||
            this.isTouchedAndInvalid(this.form.controls['agentType']);
    }

    public isLatinSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['email']) || this.isTouchedAndInvalid(this.form.controls['website']);
    }

    public isFiscalSectionInvalid(): boolean {
        return this.form.touched &&
            (this.form.controls['checkDueDays'].invalid ||
                this.form.controls['debtTerm'].invalid);
    }

    public isSectionInvalid(section: string): boolean {
        switch (section) {
        case 'general':
            return this.isGeneralSectionInvalid();
        case 'latin':
            return this.isLatinSectionInvalid();
        case 'fiscal':
            return this.isFiscalSectionInvalid();
        default:
            return false;
        }
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (this.isSectionInvalid(section)) {
            return 'b-warn-expansion-panel';
        }

        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

    override readForm(): Agent {
        const a = super.readForm();
        a.price = a.price || 1;
        a.agentType = a.agentType || 0;
        a.currency = a.currency || this.currencies[0].id;
        return a;
    }

    // override uploadAttachments(id: number): Observable<any> {
    //     return this.agentSrv
    //         .get(id)
    //         .pipe(tap(agent => {
    //             this.form.controls['price'].setValue(agent?.price || 0);
    //             this.form.controls['agentType'].setValue(agent.agentType);
    //             this.form.controls['currency'].setValue(agent.currency);
    //             this.form.controls['customerCode'].setValue(agent.customerCode);
    //             this.form.controls['creationTime'].setValue(agent.creationTime);
    //         }));
    // }

    updatePassword() {
        if (this.pwd1.value === this.pwd2.value) {
            this.agentSrv
                .updatePassword({
                    id: this.loginSrv.appCtx.id,
                    agentId: this.form.controls['id'].value,
                    password: this.pwd2.value
                })
                .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }

    override ngOnInit() {
        super.ngOnInit();
        const idx = this.router.url.indexOf('agents');
        const url = this.router.url.substring(0, idx) + 'agents';
        this.shellSrv.setGoBackPath(url, this.route);
    }
}
