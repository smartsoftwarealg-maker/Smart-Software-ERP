import { Component } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CCGroup, Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { Observable, of, switchMap } from 'rxjs';
import {tap} from 'rxjs/operators';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent, BaseTransactionLinesListComponent, DOC_SUPPLIER_QUOTATION,
    Transaction
} from '@ss/logistics/api-transaction';
import { ProductionOrderService } from '../production-order-services/production-order.service';
import { MatDialog} from '@angular/material/dialog';
import { ProductionOrderLinesService } from '../production-order-services/production-order-lines.service';
import { Project } from '@ss/logistics/contracts';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { NgIf } from '@angular/common';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-product-order-detail',
    templateUrl: './production-order-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, NgIf, MatError, MatTabGroup, MatTab, MatTabLabel, CdkTextareaAutosize, RouterOutlet]
})
export class ProductionOrderDetailComponent extends BaseTransactionDetailComponent {

    private importContractBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-file-arrow-up',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_CONTRACT',
        visible: true,
        click: () => this.importContract(),
    };

    constructor(public orderService: ProductionOrderService,
                public override detailSrv: ProductionOrderLinesService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override formBuilder: UntypedFormBuilder,
                public override confirmationSrv: ConfirmationDialogService,
                public override lookupsSrv: LookupsService,
                protected override loginSrv: LoginService,
                protected override dialog: MatDialog) {
        super(orderService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'PRODUCTIONS_EDIT_ORDER');
        this.purchaseProjectLookup.onObjectSelected = e => this.onProject(e);
    }

    override setupForm(b: Transaction): FormGroup {
        this.purchaseProjectSrv.setParentId(b?.agent || 0);
        return super.setupForm(b);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
        this.shellSrv.addButton(this.importContractBtn);
    }

    private importContract() {
        if (!this.importContractBtn.disabled && this.form.controls['project'].value) {
            this.orderService
                .consumeContract(this.id)
                .pipe(switchMap(() =>
                    this.outlet?.component instanceof BaseTransactionLinesListComponent?
                        this.outlet?.component.loadDetailLines() : of(0)))
                .subscribe(() => {
                    this.executionRef++;
                    this.shellSrv.setLoading(false);
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }

    protected importedDocuments(): Lookup[] {
        return [
            { id: DOC_SUPPLIER_QUOTATION, description: 'PRODUCTIONS_QUOTATION'}
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

    override finishLoading(e: Transaction) {
        super.finishLoading(e);
        this.importContractBtn.disabled = !e.project;
    }

    private onProject(p: Project) {
        this.importContractBtn.disabled = !p?.id;
    }
}
