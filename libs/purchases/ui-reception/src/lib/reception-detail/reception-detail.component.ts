import { Component, inject, OnInit } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    BaseTransactionDetailComponent,
    BaseTransactionLinesListComponent,
    Transaction,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import { ReceptionService } from '@ss/purchases/api-reception';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { ReceptionLinesService } from '../reception-lines.service';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ExtraCostService } from '@ss/purchases/extra-costs';
import { Observable, of, switchMap } from 'rxjs';


@Component({
    selector: 'ss-reception-detail',
    templateUrl: './reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        RouterOutlet,
        UiAutoCompleteComponent
    ]
})
export class ReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private extraCostSrv = inject(ExtraCostService);
    private URLs = ['./lines-list', './extra-costs'];
    private costSrv = inject(ExtraCostService);

    private importContractBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-file-arrow-up',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_CONTRACT',
        visible: true,
        click: () => this.importContract(),
    };

    constructor(
        public override entitySrv: ReceptionService,
        public override detailSrv: ReceptionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected readonly loginSrv: LoginService,
        protected dialog: MatDialog) {
        super(entitySrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'STOCK_EDIT_RECEPTION');
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importContractBtn);
        this.currencySrv.load().subscribe();
    }

    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 2, description: 'LOGISTICS_PURCHASE_ORDER' }];
    }

    override finishLoading(e: Transaction) {
        this.costSrv.setParentId(e?.id);
        super.finishLoading(e);
    }

    onTabChange(idx: number) {
        if (this.saveButton.visible) {
            this.router.navigate([this.URLs[idx]], { relativeTo: this.route }).then();
        }
    }


    private importContract() {
        if (!this.importContractBtn.disabled && this.form.controls['project'].value) {
            this.entitySrv
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
    loadEntity(id: number): Observable<Transaction> {
        this.extraCostSrv.setParentId(id||0);
        return super.loadEntity(id);
    }
}
