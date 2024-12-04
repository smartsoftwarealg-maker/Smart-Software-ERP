import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ConsumptionService } from '@ss/stock/api-consumption';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    BaseTransactionDetailComponent,
    DOC_RESERVATION
} from '@ss/logistics/api-transaction';
import { MatDialog } from '@angular/material/dialog';
import { ConsumptionLinesService } from '@ss/stock/api-consumption-lines';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';


@Component({
    selector: 'ss-consumption-detail',
    templateUrl: './consumption-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, DatePickerComponent, UiAutoCompleteComponent, MatError, CdkTextareaAutosize, RouterOutlet]
})
export class ConsumptionDetailComponent extends BaseTransactionDetailComponent {
    public groups: CCGroup[];

    constructor(
        public consumptionSrv: ConsumptionService,
        public override detailSrv: ConsumptionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog) {
        super(consumptionSrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'STOCK_EDIT_CONSUMPTION');
    }


    override preload(): Observable<CCGroup[]> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: DOC_RESERVATION, description: 'LOGISTICS_RESERVATION'}];
    }

    protected requireAgent(): boolean {
        return true;
    }

    protected requireAgentToImportDocument(): boolean {
        return false;
    }

    protected showImportButton(): boolean {
        return true;
    }
}
