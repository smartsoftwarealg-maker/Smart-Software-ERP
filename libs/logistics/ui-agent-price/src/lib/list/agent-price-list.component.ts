import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {AgentPrice, AgentPriceService} from "@ss/logistics/api-agent-price";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ss-agent-price-list',
    styleUrls: ['./agent-price-list.component.scss'],
    templateUrl: './agent-price-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

    ],
})
export class AgentPriceListComponent extends BaseEntityListComponent<AgentPrice> implements OnInit {


    displayedColumns = [
        'description',
        'descriptionAr'
    ];


    constructor(
        public agentPriceSrv: AgentPriceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(agentPriceSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'LOGISTICS_AGENT_PRICE');
    }

    public override ngOnInit() {
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();
    }
}
