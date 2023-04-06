import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ShiftTimingService} from '../shift-timing.service';
import {switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Timing} from '../attendance-api';
import {SnackBarService} from '@ss/common/ui-shell';

@Component({
    selector: 'ss-shift-timing-detail',
    templateUrl: './shift-timing-detail.component.html',
    styleUrls: ['./shift-timing-detail.component.scss'],
})
export class ShiftTimingDetailComponent implements OnInit {
    form = this.fb.group({
        id:        [0],
        parentId:  [this.entitySrv.getParentId(), Validators.required],
        from:      [new Date(),                   Validators.required],
        to:        [new Date(),                   Validators.required],
        breakFrom: [new Date()],
        breakTo:   [new Date()],
    });

    constructor(private fb: FormBuilder,
                private entitySrv: ShiftTimingService,
                private route: ActivatedRoute,
                private router: Router,
                private snackBarSrv: SnackBarService,
                private activatedRoute: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService) {
    }

    ngOnInit(): void {
        this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(params => this.form.controls.parentId.setValue(+(params.get('id') || '0'))),
                switchMap(_ => this.route.paramMap),
                switchMap(params => {
                    const id = +(params.get('id') || '0');
                    return id > 0 ? this.entitySrv.get(id) : of(<Timing>{
                        id:        0,
                        parentId:  this.entitySrv.getParentId(),
                        from:      new Date(),
                        to:        new Date(),
                        breakFrom: null,
                        breakTo:   null
                    });
                }))
            .subscribe(timing => {
                this.form.controls.id.setValue(timing.id);
                this.form.controls.parentId.setValue(timing.parentId);
                this.form.controls.from.setValue(timing.from);
                this.form.controls.to.setValue(timing.to);
                this.form.controls.breakFrom.setValue(timing.breakFrom);
                this.form.controls.breakTo.setValue(timing.breakTo);
            });
    }

    private toDate(str: any) {
        return str === null? null : new Date('01-01-2023 ' + str.toString() + ':00.000Z');
    }

    save() {
        const value = this.form.getRawValue();
        value.from = this.toDate(value.from);
        value.to = this.toDate(value.to);
        value.breakFrom = this.toDate(value.breakFrom);
        value.breakTo = this.toDate(value.breakTo);
        // console.log(value);
        this.entitySrv
            .save(value)
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    this.router.navigate(['../../'], {relativeTo: this.activatedRoute}).then();
                }
            });
    }

    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../../'], {relativeTo: this.activatedRoute}).then();
            }
        });
    }



}
