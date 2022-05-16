import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ACCFile, AccFileService} from '@ss/accounting/accounting-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'ss-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent extends BaseEntityListComponent<ACCFile> implements OnInit {
    accPeriod = new FormControl(1, [Validators.required, Validators.max(12), Validators.min(1)]);

    displayedColumns = [
        'description',
        'fileYear',
        'closed'
    ];

    constructor(
        public override entitySrv: AccFileService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private loginSrv: LoginService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ACC_FILE_SELECTOR');
        this.pagination.pageSize = 10;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.editButton.visible = false;
        this.addButton.visible = false;
        this.deleteButton.visible = false;

        const selectButton: ToolbarButton = {
            icon: 'fa-solid fa-check',
            label: 'ACC_SELECT_FOLDER',
            disabled: false,
            visible: true,
            keepOnToolbar: KeepOnToolbar.DYNAMIC,
            click: () => {
                this.selectFolder();
            }
        };
        this.shellSrv.addButton(selectButton);
        this.shellSrv.updateShell();
        this.accPeriod.setValue(this.loginSrv.appCtx.accPeriod || 1);
        this.shellSrv.setGoBackPath('..', this.route);
    }

    selectFolder() {
        this.entitySrv
            .selectFolder(this.selectedRow?.id || 0, this.selectedRow?.fileYear || 0, 1)
            .pipe(tap(ctx => this.loginSrv.updateCtx(ctx)))
            .subscribe(res => {
                if (this.selectedRow) {
                    this.shellSrv.setLabels([{ title: `${this.selectedRow.description}` }]);
                }
                this.snackBarSrv.showSuccessMessage();
                this.shellSrv.goBack();
            })
    }

    override finishLoading(data: ACCFile[]) {
        super.finishLoading(data);
        this.selected = data.find(e => e.fileYear === this.loginSrv.appCtx.accYear)?.id;
    }
}
