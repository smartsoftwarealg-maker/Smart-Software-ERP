import {
    Component,
    DestroyRef,
    inject,
    input,
    OnDestroy,
    OnInit,
    signal, ViewChild
} from '@angular/core';
import { CHEMICAL_TEST, DEPOSIT_TEST, LTMBatch, PHYSICAL_TEST, RAW_MATERIAL_TEST } from '@ltm/ltm-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule, ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LtmMatterTestService } from '@ltm/ltm-api';
import { LtmBatchService } from '@ltm/ltm-api';
import { LtmPeriodicityService } from '@ltm/ltm-api';
import { filter, map, merge, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LtmTestService } from '@ltm/ltm-api';
import { dateToYmdStr, LoginService, MaterialModule } from '@ss/common/api-common';

import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { LTMSiloService } from '@ltm/ltm-api';
import { LtmSupplierService } from '@ltm/ltm-api';
import { LtmPickupPointService } from '@ltm/ltm-api';
import { LtmCenterMatterService } from '@ltm/ltm-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LtmTestScheduleService } from '@ltm/ltm-api';
import { LtmTestScheduleListComponent } from '../ltm-test-schedule-list/ltm-test-schedule-list.component';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

function sampleNoValidatorFn(sampleMode: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return sampleMode && !control.value ? { message: 'COMMON_REQUIRED' } : null;
    };
}

type VarianceControl = {
    variable: string;
    description: string;
    formula: string;
}
type ColorRange = {
    id: number;
    color: string;
    range: number[];
    description?: string;
}

@Component({
    selector: 'ss-ltm-batch-input',
    templateUrl: './ltm-batch-input.component.html',
    styleUrls: ['./ltm-batch-input.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    TranslatePipe,
    ReactiveFormsModule,
    DatePickerComponent,
    RouterOutlet,
    TranslatePipe,
    UiAutoCompleteComponent
]
})
export class LtmBatchInputComponent implements OnInit, OnDestroy {
    #destroyRef = inject(DestroyRef);
    #selectedTest = 0;

    private TITLES = ['LTM_BATCH_TESTINGS', 'LTM_PHYSICAL_TESTINGS', 'LTM_DEPOSIT_TESTINGS', 'LTM_RAW_TESTINGS']
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private siloSrv = inject(LTMSiloService);
    // private equipmentSrv = inject(LtmEquipmentService);
    private entitySrv = inject(LtmBatchService);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private confirmationSrv = inject(ConfirmationDialogService);
    private lineMatterSrv = inject(LtmCenterMatterService);
    private matterTestSrv = inject(LtmMatterTestService);
    private periodSrv = inject(LtmPeriodicityService);
    private testSrv = inject(LtmTestService);
    private shellSrv = inject(ShellService);
    private supplierSrv = inject(LtmSupplierService);
    private loginSrv = inject(LoginService);
    private pickupSrv = inject(LtmPickupPointService);
    private subscriptions: Subscription[] = [];
    private TODAY = new Date();
    private formulaMap = new Map<string, string>();
    private missingVariables: string[] = [];
    // private hour = viewChild<ElementRef>('hour');

    periodLookup = new DefaultAutoCompleteModel(this.periodSrv);
    matterTestLookup = new DefaultAutoCompleteModel(this.matterTestSrv, 'testId', 'testDescription');
    siloLookup = new DefaultAutoCompleteModel(this.siloSrv);
    matterLookup = new DefaultAutoCompleteModel(this.lineMatterSrv);
    supplierLookup = new DefaultAutoCompleteModel(this.supplierSrv);
    pickupLookup = new DefaultAutoCompleteModel(this.pickupSrv);

    protected readonly CHEMICAL_TEST = CHEMICAL_TEST;
    protected readonly PHYSICAL_TEST = PHYSICAL_TEST;
    protected readonly RAW_MATERIAL_TEST = RAW_MATERIAL_TEST;
    protected readonly DEPOSIT_TEST = DEPOSIT_TEST;

    readonly scheduleSrv = inject(LtmTestScheduleService);
    readonly COLOR_RANGE: ColorRange[] = [
        { id: 0, color: '#FF0000', range: [84, 99999],    description: '' },
        { id: 1, color: '#ff6600', range: [68, 83],       description: '' },
        { id: 2, color: '#ff9900', range: [51, 67],       description: '' },
        { id: 3, color: '#ffff99', range: [36, 50],       description: 'LTM_LIMIT' },
        { id: 4, color: '#ccffcc', range: [21, 35],       description: 'LTM_ACCEPTABLE' },
        { id: 5, color: '#8bf47a', range: [-20, 20],      description: 'LTM_IDEAL' },
        { id: 7, color: '#ccffcc', range: [-35, -21 ],    description: 'LTM_ACCEPTABLE' },
        { id: 8, color: '#ffff99', range: [-50, -36 ],    description: 'LTM_LIMIT' },
        { id: 9, color: '#ff9900', range: [-67, -51 ],    description: '' },
        { id: 10, color: '#ff6600', range: [-83, -68 ],   description: '' },
        { id: 11, color: '#FF0000', range: [-99999, -84], description: '' },
    ]

    @ViewChild(RouterOutlet) outlet: RouterOutlet | null = null;

    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    public cancelButton: ToolbarButton = {
        icon: 'fa-solid fa-rotate-left',
        label: 'COMMON_CANCEL',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.cancel()
    };


    labels: string[] = [];
    limits: number[][] = [];
    totalsLabels: string[] = [];
    simulatedTotalsLabes: string[] = [];
    totalsOptimalValues: number[] = [];
    totalsLimits: number[][] = [];
    variables: string[] = [];
    varianceControls: VarianceControl[] = [];
    formulas: string[] = [];
    invalidIndexes: number[] = [];
    // selectedPeriodicity = 0;

    formBuilder = inject(FormBuilder);
    periodCtrl = new FormControl<number>(0);
    matterTestCtrl = new FormControl<number>(0);

    form = this.formBuilder.group(
        {
            id:           [0],
            centerId:     [this.loginSrv.appCtx.center, Validators.required],
            parentId:     [{ value: this.matterTestSrv.getParentId(), disabled: true }, Validators.required],
            timeStamp:    [{ value: this.TODAY, disabled: true }, Validators.required],
            sampleNo:     [{ value: null, disabled: false }],
            spoilageHour: [null],
            breakageHour: [null],
            silo:         [null],
            // equipment:    [null],
            bleacher:     [0],
            pickupPoint:  [0, Validators.required],
            zone:         [0],
            deposit:      [0],
            supplier:     [0],
            hour:         [{ value: 0, disabled: true }],
            userId:       [this.loginSrv.appCtx.id],
            testType:     [1],
            tests:        this.formBuilder.array([])
        }
    );

    totalsForm = this.formBuilder.group({ totals: this.formBuilder.array([]) });
    simulationForm = this.formBuilder.group({ totals: this.formBuilder.array([]) });
    testingMode = input(CHEMICAL_TEST);
    id = input(0);
    editInProgress = signal(false);

    constructor() {
        this.TODAY.setHours(0, 0, 0, 0);
        this.periodLookup.onObjectSelected = e => this.onPeriod();
        this.matterLookup.onObjectSelected = e => this.onMatter(e?.id || 0);
        this.form.controls.sampleNo.setValidators(sampleNoValidatorFn(this.testingMode() === PHYSICAL_TEST));
        this.matterTestLookup.onObjectSelected = e => this.onTest(e?.testId||0);
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(s => s.unsubscribe());
    }

    ngOnInit() {
        this.#selectedTest = 0;
        this.scheduleSrv.setParentId(this.id());
        this.testSrv
            .getList(0, 999, null, 'variable')
            .subscribe(
                res => {
                    const data = res.body;
                    this.missingVariables = data.filter(t => t.variable).map(t => t.variable);
                    data.filter(t => t.variable && t.formula)
                        .forEach(v => this.formulaMap.set(v.variable, v.formula));
                });

        this.shellSrv.setTitle(this.TITLES[this.testingMode() - 1]);
        this.refreshData();


        const rights = this.shellSrv.getCurrentNodeRights();
        if (rights.edit) {
            this.shellSrv.setButtons([this.saveButton, this.cancelButton]);
        }

        this.subscriptions.push(
            this.tests
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(() => {
                    this.refreshFormulas();
                    this.validateVarianceControls();
                })
        );

        merge(
            this.form.controls.timeStamp.valueChanges,
            this.form.controls.hour.valueChanges,
            this.form.controls.parentId.valueChanges,
            this.form.controls.pickupPoint.valueChanges
        ).pipe(
            filter(() => !!this.form.controls.parentId && !!this.form.controls.pickupPoint),
            debounceTime(300),
            distinctUntilChanged(),
            takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                this.validate();
            });

        this.form.controls.timeStamp.setValue(this.TODAY);
        this.form.controls.testType.setValue(this.testingMode());

        if (this.testingMode() === CHEMICAL_TEST || this.testingMode() === PHYSICAL_TEST) {
            // this.form.controls.equipment.addValidators(Validators.required);
            this.form.controls.pickupPoint.addValidators(Validators.required);
            this.form.controls.hour.addValidators(Validators.required);
        } else {
            // this.form.controls.equipment.removeValidators(Validators.required);
            this.form.controls.pickupPoint.removeValidators(Validators.required);
            this.form.controls.hour.removeValidators(Validators.required);
        }
        if (this.testingMode() === PHYSICAL_TEST) {
            this.form.controls.sampleNo.addValidators(Validators.required);
        } else {
            this.form.controls.sampleNo.removeValidators(Validators.required);
        }
    }

    private validate() {
        this.entitySrv
            .validateBatch(this.form.getRawValue() as LTMBatch)
            .subscribe(res => {
                this.form.controls.pickupPoint.setErrors(res? null : { 'duplicate': true });
                this.form.controls.pickupPoint.markAsDirty({ onlySelf: true });
                this.form.controls.pickupPoint.markAsTouched({ onlySelf: true });
            });
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
            console.log(e);
        }
        this.totals.controls.forEach((c, i) => {
            c.setValue({ value: +((result[i] || 0).toFixed(2)) });
        });
    }

    private validateVarianceControls() {
        this.invalidIndexes = [];
        this.varianceControls
            .forEach(vc => {
                    const formulas = vc.formula
                        .split(new RegExp('[+()/]'))
                        .filter(c => c.startsWith('v'));

                    const indexes = formulas.map(f => this.variables.indexOf(f)).filter(i => i >= 0 && this.tests.at(i).value.value > 0);
                    if (indexes.length > 0) {
                        const values = indexes.map(i => <number>this.tests.at(i).value.value);
                        const avg    = Math.round(values.reduce((a, b) => a + b) * 10 / indexes.length) / 10;
                        const vars   = values.map(v => Math.abs(v - avg) > avg / 10.0);
                        indexes.forEach(i => (<FormGroup>this.tests.at(i)).controls['value'].setErrors(null));
                        const vcIndex = this.formulas.indexOf(vc.formula);
                        (<FormGroup>this.totals.controls.at(vcIndex)).controls['value'].setValue(avg);
                        vars.forEach((v, i) => {
                            if (v) {
                                const idx = indexes[i];
                                this.invalidIndexes.push(idx);
                                const fg: FormGroup = <FormGroup>this.tests.at(idx);
                                fg.controls['value'].setErrors({ 'invalid': true });
                                fg.controls['value'].markAsTouched();
                                fg.controls['value'].markAsDirty();
                            }
                        });
                    }
                }
            );

    }

    get tests(): FormArray {
        return this.form.controls['tests'] as FormArray;
    }

    get totals(): FormArray {
        return this.totalsForm.controls['totals'] as FormArray;
    }
    get simulatedTotals(): FormArray {
        return this.simulationForm.controls['totals'] as FormArray;
    }

    private showData(batch: LTMBatch) {
        this.simulatedTotals.clear();
         this.matterTestSrv
             .getList(0, 900, null, 'id')
             .subscribe(res => {
                const testingId = this.form.controls.id.value;
                const selectedTests = res.body
                    .filter(t =>
                        (this.periodCtrl.value < 1 || this.periodCtrl.value === t.periodicity) &&
                        (this.#selectedTest === 0 || this.#selectedTest === t.testId) &&
                        !t.formula)

                selectedTests
                    .sort((a, b) => a.testId - b.testId)
                    .forEach(t => {
                        this.labels.push(t.testDescription);
                        this.limits.push([t.minValue, t.maxValue || 999]);
                        if (t.variable) {
                            this.variables.push(t.variable);
                        }
                        const valueArr = batch.tests.filter(b => b.testId === t.testId);
                        const value    = valueArr.length>0? valueArr[0]: {id: 0, testId: 0, value: 0, parentId: 0};
                        const testForm: FormGroup<{
                            id: FormControl<number>,
                            testId: FormControl<number>,
                            parentId: FormControl<number>,
                            value: FormControl<number>,
                        }> = this.formBuilder.group({
                            id:       [{ value: value.id, disabled: true }],
                            parentId: [testingId || 0, Validators.required],
                            testId:   [{ value: t.testId, disabled: true }, Validators.required],
                            value:    [value.value, [Validators.required, Validators.min(t.minValue), Validators.max(t.maxValue || 999)]],
                        });
                        this.tests.push(testForm);
                    });
                this.missingVariables = this.missingVariables.filter(v => this.variables.indexOf(v) < 0);
                const simulatedTests: FormGroup[] = [];
                res.body
                    .filter(t => (this.periodCtrl.value < 1 || this.periodCtrl.value === t.periodicity) &&
                                               (this.#selectedTest === 0 || this.#selectedTest === t.testId) &&
                                               t.formula && t.testDescription)
                    .sort((a, b) => a.id - b.id)
                    .forEach(t => {
                        this.totalsLabels.push(t.testDescription);
                        this.totalsLimits.push([t.minValue, t.maxValue || 999]);
                        this.formulas.push(t.formula);
                        if (t.varianceControl) {
                            this.varianceControls.push({variable: t.variable, description: t.testDescription, formula: t.formula});
                        }
                        const testForm = this.formBuilder.group({
                            value: [{ value: 0, disabled: true }, [Validators.min(t.minValue), Validators.max(t.maxValue || 999)]],
                        }, {updateOn: 'change'});
                        this.totals.push(testForm);
                        if (t.isSimulated) {
                            this.simulatedTotals.push(testForm);
                            this.simulatedTotalsLabes.push(t.testDescription);
                            this.totalsOptimalValues.push(t.optValue|| (t.normMin + t.normMax)/2);
                        }
                    });
                this.formulas = this.formulas.map(f => this.replaceFormulas(f));
            });
    }
    private onPeriod() {
        this.refreshData();
        this.validate();
    }

    private refreshData() {
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
                this.scheduleSrv.setParentId(batch.id || 0);

                const date = new Date(batch.timeStamp);
                this.form.controls.id.setValue(batch.id||0);
                this.form.controls.timeStamp.setValue(date);
                this.form.controls.hour.setValue(date.getHours());
                this.form.controls.spoilageHour.setValue(batch.spoilageHour);
                this.form.controls.silo.setValue(batch.silo||0);
                // this.form.controls.equipment.setValue(batch.equipment||0);
                this.form.controls.bleacher.setValue(batch.bleacher||0);
                this.form.controls.pickupPoint.setValue(batch.pickupPoint||0);
                this.form.controls.zone.setValue(batch.zone||0);
                this.form.controls.deposit.setValue(batch.deposit||0);
                this.form.controls.supplier.setValue(batch.supplier||0);
                this.form.controls.sampleNo.setValue(batch.sampleNo);
                this.form.controls.breakageHour.setValue(batch.breakageHour);
                this.form.controls.parentId.setValue(batch.parentId || this.matterTestSrv.getParentId());

                // if (this.testingMode() === PHYSICAL_TEST) {
                this.matterTestSrv.setParentId(batch.parentId || this.matterTestSrv.getParentId());
                // }
                if (batch.id) {
                    this.form.controls.parentId.disable();
                } else {
                    this.form.controls.parentId.enable();
                }
                if (!this.matterTestSrv.getParentId()) {
                    this.matterTestSrv.setParentId(0);
                }
                if (!batch.id) {
                    this.form.controls.timeStamp.enable();
                    this.form.controls.hour.enable();
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
        this.matterTestCtrl.setValue(0);
        this.#selectedTest = 0;
        this.matterTestSrv.setParentId(id);
        this.refreshData();
    }

    onTest(id: number) {
        this.#selectedTest = id;
        this.refreshData();
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
        if (!this.form.valid ||
            (this.form.controls.sampleNo.invalid && this.testingMode() === PHYSICAL_TEST) ||
            !this.validateFormulas() ||
            (this.testingMode() === PHYSICAL_TEST && !this.form.controls.sampleNo.value)) {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_FORM');
        } else {
            if (formValue.parentId && formValue.centerId) {
                formValue.timeStamp = dateToYmdStr(formValue.timeStamp) + ' ' + this.form.controls.hour.value + ':00:00';
                // formValue.sampleNo = this.form.controls.sampleNo.value;
                this.shellSrv.setLoading(true);
                this.entitySrv
                    .saveBatch(formValue)
                    .subscribe({
                        next: res => {
                            this.shellSrv.setLoading(false);
                            this.tests.markAsPristine();
                            if (this.isTestScheduledPhysical()) {
                                this.snackBarSrv.showSuccessMessage();
                                this.goBack();
                            } else {
                                if (formValue.id < 1) {
                                    this.router.navigate(['..', res?.id], { relativeTo: this.activatedRoute })
                                        .then(() => this.refreshData())
                                        .then();
                                }
                            }

                        }, error: err => {
                            this.shellSrv.setLoading(false);
                            throw err;
                        }
                    });
            }
        }
    }

    private isTestScheduledPhysical() {
        return this.testingMode() !== PHYSICAL_TEST ||
            (this.form.controls.id.value > 0 &&
            this.outlet !== null &&
            this.outlet.component instanceof LtmTestScheduleListComponent &&
            this.outlet.component.detailCount() > 1);
    }

    private savedData(): Observable<LTMBatch> {
        const params = this.form.getRawValue();
        const date = new Date(params.timeStamp);
        date.setHours(this.form.controls.hour.value, 0, 0, 0);
        return this.entitySrv
            .input(this.id())
            .pipe(map(res => {
                res.tests = res.tests.map(t => {
                    return { id: t.id, testId: t.testId, value: t.value, parentId: t.parentId };
                });
                return res;
            }));
    }


    private goBack() {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute }).then();
    }

    private cancel() {
        if (this.form?.pristine) {
            this.goBack();
        } else {
            if (this.isTestScheduledPhysical() || this.form.controls.id.value === 0) {
                this.confirmationSrv
                    .confirmDontSave()
                    .subscribe(yes => {
                        if (yes) {
                            this.goBack();
                        }
                    });
            } else {
                this.snackBarSrv.showMessage('LTM_SCHEDULED_TESTS_MISSING');
            }
        }
    }
}
