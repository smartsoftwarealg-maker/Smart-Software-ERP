import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent, Transaction
} from '@ss/logistics/api-transaction';
import { ProductionFormulasService } from '../production-formulas-services/production-formulas.service';
import { MatDialog} from '@angular/material/dialog';
import { ProductionFormulasLinesService } from '../production-formulas-services/production-formulas-lines.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-production-formula-detail',
    templateUrl: './production-formulas-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, MatError, CdkTextareaAutosize, RouterOutlet]
})
export class ProductionFormulasDetailComponent extends BaseTransactionDetailComponent {


    constructor(public orderService: ProductionFormulasService,
                public override detailSrv: ProductionFormulasLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public override lookupsSrv: LookupsService,
                protected override loginSrv: LoginService,
                protected override dialog: MatDialog) {
        super(orderService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PROD_PRODUCTION_FORMULAS');
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

        this.detailSrv.setParentId(b.id || 0);
        this.purchaseProjectSrv.setParentId(b.agent || 0);
        //this._isManager = this.loginSrv.appCtx.manager;
        this.formId = b.id || 0;

        this.isEditable = this.isEditable && !b.isValidated;
        this.saveButton.visible = this.saveButton.visible && !b.isValidated;
        this.detailSrv.editable = this.isEditable;
        return this.formBuilder.group({
            id: [b.id],
            document: [b.document || 0],
            centerId: [0 || this.loginSrv.appCtx.center],
            date: [b.date || new Date(), Validators.required],
            number: [b.number || 0],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            dealer: [b.dealer, Validators.required],
            agent: [b.agent],
            altAgent: [b.altAgent],
            project: [b.project],
            locked: [b.locked || false, Validators.required],
            dirty: [!b.dirty || false, Validators.required],
            license: [b.license],
            licenseDate: [b.licenseDate],
            licenseIssuer: [b.licenseIssuer],
        });
    }



    protected importedDocuments(): Lookup[] {
        return [
        ];
    }

    protected requireAgent(): boolean {
        return false;
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected showImportButton(): boolean {
        return false;
    }
}
