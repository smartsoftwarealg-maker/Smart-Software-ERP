import { Component, OnInit } from '@angular/core';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {FormBuilder, Validators} from '@angular/forms';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LtmMatterService} from '../ltm-matter.service';
import {SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LTMLineMatter, LTMMatterTest} from '../ltm-api';
import {LtmTestService} from '../ltm-test.service';
import {LtmMatterTestService} from '../ltm-matter-test.service';
import {LtmPeriodicityService} from '../ltm-periodicity.service';

@Component({
    selector: 'ss-ltm-matter-test-detail',
    templateUrl: './ltm-matter-test-detail.component.html',
    styleUrls: ['../line-matter-detail/line-matter-detail.component.scss'],
})
export class LtmMatterTestDetailComponent implements OnInit {
    periodicityLookup = new DefaultAutoCompleteModel(this.periodicitySrv);
    testLookup = new DefaultAutoCompleteModel(this.testSrv);
    form = this.fb.group( {
        id:          [0],
        testId:      [0, Validators.required],
        parentId:    [0, Validators.required],
        minValue:    [0, Validators.required],
        maxValue:    [0, Validators.required],
        optValue:    [0, Validators.required],
        periodicity: [0, Validators.required]
    })

    constructor(private entitySrv: LtmMatterTestService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private testSrv: LtmTestService,
                private snackBarSrv: SnackBarService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private periodicitySrv: LtmPeriodicityService,
                private confirmationSrv: ConfirmationDialogService) {}

    ngOnInit(): void {
        this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(params => this.form.controls.parentId.setValue(+(params.get('id')||'0'))),
                switchMap(_ => this.route.paramMap),
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
            });
    }

    save() {
        this.entitySrv
            .save(this.form.getRawValue())
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    this.router.navigate(['../../'], { relativeTo: this.activatedRoute});
                }
            });
    }

    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../../'], { relativeTo: this.activatedRoute});
            }
        });
    }
}
