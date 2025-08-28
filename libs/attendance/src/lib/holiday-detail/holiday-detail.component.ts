import { Component } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Holiday } from '../attendance-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    UntypedFormBuilder,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HolidayService } from '../holiday.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import {MaterialModule} from "@ss/common/api-common";

@Component({
    selector: 'ss-holiday-detail',
    templateUrl: './holiday-detail.component.html',
    styleUrls: ['./holiday-detail.component.scss'],
    standalone: true,
    imports: [
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateDirective,
    MatInput,
    DatePickerComponent,
    MatError,
    MaterialModule
],
})
export class HolidayDetailComponent extends BaseEntityDetailComponent<Holiday> {
    constructor(
        public override entitySrv: HolidayService,
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
            'ATT_MACHINES',
        );
    }

    public override setupForm(b: Holiday) {
        return this.formBuilder.group({
            id: [b.id],
            date: [b.date, Validators.required],
            description: [b.description],
        });
    }
}
