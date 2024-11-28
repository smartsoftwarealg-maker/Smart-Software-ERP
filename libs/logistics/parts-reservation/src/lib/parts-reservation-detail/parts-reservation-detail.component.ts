import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTransactionDetailComponent } from '@ss/logistics/api-transaction';
import { CCGroup, Lookup } from '@ss/common/api-lookup';
import { ConsumptionLinesService } from '@ss/stock/api-consumption-lines';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReservationService } from '../services/reservation.service';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReservationLinesService } from "../services/reservation-lines.service";

@Component({
    selector: 'ss-parts-reservation-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiDatepickerModule,  MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterOutlet, TextFieldModule],
    templateUrl: './parts-reservation-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss']
})
export class PartsReservationDetailComponent extends BaseTransactionDetailComponent {
    public groups: CCGroup[];

    constructor(
        public override entitySrv: ReservationService,
        public override detailSrv: ReservationLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected override loginSrv: LoginService,
        protected override dialog: MatDialog) {
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
            'LOGISTICS_RESERVATION');
    }


    override preload(): Observable<CCGroup[]> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x));
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
