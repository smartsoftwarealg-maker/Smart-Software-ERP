import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Project } from '../contract-api.class';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    ActivityService,
    AwardProcedureService,
    LookupsService,
    ProjectActivityService,
    SectorService,
    Wilaya,
    WilayaService,
    WorkMasterService,
} from '@ss/common/api-lookup';
import { SalesContractService } from '../sales-contract.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { Agent, CustomerService } from '@ss/logistics/api-agent';
import { ProjectTypeService } from '@ss/common/api-lookup';
import { AppConfigService, LoginService, MaterialModule } from '@ss/common/api-common';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Article } from '@ss/master-data/api-article';


import { AppArchiveMainComponent } from '@ss/common/app-archive';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { ContractArticleMainComponent } from '../contract-article-main/contract-article-main.component';
import { TranslateDirective } from '@ss/common/ui-lang';
import { map, Observable, of, zip, switchMap } from 'rxjs';

@Component({
    selector: 'ss-cement-contract-detail',
    templateUrl: './cement-contract-detail.component.html',
    styleUrls: ['./cement-contract-detail.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        RouterModule,
        AppArchiveMainComponent,
        UiAutoCompleteComponent,
    ],
})
export class CementContractDetailComponent extends BaseEntityDetailComponent<Project> {
    private appConfigSrv = inject(AppConfigService);
    private wilayaSrv = inject(WilayaService);
    private loginSrv = inject(LoginService);
    private customerSrv = inject(CustomerService);
    private typeSrv = inject(ProjectTypeService);
    private awardSrv = inject(AwardProcedureService);
    private activitySrv = inject(ActivityService);
    private workMasterSrv = inject(WorkMasterService);
    private sectorSrv = inject(SectorService);
    private projSegmentSrv = inject(ProjectActivityService);

    activityLookup = new DefaultAutoCompleteModel(this.activitySrv);
    workMasterLookup = new DefaultAutoCompleteModel(this.workMasterSrv);
    sectorLookup = new DefaultAutoCompleteModel(this.sectorSrv);
    shownPanel: string = null;
    customerLookupModel = new DefaultAutoCompleteModel(
        this.customerSrv,
        'id',
        'denomination',
    );
    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);
    awardLookup = new DefaultAutoCompleteModel(this.awardSrv);
    wilayaLookup = new DefaultAutoCompleteModel(this.wilayaSrv);
    projSegmentLookup = new DefaultAutoCompleteModel(this.projSegmentSrv);

    articles: Article[] = [];

    constructor(
        public override entitySrv: SalesContractService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        private router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'LOGISTICS_CEMENT_PROJECT',
        );
        this.entitySrv.setParentId(this.entitySrv.getParentId() || 0);
        this.customerLookupModel.onObjectSelected = (a) => this.onAgent(a);
        this.projSegmentLookup.onObjectSelected = s => this.encodeProjectNumber();
        this.wilayaLookup.onObjectSelected = w => this.onWilaya(w);
    }

    public override setupForm(b: Project) {
        const today = new Date();
        this.entitySrv.setParentId(b.customer || 0);
        return this.formBuilder.group({
            id: [b.id],
            centerId: [
                b.centerId || this.loginSrv.appCtx.center,
                Validators.required,
            ],
            contractNo: [b.contractNo, Validators.required],
            projDate: [b.projDate || new Date(), Validators.required],
            description: [b.description, Validators.required],
            customer: [
                b.customer || this.entitySrv.getParentId(),
                Validators.required,
            ],
            fromDate: [b.fromDate || today, Validators.required],
            toDate: [b.toDate || today, Validators.required],
            amount: [b.amount || 0],
            advancePayment: [b.advancePayment || 0],
            advanceRate: [b.advanceRate || 0],
            projType: [b.projType],
            awardProcedure: [b.awardProcedure],
            projMotive: [b.projMotive],
            salesPurchase: [1],
            fiscalId: [b.fiscalId],
            wilaya: [b.wilaya],
            isBlocked: [b.isBlocked || false],
            qty: [b.qty || 0, Validators.required],
            monthlyRate: [b.monthlyRate || 0, Validators.required],
            dailyRate: [b.dailyRate],
            scheduledQty: [{ value: b.scheduledQty || 0, disabled: true }, Validators.required],
            dueDays: [b.dueDays || 0],
            activity: [b.activity],
            sector: [b.sector],
            masterWork: [b.masterWork],
            ods: [b.ods],
            odsDate: [b.odsDate],
            representative: [b.representative],
            extendedMode: [true],
            activity2: [b.activity2],
        });
    }

    override readForm(): Project {
        const value = this.form.getRawValue() as Project;
        this.entitySrv.setParentId(value.customer || 0);
        return value;
    }

    public getPanelHeaderClass(
        section: string,
        panel: MatExpansionPanel,
    ): string {
        if (panel.expanded) return 'b-primary-expansion-panel';
        else return '';
    }

    panelOpened(panel: string) {
        this.shownPanel = panel;
        const next = `/app/contracts/cements/${this.id}/${panel}`;
        this.router.navigate([next]).then();
    }

    onAgent(a: Agent) {
        this.entitySrv.setParentId(a?.id || 0);
        this.encodeProjectNumber();
    }

    private encodeProjectNumber() {
        const id = this.customerLookupModel.cache?.id||0;
        zip(this.entitySrv.getProjectCode(id || 0), this.isSCHB())
            .pipe(switchMap(res => res[1]? this.schbEncoded() : of(res[0].code)))
            .subscribe((res) => {
                this.form?.controls['contractNo'].setValue(res);
            },
            );
    }

    private isSCHB(): Observable<boolean> {
        return this.appConfigSrv
            .getConfig()
            .pipe(map((conf) => {
                return conf?.['schb'] === true;
            }));
    }

    onWilaya(w: Wilaya) {
        this.isSCHB()
            .pipe(switchMap(res => of(res? this.encodeProjectNumber(): null)))
            .subscribe();
    }

    private schbEncoded(): Observable<string> {
        return this.entitySrv
            .getLast()
            .pipe(
                map((res) => {
                    const max = res.body.length > 0 ? res.body[0].id : 1;
                    const wCode = this.wilayaLookup.cache?.id || 0;
                    const wilaya = (wCode < 10 ? '0' : '') + wCode;
                    const seg = this.projSegmentLookup.cache?.descriptionAr || '00';
                    return `${max}_${seg}_${wilaya}`;
                })
            );
    }
}
