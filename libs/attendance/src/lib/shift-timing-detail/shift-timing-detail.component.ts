import { Component, inject } from "@angular/core";
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ShiftTimingService } from '../shift-timing.service';
import { Timing } from '../attendance-api';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslatePipe, TranslateDirective } from '@ss/common/ui-lang';
import {
    dateTimeToStr,
    dateTimeToTime,
    isString,
    MaterialModule,
    strToDateTime
} from '@ss/common/api-common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-shift-timing-detail',
    templateUrl: './shift-timing-detail.component.html',
    styleUrls: ['./shift-timing-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MaterialModule,
        MatCardHeader,
        MatMiniFabButton,
        MatTooltip,
        TranslateDirective,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        DatePickerComponent,
        MatError,
        TranslatePipe
    ]
})
export class ShiftTimingDetailComponent extends BaseChildEntityDetailComponent<Timing> {

    // private entitySrv = inject(ShiftTimingService);
    // private route = inject(ActivatedRoute);
    // private router = inject(Router);
    // private snackBarSrv = inject(SnackBarService);
    // private activatedRoute = inject(ActivatedRoute);
    // private confirmationSrv = inject(ConfirmationDialogService);
    private fb = inject(FormBuilder);
    // form = this.fb.group({
    //     id:        [0],
    //     parentId:  [this.entitySrv.getParentId(), Validators.required],
    //     from:      [new Date(),                   Validators.required],
    //     to:        [new Date(),                   Validators.required],
    //     breakFrom: [new Date()],
    //     breakTo:   [new Date()],
    // });
    constructor(protected override entitySrv: ShiftTimingService) {
        super(entitySrv, 'LTMTestSchedule');
        this.EMPTY_RECORD = {
            id:        0,
            parentId:  this.entitySrv.getParentId(),
            from:      strToDateTime('08:00'),
            to:        strToDateTime('16:00'),
            breakFrom: null,
            breakTo:   null
        }
    }

    // override idParamMap(): Observable<ParamMap> {
    //     return this.entitySrv
    //         .getList(0, 1, null, '-id')
    //         .pipe(tap(res => {
    //                 if (res.itemCount > 0) {
    //                     const tmg = res.body[0];
    //                     tmg.id = 0;
    //                     this.EMPTY_RECORD = tmg;
    //                 }
    //             }),
    //             switchMap(() => super.idParamMap()));
    // }

    // override ngOnInit(): void {
    //     super.ngOnInit();
    //
    //     this.route
    //         .parent
    //         .parent
    //         .paramMap
    //         .pipe(
    //             tap(params => this.form.controls.parentId.setValue(+(params.get('id') || '0'))),
    //             switchMap(_ => this.route.paramMap),
    //             switchMap(params => {
    //                 const id = +(params.get('id') || '0');
    //                 return id > 0 ? this.entitySrv.get(id) : lastEntry;
    //             }))
    //         .subscribe(timing => {
    //             console.log('______________________timing', timing);
    //             this.form.controls.id.setValue(timing.id);
    //             this.form.controls.parentId.setValue(timing.parentId);
    //             this.form.controls.from.setValue(timing.from);
    //             this.form.controls.to.setValue(timing.to);
    //             this.form.controls.breakFrom.setValue(timing.breakFrom);
    //             this.form.controls.breakTo.setValue(timing.breakTo);
    //         });
    // }

    override setupForm(e: Timing): UntypedFormGroup {
        const form = this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId||this.entitySrv.getParentId(), Validators.required],
            from:      [this.toDate(e.from),                 Validators.required],
            to:        [this.toDate(e.to),                   Validators.required],
            breakFrom: [this.toDate(e.breakFrom)],
            breakTo:   [this.toDate(e.breakTo)],
            date:      [e.date]
        });
        if (e.id === 0) {
            this.entitySrv
                .getList(0, 1, null, '-id')
                .subscribe(res => {
                    if (res.itemCount > 0) {
                        const tmg = res.body[0];
                        tmg.id = 0;
                        form.controls.from.setValue(tmg.from as unknown as string);
                        form.controls.to.setValue(tmg.to as unknown as string);
                        form.controls.breakFrom.setValue(tmg.breakFrom as unknown as string);
                        form.controls.breakTo.setValue(tmg.breakTo as unknown as string);
                    }
                });
        }
        return form;
    }

    private toDate(val: string | Date) {
        if (val == null) {
            return null;
        }
        let date: Date;
        if (isString(val)) {
            date = strToDateTime(val as string);
        } else {
            date = val as Date;
        }
        return dateTimeToStr(date);
    }

    // save() {
    //     const value = this.form.getRawValue();
    //     value.from = this.toDate(value.from);
    //     value.to = this.toDate(value.to);
    //     value.breakFrom = this.toDate(value.breakFrom);
    //     value.breakTo = this.toDate(value.breakTo);
    //     this.entitySrv
    //         .save(value)
    //         .subscribe(res => {
    //             if (res) {
    //                 this.snackBarSrv.showSuccessMessage();
    //                 this.router.navigate(['../../'], {relativeTo: this.activatedRoute}).then();
    //             }
    //         });
    // }
    //
    // cancel() {
    //     const obs = this.form.dirty ?
    //         this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
    //         of(true);
    //     obs.subscribe(res => {
    //         if (res) {
    //             this.router.navigate(['../../'], {relativeTo: this.activatedRoute}).then();
    //         }
    //     });
    // }


    override readForm(): Timing {
        const value = super.readForm();
        value.from = this.toDate(value.from) as unknown as Date;
        value.to = this.toDate(value.to) as unknown as Date;
        value.breakFrom = this.toDate(value.breakFrom) as unknown as Date;
        value.breakTo = this.toDate(value.breakTo) as unknown as Date;
        value.date = value.date||new Date();
        return value;
    }

}
