import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    MaterialModule,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { Transaction } from '@ss/logistics/api-transaction';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ReceptionService } from '@ss/purchases/api-reception';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { TRANSPORTER } from '../../../../api-reception/src/lib/reception-api';
import { AgentService } from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-reception-list',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './reception-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective,
        DocInfoComponent,
        PaginationComponent,
    ],
})
export class ReceptionListComponent extends BaseEntityListComponent<Transaction> {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus',
    ];
    private agentSrv = inject(AgentService);

    constructor(
        public inventorySrv: ReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            inventorySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_RECEPTION',
        );
    }

    override selectRow(row: Transaction) {
        this.selectedRow = row;
        const id = row ? row.id || 0 : 0;
        this.select(id);
        this.agentSrv.get(row.agent).subscribe((agent) => {
            const itemControlsOn =
                this.selected != null &&
                this.selected > 0 &&
                agent.agentType != TRANSPORTER;
            this.editButton.disabled = !itemControlsOn;
            this.deleteButton.disabled = !itemControlsOn;
        });
    }

    override select(id: number): void {
        this.selected = id;
        if (id) {
            this.shellSrv.showToolbar(); // The toolbar can disappear when scrolling down
        }
        const itemControlsOn = this.selected != null && this.selected > 0;
        this.viewReportButton.disabled = !itemControlsOn;
        this.emailReportButton.disabled =
            !this.selectedRow || !itemControlsOn || !this.selectedRow['email'];
        this.shellSrv.updateShell();
    }
}
