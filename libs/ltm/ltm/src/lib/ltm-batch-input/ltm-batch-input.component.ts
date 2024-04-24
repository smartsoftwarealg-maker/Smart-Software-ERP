import { Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild, viewChildren } from '@angular/core';
import { LTMBatch, LTMLineMatter, LTMTest, LTMTestingLine } from '../ltm-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LtmLineMatterService } from '../services/ltm-line-matter.service';
import { LtmMatterTestService } from '../services/ltm-matter-test.service';
import { LtmBatchService } from '../services/ltm-batch.service';
import { LtmPeriodicityService } from '../services/ltm-periodicity.service';
import { filter, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { LtmTestService } from '../services/ltm-test.service';
import { dateTimeToStr, dateToStr, dateToYmdStr, LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { LogisticsUiDocInfoModule } from '@ss/logistics/ui-doc-info';
import { AppArchiveModule } from '@ss/common/app-archive';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { LTMSiloService } from '../services/ltm-silo.service';
import { LtmMatterService } from '../services/ltm-matter.service';
import { LtmSampleLookupService } from '../services/ltm-sample-lookup.service';
import { ValidationError } from '@nx/angular/src/generators/ng-add/utilities';

function sampleNoValidatorFn(sampleMode: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationError | null => {
        return sampleMode && !control.value ? { message: 'COMMON_REQUIRED' } : null;
    };
}

@Component({
    selector: 'ss-ltm-batch-input',
    templateUrl: './ltm-batch-input.component.html',
    styleUrls: ['./ltm-batch-input.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        RouterLink
    ]
})
export class LtmBatchInputComponent implements OnInit, OnDestroy {
    private onRefresh = signal(false);
    private sampleLookupSrv = inject(LtmSampleLookupService);
    private soloSrv = inject(LTMSiloService);
    private entitySrv = inject(LtmBatchService);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private confirmationSrv = inject(ConfirmationDialogService);
    private lineMatterSrv = inject(LtmLineMatterService);
    private matterSrv = inject(LtmMatterService);
    private matterTestSrv = inject(LtmMatterTestService);
    private periodSrv = inject(LtmPeriodicityService);
    private testSrv = inject(LtmTestService);
    private shellSrv = inject(ShellService);
    private loginSrv = inject(LoginService);
    private subscriptions: Subscription[] = [];
    private TODAY = new Date();
    private formulaMap = new Map<string, string>();
    private missingVariables: string[] = [];
    private hour = viewChild<ElementRef>('hour');

    periodLookup = new DefaultAutoCompleteModel(this.periodSrv);
    siloLookup = new DefaultAutoCompleteModel(this.soloSrv);
    lineMatterLookup = new DefaultAutoCompleteModel(this.lineMatterSrv);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);
    sampleLookup = new DefaultAutoCompleteModel(this.sampleLookupSrv, 'description', 'description');
    lineTests: LTMTest[] = [];

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    public cancelButton: ToolbarButton = {
        icon: 'fa-solid fa-rotate-left',
        label: 'COMMON_CANCEL',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.cancel()
    };

    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DELETE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.delete()
    };
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.edit()
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: false,
        visible: false,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.edit()
    };

    labels: string[] = [];
    limits: number[][] = [];
    totalsLabels: string[] = [];
    totalsLimits: number[][] = [];
    variables: string[] = [];
    formulas: string[] = [];
    selectedPeriodicity = 0;

    formBuilder = inject(FormBuilder);
    searchForm = this.formBuilder.group({
        date:         [new Date()],
        lineMatterId: [0],
        matterId:     [0],
        sampleNo:     ['', [Validators.required]],
        period:       [0],
        hour:         [0],
        search:       ['']
    });

    form = this.formBuilder.group(
        {
            id:           [0],
            centerId:     [this.loginSrv.appCtx.center, Validators.required],
            parentId:     [{ value: 0, disabled: true }, Validators.required],
            timeStamp:    [{ value: this.TODAY, disabled: true }, Validators.required],
            sampleNo:     [{ value: null, disabled: false }],
            spoilageHour: [null],
            breakageHour: [null],
            silo:         [null],
            userId:       [this.loginSrv.appCtx.id],
            tests:        this.formBuilder.array([])
        }
    );

    totalsForm = this.formBuilder.group({ totals: this.formBuilder.array([]) });
    sampleMode = signal(false);
    editInProgress = signal(false);

    constructor() {
        this.TODAY.setHours(0, 0, 0, 0);
        this.periodLookup.onObjectSelected = e => this.onPeriod(e?.id || 0);
        this.lineMatterLookup.onObjectSelected = lm => this.searchForm.controls.matterId.setValue(lm.matterId||0);
        this.form.controls.sampleNo.setValidators(sampleNoValidatorFn(this.sampleMode()));
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(s => s.unsubscribe());
    }

    ngOnInit() {
        this.testSrv
            .getList(0, 999, null, 'variable')
            .subscribe(
                res => {
                    const data = res.body;
                    this.missingVariables = data.filter(t => t.variable).map(t => t.variable)
                    data.filter(t => t.variable && t.formula)
                        .forEach(v => this.formulaMap.set(v.variable, v.formula));
                });

        this.route.data.subscribe(res => {
            const sampleMode = res['sampleMode'] === 'true';
            this.sampleMode.set(sampleMode);
            this.shellSrv.setTitle(sampleMode ? 'LTM_SAMPLE_TESTINGS' : 'LTM_BATCH_TESTINGS');
            if (sampleMode) {
                this.sampleLookup.onObjectSelected = e => { if (!this.editInProgress()) { this.refreshData(); } };
            } else {
                this.subscriptions.push(
                    this.searchForm
                        .controls
                        .date
                        .valueChanges
                        .pipe(
                            debounceTime(300),
                            distinctUntilChanged(),
                            filter(() => !this.editInProgress() && !this.onRefresh())
                        ).subscribe(() => this.refreshData())
                );
                this.subscriptions.push(
                    this.searchForm
                        .controls
                        .hour
                        .valueChanges
                        .pipe(
                            debounceTime(300),
                            distinctUntilChanged(),
                            filter(() => !this.editInProgress() && !this.onRefresh())
                        ).subscribe(() => this.refreshData())
                );
            }
        });
        this.shellSrv.setGoBackPath('..', this.route);

        const rights = this.shellSrv.getCurrentNodeRights();
        if (rights.edit) {
            this.shellSrv.setButtons([this.addButton, this.editButton, this.saveButton, this.cancelButton, this.deleteButton]);
        }

        this.subscriptions.push(
            this.tests
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(() => this.refreshFormulas()),
        );

        // if (this.sampleMode()) {
        //     this.subscriptions.push(
        //         this.searchForm
        //             .controls
        //             .sampleNo
        //             .valueChanges
        //             .pipe(
        //                 debounceTime(300),
        //                 distinctUntilChanged()
        //             ).subscribe(res => {
        //                 if (!this.editInProgress()) {
        //                     this.onHour();
        //                 }
        //         })
        //     );
        // }



        this.subscriptions.push(
            this.searchForm
                .controls
                .matterId
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    filter(() => !this.onRefresh())
                ).subscribe(id => this.onMatter(id))
        );


        this.form.controls.timeStamp.setValue(this.TODAY);
    }

    private refreshFormulas() {
        const values = this.variables.map((v, i) => {
            return v ? this.tests.at(i)?.value.value : 0;
        });
        const result = this.formulas.map(f => 0);
        const program =
            this.variables.filter(v => v).map((v, i) =>
                `const ${v} = ${values[i]};`).join('\n') +
            '\n' +
            this.missingVariables.map(v => `const ${v} = 0;`).join('\n') +
            '\n' +
            this.formulas.map((f, i) => `result[${i}] = ${f};`).join('\n');

        try {
            eval(program);
        } catch (e: any) { /* empty */
        }
        this.totals.controls.forEach((c, i) => {
            c.setValue({ value: +((result[i] || 0).toFixed(2)) });
            // c.markAsTouched({onlySelf: false})
            // c.markAsDirty({onlySelf: false});
        });
    }


    get tests(): FormArray {
        return this.form.controls['tests'] as FormArray;
    }

    get totals(): FormArray {
        return this.totalsForm.controls['totals'] as FormArray;
    }

    private showData(batch: LTMBatch) {
         this.matterTestSrv.getList(0, 900, null, 'id')
            .subscribe(res => {
                const testingId = this.form.controls.id.value;
                const selectedTests = res.body
                    .filter(t => (this.selectedPeriodicity < 1 || this.selectedPeriodicity === t.periodicity) && !t.formula)

                selectedTests
                    .sort((a, b) => a.testId - b.testId)
                    .forEach(t => {
                        this.labels.push(t.testDescription);
                        this.limits.push([t.minValue, t.maxValue || 999]);
                        if (t.variable) {
                            this.variables.push(t.variable);
                        }
                        const testForm: FormGroup<{
                            id: FormControl<number>,
                            testId: FormControl<number>,
                            parentId: FormControl<number>,
                            value: FormControl<number>,
                        }> = this.formBuilder.group({
                            id:              [{ value: 0, disabled: true }],
                            parentId:        [testingId || 0, Validators.required],
                            testId:          [{ value: t.testId, disabled: true }, Validators.required],
                            value:           [0, [Validators.required, Validators.min(t.minValue), Validators.max(t.maxValue || 999)]],
                        });
                        this.tests.push(testForm);
                    });
                this.missingVariables = this.missingVariables.filter(v => this.variables.indexOf(v) < 0);

                res.body
                    .filter(t => (this.selectedPeriodicity < 1 || this.selectedPeriodicity === t.periodicity) && t.formula && t.testDescription)
                    .sort((a, b) => a.id - b.id)
                    .forEach(t => {
                        this.totalsLabels.push(t.testDescription);
                        this.totalsLimits.push([t.minValue, t.maxValue || 999]);
                        this.formulas.push(t.formula);
                        const testForm = this.formBuilder.group({
                            value: [{ value: 0, disabled: true }, [Validators.min(t.minValue), Validators.max(t.maxValue || 999)]],
                        }, {updateOn: 'change'});
                        this.totals.push(testForm);
                    });
                this.tests.controls.forEach((c, i) => {
                    c.disable();
                })
                this.formulas = this.formulas.map(f => this.replaceFormulas(f));

                if (batch.tests.length > 0) {
                    const values = batch.tests.filter(bt => selectedTests.findIndex(st => st.testId === bt.testId) >= 0)
                    this.tests.setValue(values.sort((a, b) => a.testId - b.testId));
                }

                this.editButton.visible = !!batch.id && !!batch.parentId && (!this.sampleMode() || !!this.searchForm.controls.sampleNo.value);
                this.deleteButton.disabled = !batch.id;
                this.addButton.visible = !batch.id &&
                    (!!batch.parentId || this.sampleMode()) &&
                    (!this.sampleMode() || !!this.searchForm.controls.sampleNo.value) &&
                    this.tests.length > 0;
                this.searchForm.enable();
                // if (!this.sampleMode()) {
                //     this.hour()?.nativeElement?.focus();
                // }
                this.onRefresh.set(false);
            });

    }


    private refreshData() {
        this.onRefresh.set(true);
        this.tests.clear();
        this.totals.clear();
        this.totalsForm.reset();
        this.formulaMap.clear();
        this.labels = [];
        this.limits = [];
        this.formulas = [];
        this.variables = [];
        this.totalsLabels = [];
        this.totalsLimits = [];
        this.form.controls['parentId'].setValue(this.matterTestSrv.getParentId() || 0);
        this.matterTestSrv.sortColumn = { active: 'variable', direction: '' };

        this.savedData()
            .subscribe(batch => {
                this.form.controls.id.setValue(batch.id);
                this.form.controls.timeStamp.setValue(<Date>batch.timeStamp);
                this.form.controls.spoilageHour.setValue(batch.spoilageHour);
                this.form.controls.silo.setValue(batch.silo);
                this.form.controls.sampleNo.setValue(batch.sampleNo);
                this.form.controls.breakageHour.setValue(batch.breakageHour);
                this.form.controls.parentId.setValue(batch.parentId);
                this.searchForm.controls.matterId.setValue(batch.parentId, {onlySelf: true, emitEvent: false});
                if (this.sampleMode()) {
                    this.matterTestSrv.setParentId(batch.parentId || 0);
                    if (batch.id) {
                        this.form.controls.parentId.disable();
                        this.searchForm.controls.matterId.disable();
                    } else {
                        this.form.controls.parentId.enable();
                        this.searchForm.controls.matterId.enable();
                    }
                }
                if (!this.matterTestSrv.getParentId()) {
                    this.matterTestSrv.setParentId(0);
                }
                this.showData(batch);
            });

    }

    private replaceFormulas(f: string): string {
        let res = f;
        this.formulaMap.forEach((v, k) => res = res.replace(k, '(' + v + ')'));
        return res;
    }

    onMatter(id: number) {
        if (!this.form.controls.id || !this.sampleMode()) {
            this.matterTestSrv.setParentId(id);
            this.deleteButton.disabled = !id;
            this.refreshData();
        }
    }

    private delete() {
        const value: LTMBatch = <LTMBatch>this.form.getRawValue();
        value.sampleNo = this.sampleMode() ? this.searchForm.controls.sampleNo.value : null;
        if (value.timeStamp) {
            value.timeStamp = dateToYmdStr(this.searchForm.controls.date.value) + ' ' + this.searchForm.controls.hour.value + ':00:00';

            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(b => b ? this.entitySrv.deleteBatch(<LTMBatch>value) : of({ count: -1 })))
                .subscribe(res => {
                    if (res.count >= 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.refreshData();
                    }
                });
        }
    }

    private validateFormulas() {
        return this.totals.controls.map((c, i) => {
            const limits = this.totalsLimits[i];
            const valid = c.value.value >= limits[0] && c.value.value <= limits[1];
            if (!valid) {
                const ctrl = (<FormGroup>c).controls['value'];
                ctrl.enable();
                ctrl.setErrors({ 'invalid': true });
                ctrl.markAsTouched();
                ctrl.markAsDirty();
                c.updateValueAndValidity();
            }
            return valid;
        }).filter(r => !r)
            .length === 0;
    }

    private save() {
        const formValue: LTMBatch = this.form.getRawValue() as LTMBatch;
        // formValue.sampleNo = this.sampleMode() ? this.searchForm.controls.sampleNo.value : null;
        if (!this.searchForm.controls.matterId) {
            this.searchForm.controls.sampleNo.setValue(null);
        }
        if (!this.form.valid ||
            (this.searchForm.controls.sampleNo.invalid && this.sampleMode()) ||
            !this.validateFormulas() ||
            (this.sampleMode() && !this.form.controls.sampleNo.value)) {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_FORM');
        } else {
            if (formValue.parentId && formValue.centerId) {
                formValue.timeStamp = dateToYmdStr(formValue.timeStamp) + ' ' + this.searchForm.controls.hour.value + ':00:00';
                formValue.sampleNo = this.searchForm.controls.sampleNo.value;
                this.shellSrv.setLoading(true);
                this.entitySrv
                    .saveBatch(formValue)
                    .pipe(tap(res => {
                            if (!formValue.id) {
                                this.refreshData();
                            }
                        }))
                    .subscribe({
                        next: batch => {
                            this.shellSrv.setLoading(false);
                            this.snackBarSrv.showSuccessMessage();
                            this.tests.markAsPristine();
                            this.endEdit();
                        }, error: err => {
                            this.shellSrv.setLoading(false);
                            throw err;
                        }
                    });
            }
        }
    }

    // clearPeriod() {
    //     this.searchForm.controls.period.setValue(0);
    //     this.onPeriod(0);
    // }

    onPeriod(e: number) {
      this.selectedPeriodicity = e;
      this.refreshData();
    }

    private savedData(): Observable<LTMBatch> {
        const params = this.searchForm.getRawValue();
        const date = new Date(params.date);
        date.setHours(this.searchForm.controls.hour.value, 0, 0, 0);
        return this.entitySrv
            .input(params.matterId || 0, date, params.sampleNo)
            .pipe(map(res => {
                res.tests = res.tests.map(t => {
                    return { id: t.id, testId: t.testId, value: t.value, parentId: t.parentId };
                });

                return res;
            }));
    }

    // onHour() {
    //     // this.searchForm.disable();
    //     // const value: LTMBatch = <LTMBatch>this.form.getRawValue();
    //     // const tests = value.tests;
    //     // if (tests.length > 0) {
    //     //     tests.forEach(e => e.value = 0);
    //     //     this.tests.setValue(tests);
    //     // }
    //     // const date = new Date(this.searchForm.controls.date.value);
    //     // date.setHours(date.getHours(), 0, 0, 0);
    //     // this.form.controls.timeStamp.setValue(date);
    //     // this.form.controls.parentId.setValue(this.searchForm.controls.matterId.value);
    //     // if (this.sampleMode()) {
    //     //     this.form.controls.sampleNo.setValue(this.sampleMode()? this.searchForm.controls.sampleNo.value : null, {onlySelf: true, emitEvent: false});
    //     // }
    //     this.refreshData();
    // }
    // private onHour_() {
    //     this.savedData()
    //         .subscribe(batch => {
    //             this.form.controls.id.setValue(batch.id);
    //             this.form.controls.timeStamp.setValue(<Date>batch.timeStamp);
    //             this.form.controls.spoilageHour.setValue(batch.spoilageHour);
    //             this.form.controls.silo.setValue(batch.silo);
    //             this.form.controls.sampleNo.setValue(batch.sampleNo);
    //             this.form.controls.breakageHour.setValue(batch.breakageHour);
    //             this.form.controls.parentId.setValue(batch.parentId);
    //             this.searchForm.controls.matterId.setValue(batch.parentId, {onlySelf: true, emitEvent: false});
    //             if (this.sampleMode()) {
    //                 this.matterTestSrv.setParentId(batch.parentId || 0);
    //                 if (batch.id) {
    //                     this.form.controls.parentId.disable();
    //                     this.searchForm.controls.matterId.disable();
    //                 } else {
    //                     this.form.controls.parentId.enable();
    //                     this.searchForm.controls.matterId.enable();
    //                 }
    //             }
    //             if (!this.matterTestSrv.getParentId()) {
    //                 this.matterTestSrv.setParentId(0);
    //             }
    //             if (batch.tests.length > 0) {
    //                 const idSet = this.tests.controls.map(c => <number>(<FormGroup>c).controls['testId'].value);
    //                 const values = batch.tests.filter(bt => idSet.find(id => id === bt.testId) >= 0)
    //                 console.log(this.tests.controls);
    //                 this.tests.setValue(values.sort((a, b) => a.testId - b.testId));
    //             }
    //
    //             this.editButton.visible = !!batch.id && !!batch.parentId && (!this.sampleMode() || !!this.searchForm.controls.sampleNo.value);
    //             this.deleteButton.disabled = !batch.id;
    //             this.addButton.visible = !batch.id &&
    //                 (!!batch.parentId || this.sampleMode()) &&
    //                 (!this.sampleMode() || !!this.searchForm.controls.sampleNo.value) &&
    //                 this.tests.length > 0;
    //             this.searchForm.enable();
    //             this.hour()?.nativeElement?.focus();
    //         });
    // }

    private cancel() {
        this.confirmationSrv
            .confirmDontSave()
            .subscribe(yes => {
                if (yes) {
                    this.endEdit();
                    this.searchForm.controls.hour.enable({onlySelf: true });
                    this.tests.markAsPristine();
                    this.totals.markAsPristine();
                    this.onMatter(this.searchForm.controls.matterId.value);
                }
            });
    }

    private edit() {
        this.editInProgress.set(true);
        this.searchForm.disable({ onlySelf: true, emitEvent: false });
        this.searchForm.controls.sampleNo.enable({onlySelf: true, emitEvent: false})
        this.deleteButton.disabled = true;
        this.cancelButton.disabled = false;
        this.saveButton.disabled = false;
        this.tests.controls.forEach((c, i) => {
            c.enable();
        })
        this.editButton.visible = false;
        this.addButton.visible = false;
        if (this.sampleMode()) {
            this.form.controls.sampleNo.setValue(this.searchForm.controls.sampleNo.value);
        }
    }
    private endEdit() {
        this.editInProgress.set(false);
        this.searchForm.enable({ onlySelf: true, emitEvent: false });
        this.editButton.visible = true;
        this.addButton.visible = false;
        this.cancelButton.disabled = true;
        this.saveButton.disabled = true;
        this.deleteButton.disabled = !this.form.getRawValue().id;
        this.tests.controls.forEach((c, i) => c.disable());
    }
}
