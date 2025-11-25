import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {SocialAid, SocialWorksService} from '@social/social-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';

import {MutualAidService} from '../../../../social-api/src/lib/services/mutual-aid.service';
import {PaginationComponent} from '@ss/common/ui-pagination';
import {TranslateDirective} from '@ss/common/ui-lang';
import {RequestImportComponent} from "@ss/cmms/cmms-ui";
import {MatDialog} from "@angular/material/dialog";
import {ExcelInjectionComponent} from "../excel-injection-document/excel-injection.component";

@Component({
    selector: 'ss-mutual-works-list',
    standalone: true,
    imports: [CommonModule, TranslateDirective, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, PaginationComponent],
    templateUrl: './mutual-aids-list.component.html',
    styleUrl: '../../../../social-api/src/lib/aids.styles.scss',
})
export class MutualAidsListComponent extends BaseEntityListComponent<SocialAid> {
    protected dialog = inject(MatDialog);
    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    };

    displayedColumns = [
        // 'typeDescription',
        'number',
        'date',
        'firstName',
        'lastName',
        'mutualno',
        'amount'
    ]

    constructor(
        public override entitySrv: MutualAidService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'SOCIAL_MUTUAL_AIDS');
        this.pagination.pageSize = 15;
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
            const agentId = 0; //this.form.controls['agent'].value;
            const dialogRef = this.dialog.open(ExcelInjectionComponent, {
                width: '800px',
                height: '30%',
                maxWidth: '850px',
                data: {agentId: agentId}
            });

            dialogRef.afterClosed()
                .subscribe(result => {
                    this.refresh();
                });
        }
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importBtn);
    }
}
