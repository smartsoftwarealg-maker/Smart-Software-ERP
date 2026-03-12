import { Component, inject, OnInit } from "@angular/core";
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Project} from '../contract-api.class';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LanguageService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {SalesContractService} from '../sales-contract.service';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Agent, AgentLookupModel, AgentService, CustomerService } from "@ss/logistics/api-agent";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { CommonModule } from "@angular/common";



import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-sales-contract-list',
    templateUrl: './sales-contract-list.component.html',
    styleUrls: ['./sales-contract-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,

        ReactiveFormsModule,


        RouterModule,
        PaginationComponent,
        UiAutoCompleteComponent
    ]
})
export class SalesContractListComponent extends BaseEntityListComponent<Project> {
    private agentSrv = inject(CustomerService);
    agentId     = new FormControl<number>(0);
    agentLookup = new DefaultAutoCompleteModel(this.agentSrv, 'id', 'denomination');
    displayedColumns = [
        'contractNo',
        'projDate',
        'description',
        'customerName',
        'fromDate',
        'toDate',
        'wilaya'
    ];
    constructor(
        public override entitySrv: SalesContractService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_SALES_PROJECTS');
        this.entitySrv.setParentId(0);
        this.agentLookup.onObjectSelected = a => this.onCustomer(a);
    }

    private onCustomer(a: Agent) {
        const id = a?.id | 0;
        this.entitySrv.setParentId(id);
        this.entitySrv.selectedId.set(id);
        this.refresh();
    }

    override ngOnInit() {
        super.ngOnInit();
        // this.agentId.setValue(this.entitySrv.selectedId());
        // this.entitySrv.setParentId(this.entitySrv.selectedId());
        this.refresh();
    }
}
