import { Component, inject, OnInit } from '@angular/core';
import {
    BaseTransactionDetailComponent, Transaction, TransactionLinesService
} from '@ss/logistics/api-transaction';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { Lookup } from '@ss/common/api-lookup';
import { ImportReceptionService } from '../services/import-reception.service';
import { ExtraCostService } from '@ss/purchases/extra-costs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '../../../../../common/ui-datepicker/src/lib/date-picker.component';
import { UiAutoCompleteComponent } from '../../../../../common/ui-auto-complete/src/lib/auto-complete.component';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'ss-import-reception-detail',
    templateUrl: './import-reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss',
        './import-reception-detail.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, MatError, MatTabGroup, MatTab, MatTabLabel, CdkTextareaAutosize, RouterOutlet]
})
export class ImportReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private URLs = ['./lines-list', './costs-list'];
    private costSrv = inject(ExtraCostService);
    selectedIndex = 0;

    constructor(
        public receptionService: ImportReceptionService,
        public override shellSrv: ShellService,
        public override detailSrv: TransactionLinesService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override readonly loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(receptionService, detailSrv, shellSrv, snackBarSrv, route, router, formBuilder, confirmationSrv, loginSrv, dialog, 'STOCK_EDIT_RECEPTION');
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
        this.shellSrv.setGoBackFn(() => this.router.navigate(['/app/purchases/import-receptions']).then());
    }

    override finishLoading(e: Transaction) {
        this.costSrv.setParentId(e?.id);
        super.finishLoading(e);
    }


    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 2, description: 'LOGISTICS_PURCHASE_ORDER' }];
    }

    navigate(idx: number, url: string) {
        if (this.saveButton.visible) {
            this.selectedIndex = idx;
            this.router.navigate([url], { relativeTo: this.route }).then();
        }
    }

    onTabChange(idx: number) {
        if (this.saveButton.visible) {
            this.router.navigate([this.URLs[idx]], { relativeTo: this.route }).then();
        }
    }
}
