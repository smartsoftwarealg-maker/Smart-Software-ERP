import { Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChildren } from '@angular/core';
import { LTMBatch, LTMLineMatter, LTMTestingLine } from '../ltm-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    private soloSrv = inject(LTMSiloService);
    private entitySrv = inject(LtmBatchService);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private confirmationSrv = inject(ConfirmationDialogService);
    private matterSrv = inject(LtmLineMatterService);
    private matterTestSrv = inject(LtmMatterTestService);
    private periodSrv = inject(LtmPeriodicityService);
    private testSrv = inject(LtmTestService);
    private shellSrv = inject(ShellService);
    private loginSrv = inject(LoginService);
    private subscriptions: Subscription[] = [];
    private TODAY = new Date();
    private formulaMap = new Map<string, string>();
    private missingVariables: string[] = [];
    private matterList = viewChildren<ElementRef>('matterList');

    // matters: LTMLineMatter[] = [];
    filteredMatters: Observable<LTMLineMatter[]> = null;
    searchField = new FormControl<string | null>('');
    periodLookup = new DefaultAutoCompleteModel(this.periodSrv);
    siloLookup = new DefaultAutoCompleteModel(this.soloSrv);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);

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

    labels: string[] = [];
    limits: number[][] = [];
    totalsLabels: string[] = [];
    totalsLimits: number[][] = [];
    variables: string[] = [];
    formulas: string[] = [];
    selectedLineMatter: LTMLineMatter = null;
    selectedPeriodicity = 0;
    hourCtrl = new FormControl<number>(0);
    periodCtrl = new FormControl<number>(0);
    sampleCtrl = new FormControl<string>('?', [Validators.required, Validators.minLength(3)]);

    formBuilder = inject(FormBuilder);
    form = this.formBuilder.group(
        {
            id:           [0],
            centerId:     [this.loginSrv.appCtx.center, Validators.required],
            parentId:     [0, Validators.required],
            timeStamp:    [this.TODAY, Validators.required],
            sampleNo:     [null],
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
        // this.matterTestSrv.setParentId(0);
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(s => s.unsubscribe());
    }

    ngOnInit() {
        this.route.data.subscribe(res => {
            const sampleMode = res['sampleMode'] === 'true';
            this.sampleMode.set(sampleMode);
            this.shellSrv.setTitle(sampleMode ? 'LTM_SAMPLE_TESTINGS' : 'LTM_BATCH_TESTINGS');
        });
        this.shellSrv.setGoBackPath('..', this.route);

        const rights = this.shellSrv.getCurrentNodeRights();
        if (rights.edit) {
            this.shellSrv.setButtons([this.saveButton, this.cancelButton, this.deleteButton]);
        }

        this.subscriptions.push(
            this.tests
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(() => this.refreshFormulas()),

            this.form
                .controls
                .timeStamp
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(() => {
                    if (!this.editInProgress()) {
                        this.onHour();
                    }
            })
        );

        this.subscriptions.push(
            this.searchField
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(res => {
                    if (!(this.form.controls.id.value && this.sampleMode())) {
                        this.filteredMatters = this.matterSrv
                            .getList(0, 1000, res)
                            .pipe(map(res => res.body));
                    }
                })
        );
        this.form.controls.timeStamp.setValue(this.TODAY);
    }

    private refreshFormulas() {
        if (this.tests.touched && this.tests.dirty) {
            this.cancelButton.disabled = false;
            this.editInProgress.set(true);
            this.hourCtrl.disable({onlySelf: true });
        }
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
        this.testSrv
            .getList(0, 999, null, 'variable')
            .pipe(
                tap(res => this.missingVariables = res.body.filter(t => t.variable).map(t => t.variable)),
                tap(res => {
                    res.body
                        .filter(t => t.variable && t.formula)
                        .forEach(v => this.formulaMap.set(v.variable, v.formula));
                }),
                switchMap(_ => this.matterTestSrv.getList(0, 900, null, 'id')))
            .subscribe(res => {
                const testingId = this.form.controls.id.value;
                res.body
                    .filter(t => (this.selectedPeriodicity < 1 || this.selectedPeriodicity === t.periodicity) && !t.formula)
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
                    .forEach(t => {
                        this.totalsLabels.push(t.testDescription);
                        this.totalsLimits.push([t.minValue, t.maxValue || 999]);
                        this.formulas.push(t.formula);
                        const testForm = this.formBuilder.group({
                            value: [{ value: 0, disabled: true }, [Validators.min(t.minValue), Validators.max(t.maxValue || 999)]],
                        }, {updateOn: 'change'});
                        this.totals.push(testForm);
                    });
                this.formulas = this.formulas.map(f => this.replaceFormulas(f));

                if (batch.tests.length > 0 && this.tests.controls.length == batch.tests.length) {
                    this.tests.setValue(batch.tests);
                }

            });

    }

    private refreshData(keepMatterSelection: boolean) {
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
        this.saveButton.disabled = false;
        this.deleteButton.disabled = false;
        this.matterTestSrv.sortColumn = { active: 'variable', direction: '' };

        const formValue: LTMBatch = this.form.getRawValue() as LTMBatch;
        formValue.sampleNo = this.sampleMode() ? this.sampleCtrl.value : null;
        this.savedData(formValue)
            .subscribe(batch => {
                this.form.controls.id.setValue(batch.id);
                this.form.controls.timeStamp.setValue(<Date>batch.timeStamp);
                this.form.controls.spoilageHour.setValue(batch.spoilageHour);
                this.form.controls.silo.setValue(batch.silo);
                this.form.controls.breakageHour.setValue(batch.breakageHour);
                if (this.sampleMode()) {
                    this.matterTestSrv.setParentId(batch.parentId || 0);
                    if (batch.id) {
                        this.searchField.disable()
                    } else {
                        this.searchField.enable();
                    }
                    this.filteredMatters = this.matterSrv
                        .getList(0, 1000, this.searchField.value)
                        .pipe(map(res => res.body.filter(m => !batch.id || m.matterId === batch.parentId)),
                            tap(res => {
                                if (!keepMatterSelection) {
                                    const validData = res.length > 0 && batch.id;
                                    this.selectedLineMatter = validData ? res[0] : null;
                                    this.matterTestSrv.setParentId(validData ? res[0].matterId : 0);
                                }
                            }));
                }
                if (this.matterTestSrv.getParentId()) {
                    this.showData(batch);
                }
            });

    }

    private replaceFormulas(f: string): string {
        let res = f;
        this.formulaMap.forEach((v, k) => res = res.replace(k, '(' + v + ')'));
        return res;
    }

    onMatter(m: LTMLineMatter) {
        if (!this.editInProgress() && !(this.sampleMode() && this.form.controls.id.value > 0)) {
            this.selectedLineMatter = m;
            this.matterTestSrv.setParentId(m.matterId);
            this.deleteButton.disabled = !m?.id;
            this.refreshData(true);
        }
    }

    private delete() {
        const value: LTMBatch = <LTMBatch>this.form.getRawValue();
        value.sampleNo = this.sampleMode() ? this.sampleCtrl.value : null;
        if (value.timeStamp) {
            value.timeStamp = dateToYmdStr(value.timeStamp) + ' ' + this.hourCtrl.value + ':00:00';

            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(b => b ? this.entitySrv.deleteBatch(<LTMBatch>value) : of({ count: -1 })))
                .subscribe(res => {
                    if (res.count >= 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.form.controls.id.setValue(0);
                        value.tests = value.tests.map(v => {
                            return {...v, value: 0, parentId: 0};
                        })
                        this.tests.setValue(value.tests);
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
        formValue.sampleNo = this.sampleMode() ? this.sampleCtrl.value : null;
        if (!this.form.valid || (this.sampleCtrl.invalid && this.sampleMode()) || !this.validateFormulas()) {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_FORM');
        } else {
            if (formValue.parentId && formValue.centerId) {
                formValue.timeStamp = dateToYmdStr(formValue.timeStamp) + ' ' + this.hourCtrl.value + ':00:00';
                this.shellSrv.setLoading(true);
                this.entitySrv
                    .saveBatch(formValue)
                    .pipe(tap(res => {
                            const date = new Date();
                            date.setHours(this.hourCtrl.value, 0, 0, 0);
                            formValue.timeStamp = date;
                            this.form.controls.timeStamp.setValue(date);
                            if (!formValue.id) {
                                this.form.controls.id.setValue(res.id || 0);
                            }
                        }))
                    .subscribe({
                        next: batch => {
                            this.editInProgress.set(false);
                            this.hourCtrl.enable({onlySelf: true });
                            this.shellSrv.setLoading(false);
                            this.snackBarSrv.showSuccessMessage();
                            this.tests.markAsPristine();
                        }, error: err => {
                            this.shellSrv.setLoading(false);
                            throw err;
                        }
                    });
            }
        }
    }

    clearPeriod() {
        this.periodCtrl.setValue(0);
        this.onPeriod(0);
    }

    onPeriod(e: number) {
      this.selectedPeriodicity = e;
      this.refreshData(true);
    }

    private savedData(value: LTMBatch): Observable<LTMBatch> {
        const date = new Date(value.timeStamp);
        date.setHours(this.hourCtrl.value, 0, 0, 0);
        return this.entitySrv
            .input(value.parentId, date, value.sampleNo)
            .pipe(map(res => {

                res.tests = res.tests.map(t => {
                    return { id: t.id, testId: t.testId, value: t.value, parentId: t.parentId };
                });

                return res;
            }));
    }

    onHour() {
        const value: LTMBatch = <LTMBatch>this.form.getRawValue();
        const tests = value.tests;
        if (tests.length > 0) {
            tests.forEach(e => e.value = 0);
            this.tests.setValue(tests);
        }
        const date = new Date(value.timeStamp);
        date.setHours(date.getHours(), 0, 0, 0);
        this.form.controls.timeStamp.setValue(date);
        value.timeStamp = date;
        value.sampleNo = this.sampleMode()? this.sampleCtrl.value : null;

        this.refreshData(false);
    }

    // private onHour_(): Observable<LTMBatch> {
    //     const value: LTMBatch = <LTMBatch>this.form.getRawValue();
    //     const date = new Date(value.timeStamp);
    //     value.timeStamp = date;
    //     this.form.controls['timeStamp'].setValue(date);
    //     this.form.controls['sampleNo'].setValue(this.sampleMode()? this.sampleCtrl.value : null);
    //     const tests  = value.tests;
    //     tests.forEach(e => e.value = 0);
    //     this.tests.setValue(tests);
    //     return this.savedData(value);
    // }
    //
    private cancel() {
        this.confirmationSrv
            .confirmDontSave()
            .subscribe(yes => {
                if (yes) {
                    this.editInProgress.set(false);
                    this.hourCtrl.enable({onlySelf: true });
                    this.cancelButton.disabled = true;
                    this.tests.markAsPristine();
                    this.totals.markAsPristine();
                    this.onMatter(this.selectedLineMatter);
                }
            });
    }
}
