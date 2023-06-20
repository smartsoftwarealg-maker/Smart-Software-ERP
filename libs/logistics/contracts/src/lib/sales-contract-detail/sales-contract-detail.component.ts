import { Component, inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Project} from '../contract-api.class';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { AwardProcedureService, LookupsService, ProjectMotiveService, WilayaService } from "@ss/common/api-lookup";
import {SalesContractService} from '../sales-contract.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AgentService} from '@ss/logistics/api-agent';
import {ProjectTypeService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {MatExpansionPanel} from '@angular/material/expansion';
import {ContractArticleService} from '../contract-article.service';
import {Article, ArticleService} from '@ss/stock/api-article';

@Component({
    selector: 'ss-sales-contract-detail',
    templateUrl: './sales-contract-detail.component.html',
    styleUrls: ['./sales-contract-detail.component.scss'],
})
export class SalesContractDetailComponent extends BaseEntityDetailComponent<Project> {
    private wilayaSrv = inject(WilayaService);
    private loginSrv = inject(LoginService);
    private customerSrv = inject(AgentService);
    private typeSrv = inject(ProjectTypeService);
    private motiveSrv = inject(ProjectMotiveService);
    private awardSrv = inject(AwardProcedureService);
    private articleSrv = inject(ArticleService);
    private contractArticleSrv = inject(ContractArticleService);
    shownPanel: string = null;
    customerLookupModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
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
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_PROJECTS');
        this.entitySrv.setParentId(0);
        // this.articleLookup.onObjectSelected = (a) => this.onArticle(a);
    }

    public override setupForm(b: Project) {
        const today = new Date();
        return this.formBuilder.group({
            id:             [b.id],
            centerId:       [b.centerId || this.loginSrv.appCtx.center, Validators.required],
            contractNo:     [b.contractNo, Validators.required],
            projDate:       [b.projDate, Validators.required],
            description:    [b.description, Validators.required],
            customer:       [b.customer, Validators.required],
            fromDate:       [b.fromDate  || today, Validators.required],
            toDate:         [b.toDate  || today, Validators.required],
            amount:         [b.amount || 0],
            advancePayment: [b.advancePayment || 0],
            advanceRate:    [b.advanceRate || 0],
            projType:       [b.projType],
            awardProcedure: [b.awardProcedure],
            projMotive:     [b.projMotive],
            wilaya:         [b.wilaya]
        });
    }

    override readForm(): Project {
        const value = this.form.getRawValue() as Project;
        this.entitySrv.setParentId(value.customer | 0);
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
        const next = '/app/contracts/contracts/' + this.id + '/' + panel;
        this.router.navigate([next]).then();
    }
}
