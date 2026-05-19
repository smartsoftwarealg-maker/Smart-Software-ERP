import { Component, ViewChild } from '@angular/core';
import {
    KeepOnToolbar,
    ShellService,
    SnackBarService,
    ToolbarButton,
} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    UntypedFormBuilder,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { BaseTransactionDetailComponent } from '@ss/logistics/api-transaction';
import { MatDialog } from '@angular/material/dialog';
import { InventoryImportComponent } from '@ss/logistics/ui-doc-import';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProductionRecyclingService } from '../production-recycling-services/production-recycling.service';
import { ProductionRecyclingLinesService } from '../production-recycling-services/production-recycling-lines.service';
import { ProductionRecyclingLinesListComponent } from '../production-recycling-lines-list/production-recycling-lines-list.component';

@Component({
    selector: 'ss-production-recycling-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    templateUrl: './production-recycling-detail.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        DatePickerComponent,
        UiAutoCompleteComponent,
        MatError,
        CdkTextareaAutosize,
        RouterOutlet,
    ],
})
export class ProductionRecyclingDetailComponent extends BaseTransactionDetailComponent {
    @ViewChild(ProductionRecyclingLinesListComponent)
    _detail: ProductionRecyclingLinesListComponent;
    private invImportBtn: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-file-import',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'COMMON_LOAD_EXCEL',
        visible: true,
        click: () => this.importInventoryDocument(),
    };

    constructor(
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog,
        public inventoryService: ProductionRecyclingService,
        public override detailSrv: ProductionRecyclingLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            inventoryService,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'PROD_PRODUCTION_RECYCLING',
        );
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.invImportBtn);
    }

    private importInventoryDocument() {
        if (!this.invImportBtn.disabled) {
            const id = this.form.controls['id']?.value;
            const dialogRef = this.dialog.open(InventoryImportComponent, {
                width: '650px',
                height: '380px',
                disableClose: true,
                data: {
                    transactId: id,
                },
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result && result['count']) {
                    this.snackBarSrv.showMessage('COMMON_SUCCESS');
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
                this._detail?.loadDetailLines().subscribe();

                this.shellSrv.setLoading(false);
            });
        }
    }

    protected importedDocuments(): Lookup[] {
        return [];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return false;
    }
}
