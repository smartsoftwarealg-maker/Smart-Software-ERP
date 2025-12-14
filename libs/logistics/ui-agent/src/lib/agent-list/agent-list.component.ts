import {Component, inject} from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {
    Agent,
    AGENT_URL,
    AgentService,
    BRANCH_URL,
    CUSTOMER_URL,
    INTERNAL_URL,
    SUPPLIER_URL,
    TRANSPORTER_URL
} from '@ss/logistics/api-agent';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { IsParamService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-agent-list',
    styleUrls: ['./agent-list.component.scss'],
    templateUrl: './agent-list.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        TranslateDirective,
        DocInfoComponent,
        PaginationComponent,
    ],
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

    private isAQS = false;
    private DEF_COLUMNS = [
        'starred',
        'customerCode',
        'denomination',
        'typeDescription',
        'address',
    ];

    private AQS_COLUMNS = [
        'starred',
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
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            agentService,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_AGENTS',
        );
        this.pagination.pageSize = this.isSales ? 10 : 15;
        this.isSales = this.route.snapshot?.data['sales'] || false;
        this.isAsset = this.route.snapshot?.data['assets'] || false;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.agentService.activeOnly = true;
        this.shellSrv.addButton(this.#activeOnlyBtn);
    }

    override preload(): Observable<any> {
        return this.isParamSrv.is('AQS').pipe(
            tap((b: boolean) => {
                this.isAQS = b;
                this.displayedColumns = this.isAQS
                    ? this.AQS_COLUMNS
                    : this.DEF_COLUMNS;
            }),
            switchMap(() => this.route.data),
            tap((res) => {
                const URLs = [
                    CUSTOMER_URL,
                    SUPPLIER_URL,
                    TRANSPORTER_URL,
                    BRANCH_URL,
                    INTERNAL_URL,
                    AGENT_URL,
                ];
                const TTLs = [
                    'LOGISTICS_CUSTOMER',
                    'LOGISTICS_SUPPLIER',
                    'LOGISTICS_TRANSPORTER',
                    'COMMON_UNITS',
                    'LOGISTICS_INTERNAL_AGENTS',
                    'COMMON_AGENTS',
                ];

                const idx = res['customer']
                    ? 0
                    : res['supplier']
                      ? 1
                      : res['transporter']
                        ? 2
                        : res['unit']
                          ? 3
                          : res['internalAgent']
                            ? 4
                            : 5;

                this.agentService.setURL(URLs[idx]);
                this.shellSrv.setTitle(TTLs[idx]);
            }),
        );
    }

    private toggleActivity() {
        this.agentService.toggle();
        this.#activeOnlyBtn.label = this.agentService.activeOnly
            ? 'COMMON_SHOW_ALL'
            : 'COMMON_SHOW_ACTIVE_ONLY';
        this.#activeOnlyBtn.icon = this.agentService.activeOnly
            ? 'fa-solid fa-toggle-on'
            : 'fa-solid fa-toggle-off';
        this.refresh();
    }

    star(id: number, starred: boolean) {
        if (this.editable) {
            this.data
                .filter((i) => i.id === id)
                .forEach((i) => {
                    i.starred = starred;
                    this.entitySrv
                        .update(i)
                        .subscribe(() => (i.starred = starred));
                });
        }
    }
}
