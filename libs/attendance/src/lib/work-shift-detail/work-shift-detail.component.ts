import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {WorkShift} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router, RouterEvent} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {WorkshiftService} from '../workshift.service';
import {ShiftTimingService} from '../shift-timing.service';
import {filter} from 'rxjs';

@Component({
    selector: 'ss-work-shift-detail',
    templateUrl: './work-shift-detail.component.html',
    styleUrls: ['./work-shift-detail.component.scss'],
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
