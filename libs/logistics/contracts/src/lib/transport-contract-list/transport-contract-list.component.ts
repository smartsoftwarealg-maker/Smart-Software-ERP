import { Component, inject, OnInit } from "@angular/core";
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Project} from '../contract-api.class';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {Agent, TransporterService} from "@ss/logistics/api-agent";
import { CommonModule } from '@angular/common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import {TransportContractService} from "@ss/logistics/contracts";

@Component({
    selector: 'ss-transport-contract-list',
    templateUrl: './transport-contract-list.component.html',
    styleUrls: ['./transport-contract-list.component.scss'],
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
export class TransportContractListComponent extends BaseEntityListComponent<Project> {
    #agentSrv = inject(TransporterService);

    transporterId     = new FormControl<number>(0);
    agentLookup = new DefaultAutoCompleteModel(this.#agentSrv, 'id', 'denomination');
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
        public override entitySrv: TransportContractService,
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
            'LOGISTICS_TRANSPORT_CONVENTION');
        this.entitySrv.setParentId(this.entitySrv.getParentId() || 0);
        this.agentLookup.onObjectSelected = a => this.onCustomer(a);
    }

    private onCustomer(a: Agent) {
        const id = a?.id | 0;
        this.entitySrv.setParentId(id);
        this.entitySrv.selectedId = id;
        this.refresh();
    }

    override ngOnInit() {
        super.ngOnInit();
        this.transporterId.setValue(this.entitySrv.getParentId()||0);
        this.entitySrv.setParentId(this.entitySrv.getParentId() || 0);
        this.refresh();
    }
}
