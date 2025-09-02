import { Component, inject, OnInit, signal } from '@angular/core';
import {
    KeepOnToolbar,
    ShellService,
    SnackBarService,
    ToolbarButton,
} from '@ss/common/ui-shell';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
    AbstractControl,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormControl,
    Validators,
} from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    ActivityService,
    AgentTypeService,
    CityService,
    CompanyTypeService,
    CountryService,
    CurrencyService,
    DepartmentService,
    Lookup,
    LookupsService,
    PayModeService,
    SalesCategoryService,
} from '@ss/common/api-lookup';
import {
    Agent,
    AgentCenter,
    AgentCenterService,
    AgentService,
    CUSTOMER_URL,
} from '@ss/logistics/api-agent';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import {
    FormValidators,
    IsParamService,
    LoginService,
    MaterialModule,
} from '@ss/common/api-common';
import { BankService } from '@ss/administration/api-bank';
import {
    DefaultAutoCompleteModel,
    Id,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import {
    AGENT_ARCHIVES,
    AppArchiveMainComponent,
    AppArchiveService,
} from '@ss/common/app-archive';
import { CenterService } from '@ss/administration/api-center';
import { MatDialog } from '@angular/material/dialog';
import { CrmCustomerImportComponent } from '../crm-customer-import/crm-customer-import.component';
import { AgentPriceService } from '@ss/logistics/api-agent-price';

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ChildAttributesComponent } from '@ss/custom-attributes';
import { OptionService } from '@ss/logistics/ui-options';
import {CrmContactLineService} from "../crm-contact/crm-contact-line-detail.service";

enum Panels {
    INFO = 0,
    ADDRESS = 1,
    ARCHIVE = 2,
    ATTRIB = 3,
    CONTACT = 4,
}

@Component({
    selector: 'ss-crm-customer-detail',
    styleUrls: ['./crm-customer-detail.component.scss'],
    templateUrl: './crm-customer-detail.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        AppArchiveMainComponent,
        UiAutoCompleteComponent,
        ChildAttributesComponent,
        RouterOutlet,
    ],
})
export class CrmCustomerDetailComponent
    extends BaseEntityDetailComponent<Agent>
    implements OnInit
{
    private optionSrv = inject(OptionService);
    private defaultAgentType = 0;
    private dialog = inject(MatDialog);
    private router = inject(Router);
    private isParamSrv = inject(IsParamService);
    private bankSrv = inject(BankService);
    private loginSrv = inject(LoginService);
    private departmentSrv = inject(DepartmentService);
    private activitySrv = inject(ActivityService);
    private agentCenterSrv = inject(AgentCenterService);
    private centerSrv = inject(CenterService);
    private payModeSrv = inject(PayModeService);
    private currencySrv = inject(CurrencyService);
    private agentTypeSrv = inject(AgentTypeService);
    private categorySrv = inject(SalesCategoryService);
    private priceSrv = inject(AgentPriceService);
    private companyTypeSrv = inject(CompanyTypeService);
    private citySrv = inject(CityService);
    private countrySrv = inject(CountryService);
    public crmContactSrv = inject(CrmContactLineService);

    private invImportBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importAgents(),
    };

    archiveSrv = inject(AppArchiveService);
    public LOCAL_AGENT_ARCHIVES = AGENT_ARCHIVES;

    departmentLookup = new DefaultAutoCompleteModel(this.departmentSrv);
    activityLookup = new DefaultAutoCompleteModel(this.activitySrv);
    bankLookup = new DefaultAutoCompleteModel(this.bankSrv);
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

    selectedDiv = signal<Panels>(Panels.ADDRESS);

    constructor(
        public agentSrv: AgentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
    ) {
        super(
            agentSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            '',
        );
        this.isSales = this.route.snapshot.data['sales'];
        this.centerSrv.setParentId(this.loginSrv.appCtx.company);
    }

    public override preload(): Observable<any> {
        this.shellSrv.setTitle('LOGISTICS_CUSTOMER');
        this.agentTypeLookup = new CustomerLookup(this.agentTypeSrv);
        this.defaultAgentType = 0;
        this.entitySrv.setURL(CUSTOMER_URL);
        return this.optionSrv
            .get(this.loginSrv.appCtx.center)
            .pipe(tap((res) => (this.optionSrv.options = res)));
    }

    override finishLoading(e: Agent) {
        super.finishLoading(e);
        this.form.controls['recordBlocked'].valueChanges.subscribe((x) => {
            if (!x) {
                this.form.controls['blockingReason'].disable();
                this.form.controls['blockingReason'].setValue('');
            } else {
                this.form.controls['blockingReason'].enable();
            }
        });
    }

    public override setupForm(a: Agent) {
        const urlRegExp = new RegExp(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        );
        this.crmContactSrv.setParentId(a?.id || 0);
        this.agentCenterSrv.setParentId(a?.id || 0);
        this.agentCenterSrv
            .getList(0, 1000)
            .subscribe((res) => (this.agentCenters = res.body));
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            customerCode: [
                a.customerCode,
                Validators.compose([Validators.maxLength(14)]),
            ],
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
            currency: [a.currency || this.optionSrv.options?.defaultCurrency],
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
            agentType: [a.agentType || this.defaultAgentType],
            companyType: [a.companyType],
            email: [a.email, Validators.email],
            website: [a.website, Validators.pattern(urlRegExp)],
            nis: [a.nis],
            nif: [a.nif],
            debtLimit: [a.debtLimit || 0],
            debtTerm: [a.debtTerm, FormValidators.integerValidator],
            payMode: [a.payMode],
            checkDueDays: [a.checkDueDays, FormValidators.integerValidator],
            activity: [a.activity],
            recordBlocked: [a.recordBlocked],
            blockingReason: {
                value: a.blockingReason,
                disabled: a.recordBlocked,
            },
            subcontractor: [a.subcontractor],
            postalCode: [a.postalCode],
            approval: [a.approval],
            category: [a.category],
            tin: [a.tin],
            department: [a.department],
            creationTime: { value: a.creationTime, disabled: true },
        });
    }

    public isTouchedAndInvalid(control: AbstractControl): boolean {
        return control.invalid && control.touched;
    }

    public isGeneralSectionInvalid(): boolean {
        return (
            this.isTouchedAndInvalid(this.form.controls['denomination']) ||
            this.isTouchedAndInvalid(this.form.controls['customerCode']) ||
            this.isTouchedAndInvalid(this.form.controls['price']) ||
            this.isTouchedAndInvalid(this.form.controls['currency']) ||
            this.isTouchedAndInvalid(this.form.controls['agentType'])
        );
    }

    public isLatinSectionInvalid(): boolean {
        return (
            this.isTouchedAndInvalid(this.form.controls['email']) ||
            this.isTouchedAndInvalid(this.form.controls['website'])
        );
    }

    public isFiscalSectionInvalid(): boolean {
        return (
            this.form.touched &&
            (this.form.controls['checkDueDays'].invalid ||
                this.form.controls['debtTerm'].invalid)
        );
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

    public getPanelHeaderClass(
        section: string,
        panel: MatExpansionPanel,
    ): string {
        // if invalid return warning class
        if (this.isSectionInvalid(section)) {
            return 'b-warn-expansion-panel';
        }

        // if expanded return primary background class
        if (panel.expanded) return 'b-primary-expansion-panel';
        else return '';
    }

    override readForm(): Agent {
        const a = super.readForm();
        a.price = a.price || 1;
        a.agentType = a.agentType || 0;
        return a;
    }

    updatePassword() {
        if (this.pwd1.value === this.pwd2.value) {
            this.agentSrv
                .updatePassword({
                    id: this.loginSrv.appCtx.id,
                    agentId: this.form.controls['id'].value,
                    password: this.pwd2.value,
                })
                .subscribe(() =>
                    this.snackBarSrv.showMessage(
                        'COMMON_SUCCESS',
                        false,
                        false,
                    ),
                );
        }
    }

    override ngOnInit() {
        super.ngOnInit();
        const target = 'crm-customer';

        const idx = this.router.url.indexOf(target);
        const url = this.router.url.substring(0, idx) + target;
        this.shellSrv.setGoBackPath(url, this.route);
        this.shellSrv.addButton(this.invImportBtn);
    }

    override loadEntity(id: number): Observable<Agent> {
        this.archiveSrv.appId = AGENT_ARCHIVES;
        this.archiveSrv.setParentId(id);
        return super.loadEntity(id);
    }

    private importAgents() {
        if (!this.invImportBtn.disabled) {
            const dialogRef = this.dialog.open(CrmCustomerImportComponent, {
                width: '720px',
                height: '750px',
                maxWidth: '750px',
                disableClose: true,
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result && result['count']) {
                    this.snackBarSrv.showMessage('COMMON_SUCCESS');
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
                this.shellSrv.setLoading(false);
            });
        }
    }

    loadNextCode() {
        const formValue = this.form.getRawValue();
        this.agentSrv
            .getNextCode(formValue.customerCode, formValue.agentType)
            .subscribe((res) => {
                this.form.controls['customerCode'].setValue(res.code);
            });
    }

    select(idx: Panels) {
        this.selectedDiv.set(idx);
        if (idx == Panels.ARCHIVE) {
            this.router
                .navigate(['archive'], { relativeTo: this.route.parent })
                .then();
        }
        if (idx == Panels.CONTACT) {
            this.router
                .navigate(['contact'], { relativeTo: this.route.parent })
                .then();
        }
    }
}

class CustomerLookup extends DefaultAutoCompleteModel<Lookup> {
    constructor(public srv: AgentTypeService) {
        super(srv);
    }

    override filterLoadedData = (x: Lookup[]) => x.filter((e) => e && e.id < 2);
    override getById = (id: Id) =>
        id === null || id === undefined ? of(null) : this.entitySrv.get(id);
}
