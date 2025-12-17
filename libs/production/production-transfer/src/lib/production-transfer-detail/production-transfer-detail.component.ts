import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent,
    DOC_PRODUCTION_ORDER,
    Transaction,
} from '@ss/logistics/api-transaction';
import { MatDialog } from '@angular/material/dialog';
import { MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProductionService } from '../production-services/production.service';
import { ProductionLinesService } from '../production-services/production-lines.service';

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
    constructor(
        public orderService: ProductionService,
        public override detailSrv: ProductionLinesService,
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

    override setupForm(b: Transaction): FormGroup {
        this.purchaseProjectSrv.setParentId(b?.agent || 0);
        if (!b.id) {
            b.id = 0;
            b.number = 0;
            b.userID = this.loginSrv.appCtx.id;
            b.dealer = b.userID;
            b.date = new Date();
        }

        this.transaction = b;
        this.detailSrv.setParentId(b.id || 0);
        this.purchaseProjectSrv.setParentId(b.agent || 0);
        //this._isManager = this.loginSrv.appCtx.manager;
        this.formId = b.id || 0;

        this.isEditable = this.isEditable && !b.isValidated;
        this.saveButton.visible = this.saveButton.visible && !b.isValidated;
        this.detailSrv.editable = this.isEditable;
        this.importBtn.disabled = b.id === 0;

        return this.formBuilder.group({
            id: [{ value: b.id, disabled: true }],
            document: [{ value: b.document || 0, disabled: true }],
            centerId: [
                { value: 0 || this.loginSrv.appCtx.center, disabled: true },
            ],
            date: [
                { value: b.date || new Date(), disabled: true },
                Validators.required,
            ],
            number: [{ value: b.number || 0, disabled: true }],
            reference: [{ value: b.reference, disabled: true }],
            referenceDocDate: [{ value: b.referenceDocDate, disabled: true }],
            header: [{ value: b.header, disabled: true }],
            footer: [{ value: b.footer, disabled: true }],
            dealer: [{ value: b.dealer, disabled: true }, Validators.required],
            agent: [{ value: b.agent, disabled: true }],
            altAgent: [{ value: b.altAgent, disabled: true }],
            project: [{ value: b.project, disabled: true }],
            locked: [
                { value: b.locked || false, disabled: true },
                Validators.required,
            ],
            dirty: [
                { value: !b.dirty || false, disabled: true },
                Validators.required,
            ],
            license: [{ value: b.license, disabled: true }],
            licenseDate: [{ value: b.licenseDate, disabled: true }],
            licenseIssuer: [{ value: b.licenseIssuer, disabled: true }],
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }

    protected importedDocuments(): Lookup[] {
        return [
            { id: DOC_PRODUCTION_ORDER, description: 'PROD_PRODUCTION_ORDER' },
        ];
    }

    protected requireAgent(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected showImportButton(): boolean {
        return true;
    }
}
