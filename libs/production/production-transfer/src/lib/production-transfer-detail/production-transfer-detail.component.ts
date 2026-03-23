import { Component } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent,
    DOC_PRODUCTION,
    DOC_PRODUCTION_RESERVATION,
} from '@ss/logistics/api-transaction';
import { MatDialog } from '@angular/material/dialog';
import { MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProductionTransferLinesService } from '../production-services/production-transfer-lines.service';
import { ProductionTransferService } from '../production-services/production-transfer.service';
import { DocImportComponent } from '@ss/logistics/ui-doc-import';

@Component({
    selector: 'ss-product-transfer-detail',
    templateUrl: './production-transfer-detail.component.html',
    styleUrl: './production-transfer-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        DatePickerComponent,
        UiAutoCompleteComponent,
        MatError,
        TranslateDirective,
        CdkTextareaAutosize,
        RouterOutlet,
    ],
})
export class ProductionTransferDetailComponent extends BaseTransactionDetailComponent {
    protected reserveBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-lock',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.reserveForProduction(),
    };
    constructor(
        public orderService: ProductionTransferService,
        public override detailSrv: ProductionTransferLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override lookupsSrv: LookupsService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
    ) {
        super(
            orderService,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'PROD_PRODUCTION_TRANSFER',
        );
    }


    protected importedDocuments(): Lookup[] {
        return [
            {
                id: DOC_PRODUCTION,
                description: 'COMMON_PRODUCTION',
            },
        ];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return true;
    }

    private reserveForProduction() {
        const dialogRef = this.dialog.open(DocImportComponent, {
            width: '80%',
            height: '80%',
            maxWidth: '800px',
            data: {
                documentList: this.importedDocuments(),
                agentId: 0,
                destination: this.form.controls['document'].value,
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result['document'] && result['number']) {
                const document = result['document'];
                const number = result['number'];
                this.docImportService.transferAll(result['id'] || 0).subscribe({
                    next: () => {
                        this.executionRef++;
                        this.snackBarSrv.showMessage('COMMON_SUCCESS');
                    },
                    error: (err) => {
                        this.snackBarSrv.showMessage('COMMON_FAILURE', false);
                        throw err;
                    },
                });
            }
        });
    }
}
