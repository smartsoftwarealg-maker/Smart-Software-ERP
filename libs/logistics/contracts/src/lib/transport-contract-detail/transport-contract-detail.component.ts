import { Component, inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Project} from '../contract-api.class';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { AwardProcedureService, LookupsService, ProjectMotiveService, WilayaService } from "@ss/common/api-lookup";
import {SalesContractService} from '../sales-contract.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {AgentService, SupplierService, TransporterService} from "@ss/logistics/api-agent";
import {ProjectTypeService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import {MatExpansionPanel} from '@angular/material/expansion';
import {ContractArticleService} from '../contract-article.service';
import {Article, ArticleService} from '@ss/master-data/api-article';




import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { PurchaseContractService } from "../purchase-contract.service";
import { ContractArticleMainComponent } from "../contract-article-main/contract-article-main.component";
import {AppArchiveMainComponent, CONTRACT_ARCHIVES} from '@ss/common/app-archive';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {TransportContractService} from "../transport-contract.service";

@Component({
    selector: 'ss-purchase-contract-detail',
    templateUrl: './transport-contract-detail.component.html',
    styleUrls: ['./transport-contract-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    DatePickerComponent,
    RouterModule,
    AppArchiveMainComponent,
    UiAutoCompleteComponent
]
})
export class TransportContractDetailComponent extends BaseEntityDetailComponent<Project> {
    private wilayaSrv = inject(WilayaService);
    private loginSrv = inject(LoginService);
    private transporterSrv = inject(TransporterService);
    private typeSrv = inject(ProjectTypeService);
    private awardSrv = inject(AwardProcedureService);
    protected readonly CONTRACT_ARCHIVES = CONTRACT_ARCHIVES;
    transporterLookup = new DefaultAutoCompleteModel(this.transporterSrv, 'id', 'denomination');
    typeLookup    = new DefaultAutoCompleteModel(this.typeSrv);
    awardLookup   = new DefaultAutoCompleteModel(this.awardSrv);
    wilayaLookup   = new DefaultAutoCompleteModel(this.wilayaSrv);
    articles: Article[] = [];

    constructor(
        public override entitySrv: TransportContractService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        private  router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_TRANSPORT_CONVENTIONS');
        this.entitySrv.setParentId(this.entitySrv.getParentId() || 0);
        this.transporterLookup.onObjectSelected = e => this.entitySrv.setParentId(e.id || 0);
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
            salesPurchase:  [2],
            wilaya:         [b.wilaya],
            fiscalId:       [b.fiscalId],
            isBlocked:      [b.isBlocked||false]
        });
    }
}
