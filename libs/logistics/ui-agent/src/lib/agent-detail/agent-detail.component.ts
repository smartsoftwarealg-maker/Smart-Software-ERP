import { Component, inject, OnInit } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AbstractControl, FormControl, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {
    ActivityService,
    AgentTypeService, CategoryService,
    CityService,
    CompanyTypeService, CountryService,
    CurrencyService, DepartmentService, Lookup,
    LookupsService,
    PayModeService
} from '@ss/common/api-lookup';
import { Agent, AgentCenter, AgentCenterService, AgentService, CUSTOMER_URL } from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import { FormValidators, IsParamService, LoginService, Role } from '@ss/common/api-common';
import {BankService} from '@ss/administration/api-bank';
import { DefaultAutoCompleteModel, Id } from '@ss/common/ui-auto-complete';
import { AGENT_ARCHIVES, AppArchiveService } from '@ss/common/app-archive';
import { MatSelectionListChange } from '@angular/material/list';
import { CenterService } from '@ss/administration/api-center';
import { MatDialog } from '@angular/material/dialog';
import { AgentImportComponent } from '../agent-import/agent-import.component';
import { AgentPriceService } from '@ss/logistics/api-agent-price';


@Component({
    selector: 'ss-agent-detail',
    styleUrls: ['./agent-detail.component.scss'],
    templateUrl: './agent-detail.component.html'
})
export class AgentDetailComponent extends BaseEntityDetailComponent<Agent> implements OnInit {
    private archiveSrv = inject(AppArchiveService);
    private dialog  = inject(MatDialog);
    private router = inject(Router);
    private isParamSrv = inject(IsParamService);
    private bankSrv = inject(BankService);
    private loginSrv = inject(LoginService);
    private departmentSrv =  inject(DepartmentService);
    private activitySrv =  inject(ActivityService);
    private agentCenterSrv = inject(AgentCenterService);
    private centerSrv = inject(CenterService);
    private payModeSrv = inject(PayModeService);
    private currencySrv = inject(CurrencyService);
    private agentTypeSrv = inject(AgentTypeService);
    private categorySrv = inject(CategoryService);
    private priceSrv = inject(AgentPriceService);
    private companyTypeSrv = inject(CompanyTypeService);
    private citySrv = inject(CityService);
    private countrySrv = inject(CountryService);


    private invImportBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importAgents(),
    };

    public LOCAL_AGENT_ARCHIVES = AGENT_ARCHIVES;
    AQS = false;

    departmentLookup = new DefaultAutoCompleteModel(this.departmentSrv);
    activityLookup = new DefaultAutoCompleteModel(this.activitySrv);
    bankLookup     = new DefaultAutoCompleteModel(this.bankSrv);
    payModeLookup = new DefaultAutoCompleteModel(this.payModeSrv);
    currencyLookup = new DefaultAutoCompleteModel(this.currencySrv);
    agentTypeLookup = new DefaultAutoCompleteModel(this.agentTypeSrv);
    categoryLookup = new DefaultAutoCompleteModel(this.categorySrv);
    priceLookup = new DefaultAutoCompleteModel(this.priceSrv);
    companyTypeLookup = new DefaultAutoCompleteModel(this.companyTypeSrv);
    cityLookup = new DefaultAutoCompleteModel(this.citySrv);
    countryLookup = new DefaultAutoCompleteModel(this.countrySrv);

    isSales = false;
    pwd1 = new UntypedFormControl();
    pwd2 = new UntypedFormControl();

    selectedCenter = 0;
    agentCenters: AgentCenter[] = [];

    centerLookup = new DefaultAutoCompleteModel<Role>(this.centerSrv);
    centerCtrl = new FormControl<number>(0);

    constructor(
        public agentSrv: AgentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(agentSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_AGENT');
        this.isSales = this.route.snapshot.data['sales'];
        this.centerSrv.setParentId(this.loginSrv.appCtx.company);
    }

    public override preload(): Observable<any> {
        return this.isParamSrv
            .is('AQS')
            .pipe(
                tap(res => this.AQS = res),
                switchMap(() => this.route.data),
                tap(res => {
                    if (res['customer']) {
                        this.entitySrv.setURL(CUSTOMER_URL);
                        this.agentTypeLookup = new CustomerLookup(this.agentTypeSrv);
                        this.shellSrv.setTitle('LOGISTICS_CUSTOMER');
                    }
                })
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

        this.agentCenterSrv.setParentId(a?.id ||0);
        this.agentCenterSrv
            .getList(0, 1000)
            .subscribe(res => this.agentCenters = res.body);
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
        this.archiveSrv.appId = AGENT_ARCHIVES;
        super.ngOnInit();
        const target = this.router.url.indexOf('agents') < 0? 'customers' : 'agents';
        const idx = this.router.url.indexOf(target);
        const url = this.router.url.substring(0, idx) + target;
        this.shellSrv.setGoBackPath(url, this.route);
        this.shellSrv.addButton(this.invImportBtn);
    }

    centerSelectionChanged(ev: MatSelectionListChange) {
        this.selectedCenter = ev.options[0].value;
    }

    deleteCenter() {
        if (this.selectedCenter > 0) {
            this.agentCenterSrv
                .remove(this.selectedCenter)
                .pipe(switchMap(res => this.agentCenterSrv.getList(0, 1000)))
                .subscribe(res => {
                    this.selectedCenter = 0;
                    this.agentCenters = res.body;
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }

    addCenter() {
        if (this.centerCtrl.value != null) {
            this.agentCenterSrv
                .save({ id: 0, parentId: this.id, centerId: this.centerCtrl.value })
                .pipe(switchMap(res => this.agentCenterSrv.getList(0, 1000)))
                .subscribe(res => {
                    this.agentCenters = res.body;
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }
    private importAgents() {
        if (!this.invImportBtn.disabled) {
            const id = this.form.controls['id']?.value;
            const dialogRef = this.dialog.open(AgentImportComponent, {
                width: '720px',
                height: '690px',
                disableClose: true,
                data: {
                    transactId: id
                }
            });

            dialogRef
                .afterClosed()
                .subscribe(result => {
                    if (result && result['count']) {
                        this.snackBarSrv.showMessage('COMMON_SUCCESS');
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                    this.shellSrv.setLoading(false);
                });
        }
    }
}

class CustomerLookup extends DefaultAutoCompleteModel<Lookup> {
    constructor(public srv: AgentTypeService) {
        super(srv);
    }
    override filterLoadedData = (x: Lookup[]) => x.filter(e => e && e.id < 2);
    override getById = (id: Id) => id === null || id === undefined? of(null) : this.entitySrv.get(id);
}
