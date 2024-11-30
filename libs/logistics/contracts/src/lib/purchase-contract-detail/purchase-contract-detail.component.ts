import { Component, inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Project} from '../contract-api.class';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { AwardProcedureService, LookupsService, ProjectMotiveService, WilayaService } from "@ss/common/api-lookup";
import {SalesContractService} from '../sales-contract.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { AgentService, SupplierService } from "@ss/logistics/api-agent";
import {ProjectTypeService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import {MatExpansionPanel} from '@angular/material/expansion';
import {ContractArticleService} from '../contract-article.service';
import {Article, ArticleService} from '@ss/master-data/api-article';
import { CommonModule } from "@angular/common";



import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { PurchaseContractService } from "../purchase-contract.service";
import { ContractArticleMainComponent } from "../contract-article-main/contract-article-main.component";
import { AppArchiveMainComponent } from '@ss/common/app-archive';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-purchase-contract-detail',
    templateUrl: './purchase-contract-detail.component.html',
    styleUrls: ['./purchase-contract-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule,
        ContractArticleMainComponent,
        AppArchiveMainComponent
    ]
})
export class PurchaseContractDetailComponent extends BaseEntityDetailComponent<Project> {
    private wilayaSrv = inject(WilayaService);
    private loginSrv = inject(LoginService);
    private supplierSrv = inject(SupplierService);
    private typeSrv = inject(ProjectTypeService);
    private motiveSrv = inject(ProjectMotiveService);
    private awardSrv = inject(AwardProcedureService);
    private articleSrv = inject(ArticleService);
    private contractArticleSrv = inject(ContractArticleService);
    shownPanel: string = null;
    supplierLookupModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    typeLookup    = new DefaultAutoCompleteModel(this.typeSrv);
    awardLookup   = new DefaultAutoCompleteModel(this.awardSrv);
    wilayaLookup   = new DefaultAutoCompleteModel(this.wilayaSrv);
    articles: Article[] = [];

    constructor(
        public override entitySrv: PurchaseContractService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        private  router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_CONTRACTS');
        // this.articleLookup.onObjectSelected = (a) => this.onArticle(a);
    }

    public override setupForm(b: Project) {
        const today = new Date();
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
            salesPurchase:  [2],
            wilaya:         [b.wilaya],
            fiscalId:       [b.fiscalId]
        });
    }

    override readForm(): Project {
        const value = this.form.getRawValue() as Project;
        // this.entitySrv.setParentId(value.customer | 0);
        return value;
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        if (panel.expanded)
            return 'b-primary-expansion-panel'
        else
            return '';
    }

    panelOpened(panel: string) {
        this.shownPanel = panel;
        const next = '/app/contracts/purchase-contracts/' + this.id + '/' + panel;
        this.router.navigate([next]).then();
    }

    override ngOnInit() {
        if (this.entitySrv.getParentId()) {
            super.ngOnInit();
        } else {
            this.router.navigate(['../'], { relativeTo: this.route }).then();
        }
    }

}
