import { Component, inject, OnInit } from '@angular/core';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {SnackBarService} from '@ss/common/ui-shell';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LTMMatterTest} from '../ltm-api';
import {LtmTestService} from '../services/ltm-test.service';
import {LtmMatterTestService} from '../services/ltm-matter-test.service';
import {LtmPeriodicityService} from '../services/ltm-periodicity.service';
import { CommonModule } from "@angular/common";
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";

import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";

@Component({
    selector: 'ss-ltm-matter-test-detail',
    templateUrl: './ltm-matter-test-detail.component.html',
    styleUrls: ['../line-matter-detail/line-matter-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,

        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmMatterTestDetailComponent implements OnInit {
    private loginSrv = inject(LoginService);
    private testSrv = inject(LtmTestService);
    private fb = inject(FormBuilder);
    private activatedRoute = inject(ActivatedRoute);
    private periodicitySrv = inject(LtmPeriodicityService);
    private confirmationSrv = inject(ConfirmationDialogService);

    periodicityLookup = new DefaultAutoCompleteModel(this.periodicitySrv);
    testLookup = new DefaultAutoCompleteModel(this.testSrv);
    form = this.fb.group( {
        id:          [0],
        testId:      [0,    Validators.required],
        parentId:    [0,    Validators.required],
        minValue:    [0,    Validators.required],
        maxValue:    [0,    Validators.required],
        normMin:     [0],
        normMax:     [0],
        optValue:    [0,    Validators.required],
        periodicity: [0,    Validators.required],
        orderNo:     [0,    Validators.required],
        centerId:    [this.loginSrv.appCtx.center]
    });

    constructor(private entitySrv: LtmMatterTestService,
                private route: ActivatedRoute,
                private snackBarSrv: SnackBarService,
                private router: Router) {}

    ngOnInit(): void {
        this.route
            .paramMap
            .pipe(
                switchMap(params => {
                    const id = +(params.get('id')||'0');
                    return id > 0? this.entitySrv.get(id) : of(<LTMMatterTest> { id: 0, parentId: this.form.controls.parentId.value, testId: 0, minValue: 0, optValue: 0, maxValue: 0});
                }))
            .subscribe(matter => {
                this.form.controls.id.setValue(matter.id);
                this.form.controls.testId.setValue(matter.testId);
                this.form.controls.periodicity.setValue(matter.periodicity);
                this.form.controls.minValue.setValue(matter.minValue);
                this.form.controls.optValue.setValue(matter.optValue);
                this.form.controls.maxValue.setValue(matter.maxValue);
                this.form.controls.orderNo.setValue(matter.orderNo);
                this.form.controls.parentId.setValue(this.entitySrv.getParentId());
                this.form.controls.normMin.setValue(matter.normMin);
                this.form.controls.normMax.setValue(matter.normMax);
                this.form.controls.centerId.setValue(matter.centerId || this.loginSrv.appCtx.center);
            });
    }

    save() {
        console.log(this.form.getRawValue())
        this.entitySrv
            .save(this.form.getRawValue())
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    this.router.navigate(['../../'], { relativeTo: this.activatedRoute}).then();
                }
            });
    }

    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../../'], { relativeTo: this.activatedRoute}).then();
            }
        });
    }
}
