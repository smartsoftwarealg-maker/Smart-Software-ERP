import { Component, OnInit } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Lookup} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryService} from '@ss/stock/api-inventory';
import { BaseTransactionDetailComponent, Transaction } from '@ss/logistics/api-transaction';
import {LoginService} from '@ss/common/api-common';
import {InventoryImportComponent} from '@ss/logistics/ui-doc-import';
import {MatDialog} from '@angular/material/dialog';
import { InventoryLinesService } from '@ss/stock/api-inventory-lines';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-inventory-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './inventory-detail.component.html',
    standalone: true,
    imports: [MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, DatePickerComponent, UiAutoCompleteComponent, CdkTextareaAutosize, RouterOutlet]
})
export class InventoryDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private invImportBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importInventoryDocument(),
    };


    constructor(
        protected loginSrv: LoginService,
        protected dialog: MatDialog,
        public inventorySrv: InventoryService,
        public override detailSrv: InventoryLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(inventorySrv, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_EDIT_INVENTORY');
    }


    override setupForm(b: Transaction): UntypedFormGroup {
        if (b.id) {
            this.shellSrv.addButton(this.invImportBtn);
        }
        return super.setupForm(b);
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return false;
    }

    protected importedDocuments(): Lookup[] {
        return [];
    }

    protected requireAgent(): boolean {
        return false;
    }

    private importInventoryDocument() {
        if (!this.invImportBtn.disabled) {
            const id = this.form.controls['id']?.value;
            const dialogRef = this.dialog.open(InventoryImportComponent, {
                width: '650px',
                height: '380px',
                disableClose: true,
                data: {
                    transactId: id
                }
            });

            dialogRef
                .afterClosed()
                .subscribe(result => {
                    if (result && result['count']) {
                        this.snackBarSrv.showMessage('COMMON_SUCCESS');
                        this.executionRef++;
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                    this.shellSrv.setLoading(false);
                });
        }
    }
}
