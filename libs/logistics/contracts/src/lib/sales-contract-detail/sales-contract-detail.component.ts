import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Project} from '../contract-api.class';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    ActivityService,
    AwardProcedureService,
    LookupsService,
    WilayaService,
} from '@ss/common/api-lookup';
import {SalesContractService} from '../sales-contract.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { Agent, CustomerService } from '@ss/logistics/api-agent';
import {ProjectTypeService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {MatExpansionPanel} from '@angular/material/expansion';
import {Article} from '@ss/master-data/api-article';

import { AppArchiveMainComponent } from '@ss/common/app-archive';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { ContractArticleMainComponent } from '../contract-article-main/contract-article-main.component';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-sales-contract-detail',
    templateUrl: './sales-contract-detail.component.html',
    styleUrls: ['./sales-contract-detail.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        RouterModule,
        ContractArticleMainComponent,
        AppArchiveMainComponent,
        UiAutoCompleteComponent
    ]
})
export class SalesContractDetailComponent extends BaseEntityDetailComponent<Project> {
    private activitySrv = inject(ActivityService);
    private wilayaSrv = inject(WilayaService);
    private loginSrv = inject(LoginService);
    private customerSrv = inject(CustomerService);
    private typeSrv = inject(ProjectTypeService);
    private awardSrv = inject(AwardProcedureService);
    shownPanel: string = null;
    customerLookupModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    activityLookup = new DefaultAutoCompleteModel(this.activitySrv);
    typeLookup    = new DefaultAutoCompleteModel(this.typeSrv);
    awardLookup   = new DefaultAutoCompleteModel(this.awardSrv);
    wilayaLookup   = new DefaultAutoCompleteModel(this.wilayaSrv);
    articles: Article[] = [];

    constructor(
        public override entitySrv: SalesContractService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        private  router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_SALES_PROJECTS');
        this.entitySrv.setParentId(this.entitySrv.getParentId() || 0);
        this.customerLookupModel.onObjectSelected = a => this.onAgent(a);
        // this.articleLookup.onObjectSelected = (a) => this.onArticle(a);
    }

    public override setupForm(b: Project) {
        const today = new Date();
        this.entitySrv.setParentId(b.customer || 0);
        return this.formBuilder.group({
            id:             [b.id],
            centerId:       [b.centerId || this.loginSrv.appCtx.center, Validators.required],
            contractNo:     [b.contractNo, Validators.required],
            projDate:       [b.projDate || new Date(), Validators.required],
            description:    [b.description, Validators.required],
            customer:       [b.customer || this.entitySrv.getParentId(), Validators.required],
            fromDate:       [b.fromDate  || today, Validators.required],
            toDate:         [b.toDate  || today, Validators.required],
            amount:         [b.amount || 0],
            advancePayment: [b.advancePayment || 0],
            advanceRate:    [b.advanceRate || 0],
            projType:       [b.projType],
            awardProcedure: [b.awardProcedure],
            projMotive:     [b.projMotive],
            salesPurchase:  [1],
            fiscalId:       [b.fiscalId],
            wilaya:         [b.wilaya],
            activity:       [b.activity],
            isBlocked:      [b.isBlocked||false],
            multiCenters:   [b.multiCenters||false]
        });
    }

    override readForm(): Project {
        const value = this.form.getRawValue() as Project;
        this.entitySrv.setParentId(value.customer || 0);
        return value;
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

    panelOpened(panel: string) {
        this.shownPanel = panel;
        const next = '/app/contracts/contracts/' + this.id + '/' + panel;
        this.router.navigate([next]).then();
    }

    onAgent(a: Agent) {
        this.entitySrv.setParentId(a?.id || 0);
        this.entitySrv
            .getProjectCode(a?.id || 0)
            .subscribe((projectCode) =>
                this.form?.controls['contractNo'].setValue(projectCode?.code),
            );
    }
}
