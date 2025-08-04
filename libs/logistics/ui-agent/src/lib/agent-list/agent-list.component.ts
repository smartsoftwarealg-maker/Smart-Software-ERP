import { Component, inject } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Agent, AGENT_URL, AgentService, CUSTOMER_URL, SUPPLIER_URL, TRANSPORTER_URL } from '@ss/logistics/api-agent';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { IsParamService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-agent-list',
    styleUrls: ['./agent-list.component.scss'],
    templateUrl: './agent-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        TranslateDirective,
        DocInfoComponent,
        PaginationComponent
    ]
})
export class AgentListComponent extends BaseEntityListComponent<Agent> {
    #activeOnlyBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-toggle-off',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'COMMON_SHOW_ALL',
        visible: true,
        click: () => this.toggleActivity(),
    };

    private isParamSrv = inject(IsParamService);

    private isAQS       = false;
    private DEF_COLUMNS = [
        'customerCode',
        'denomination',
        'typeDescription',
        'address'
    ];

    private AQS_COLUMNS = [
        'customerCode',
        'denomination',
        'typeDescription',
        'address',
        'activityDescription',
        'departmentName',
    ];

    isSales = false;
    isAsset = false;


    displayedColumns = this.DEF_COLUMNS;

    constructor(
        public agentService: AgentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(agentService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_AGENTS');
        this.pagination.pageSize = this.isSales? 10 : 15;
        this.isSales = this.route.snapshot?.data['sales']  || false;
        this.isAsset = this.route.snapshot?.data['assets'] || false;
    }

    ngOnInit() {
        super.ngOnInit();
        this.agentService.activeOnly = true;
        this.shellSrv.addButton(this.#activeOnlyBtn);
    }

    override preload(): Observable<any> {
        return this.isParamSrv
            .is('AQS')
            .pipe(tap((b: boolean) => {
                this.isAQS = b;
                this.displayedColumns = this.isAQS ? this.AQS_COLUMNS : this.DEF_COLUMNS;
            }),
            switchMap(() => this.route.data),
            tap(res => {
                const isSupplier = res['supplier'];
                const isCustomer = res['customer'];
                const isTransporter = res['transporter'];

                this.agentService.setURL(isCustomer? CUSTOMER_URL : isSupplier? SUPPLIER_URL : isTransporter? TRANSPORTER_URL : AGENT_URL);
                this.shellSrv.setTitle(isCustomer? 'LOGISTICS_CUSTOMER': isSupplier ? 'LOGISTICS_SUPPLIER' : isTransporter ? 'LOGISTICS_TRANSPORTER' : 'COMMON_AGENTS');
            }));
    }

    private toggleActivity() {
        this.agentService.toggle();
        this.#activeOnlyBtn.label = this.agentService.activeOnly ? 'COMMON_SHOW_ALL' : 'COMMON_SHOW_ACTIVE_ONLY';
        this.#activeOnlyBtn.icon = this.agentService.activeOnly ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';
        this.refresh();
    }
}
