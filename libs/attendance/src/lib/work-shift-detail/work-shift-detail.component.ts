import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {WorkShift} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {WorkshiftService} from '../workshift.service';
import {ShiftTimingService} from '../shift-timing.service';
import {filter} from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-work-shift-detail',
    templateUrl: './work-shift-detail.component.html',
    styleUrls: ['./work-shift-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError,
        DatePickerComponent,
        RouterOutlet,
    ],
})
export class WorkShiftDetailComponent extends BaseEntityDetailComponent<WorkShift> {
    constructor(
        public override entitySrv: WorkshiftService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private timingSrv: ShiftTimingService,
        private router: Router) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ATT_WORKSHIFTS');
    }


    public override setupForm(b: WorkShift) {
        this.timingSrv.setParentId(b?.id);
        this.timingSrv.startDate = b?.startDate;
        return this.formBuilder.group({
            id:          [b.id],
            startDate:   [b.startDate, Validators.required],
            graceTime:   [b.graceTime, Validators.required],
            description: [b.description],
            period:      [b.period||7, Validators.required],
        });
    }

    private disableControls(url: string) {
        const enabled = url.indexOf('/detail') < 0;
        this.saveButton.visible = enabled;
        this.shellSrv.setGoBackEnabled(enabled);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.disableControls(this.router.url);
        this.subscriptions.push(this.router.events
            .pipe(filter((e: any): e is RouterEvent => e instanceof RouterEvent))
            .subscribe((e: RouterEvent) => {
                this.saveButton.visible = e.url.indexOf('/detail') < 0;
            }));
    }
}
