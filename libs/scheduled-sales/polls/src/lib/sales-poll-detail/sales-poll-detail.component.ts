import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { SalesPollService } from '../sales-poll.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';

import {
    MatError,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {
    MatRadioButton,
    MatRadioGroup,
    MatRadioModule,
} from '@angular/material/radio';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateDirective } from '@ss/common/ui-lang';
import { SalesPoll } from '@ss/scheduled-sales/api-scheduled-sales';

@Component({
    selector: 'sch-sales-polls-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MaterialModule,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslateDirective,
        DatePickerComponent,
    ],
    templateUrl: './sales-poll-detail.component.html',
    styleUrl: './sales-poll-detail.component.css',
})
export class SalesPollDetailComponent extends BaseEntityDetailComponent<SalesPoll> {
    private loginSrv = inject(LoginService);
    private salesPollSrv = inject(SalesPollService);

    constructor(
        public override entitySrv: SalesPollService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'SCH_SALE_POLL',
        );
    }

    public override setupForm(b: SalesPoll) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            centerId: [b.centerId || this.loginSrv.appCtx.center],
            number: [b.number],
            date: [b.date],
        });
    }


}
