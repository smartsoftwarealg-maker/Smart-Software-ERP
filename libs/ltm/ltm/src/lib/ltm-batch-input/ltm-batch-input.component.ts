import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Batch, BTest, LTMLineMatter } from "../ltm-api";
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from "@ss/common/ui-shell";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LtmLineMatterService } from "../services/ltm-line-matter.service";
import { LtmMatterTestService } from "../services/ltm-matter-test.service";
import { LtmBatchService } from "../services/ltm-batch.service";
import { LtmPeriodicityService } from "../services/ltm-periodicity.service";
import { filter, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Lookup } from "@ss/common/api-lookup";
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { LtmTestService } from '../services/ltm-test.service';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";


@Component({
  selector: "ss-ltm-batch-input",
  templateUrl: "./ltm-batch-input.component.html",
  styleUrls: ["./ltm-batch-input.component.scss"],
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
        RouterOutlet
    ],
})
export class LtmBatchInputComponent implements OnInit, OnDestroy {
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

  // matters: LTMLineMatter[] = [];
  filteredMatters: Observable<LTMLineMatter[]> = null;
  periods$: Observable<Lookup[]> = of([]);
  searchField = new FormControl<string | null>("");

  public saveButton: ToolbarButton = {
    icon: "fas fa-save",
    label: "COMMON_SAVE",
    disabled: true,
    visible: true,
    keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
    click: () => this.save()
  };

  public deleteButton: ToolbarButton = {
    icon: "fas fa-trash-alt",
    label: "COMMON_DELETE",
    disabled: true,
    visible: true,
    keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
    click: () => this.delete()
  };


  labels: string[] = [];
  limits: number[][] = [];
  totalsLabels: string[] = [];
  variables: string[] = [];
  formulas: string[] = [];
  selectedMatter: LTMLineMatter = null;
  selectedPeriodicity = 0;
  hourCtrl = new FormControl<number>(0);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group(
    {
      centerId: [this.loginSrv.appCtx.center, Validators.required],
      matterId: [0, Validators.required],
      timeStamp: [this.TODAY, Validators.required],
      tests: this.formBuilder.array([])
    }
  );

  totalsForm = this.formBuilder.group({ totals: this.formBuilder.array([]) });

  constructor() {
    this.TODAY.setHours(0, 0, 0, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    this.shellSrv.setGoBackPath("..", this.route);
    this.shellSrv.setTitle("LTM_BATCH_TESTINGS");
    this.periods$ = this.periodSrv.getList(0, 50).pipe(map(res => res.body));
    const rights = this.shellSrv.getCurrentNodeRights();
    if (rights.edit) {
      this.shellSrv.setButtons([this.saveButton, this.deleteButton]);
    }

    this.subscriptions.push(
      this.form
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
            ).subscribe(() => this.onHour()));

    this.subscriptions.push(
      this.searchField
        .valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged())
        .subscribe(res =>
          this.filteredMatters = this.matterSrv
              .getList(0, 50, res)
              .pipe(map(res => res.body)))
    );
  }


  private refreshFormulas() {
    const values = this.variables.map((v, i) => {
      return v ? this.tests.at(i)?.value.value : 0;
    });
    const result = this.formulas.map(f => 0);
    const program =
      this.variables.filter(v => v).map((v, i) =>
        `const ${v} = ${values[i]};`).join("\n") +
      "\n" +
      this.missingVariables.map(v => `const ${v} = 0;`).join("\n") +
      "\n" +
      this.formulas.map((f, i) => `result[${i}] = ${f};`).join("\n");

    try {
      eval(program);
    } catch (e: any) { /* empty */
    }
    this.totals.controls.forEach((c, i) => c.setValue({ value: (+result[i] || 0).toFixed(2) }));
  }


  get tests(): FormArray {
    return this.form.controls["tests"] as FormArray;
  }

  get totals(): FormArray {
    return this.totalsForm.controls["totals"] as FormArray;
  }

  private refreshData() {
    this.tests.clear();
    this.totals.clear();
    this.formulaMap.clear();
    this.labels = [];
    this.limits = [];
    this.formulas = [];
    this.variables = [];
    this.totalsLabels = [];
    this.form.controls["matterId"].setValue(this.matterTestSrv.getParentId() || 0);
    this.saveButton.disabled = false;
    this.deleteButton.disabled = false;
    this.matterTestSrv.sortColumn = { active: "variable", direction: "" };

    this.testSrv
      .getList(0, 999, null, "variable")
      .pipe(
        tap(res => this.missingVariables = res.body.filter(t => t.variable).map(t => t.variable)),
        tap(res => {
          res.body
            .filter(t => t.variable && t.formula)
            .forEach(v => this.formulaMap.set(v.variable, v.formula));
        }),
        switchMap(_ => this.matterTestSrv.getList(0, 100, null, "id")))
      .subscribe(res => {
        res.body
          .filter(t => (this.selectedPeriodicity < 1 || this.selectedPeriodicity === t.periodicity) && !t.formula)
          .forEach(t => {
            this.labels.push(t.testDescription);
            this.limits.push([t.minValue, t.maxValue || 999]);
            if (t.variable) {
              this.variables.push(t.variable);
            }
            const testForm: FormGroup<{ id: FormControl<number>, testId: FormControl<number>, value: FormControl<number> }> = this.formBuilder.group({
              id:     [{ value: 0, disabled: true }],
              testId: [{ value: t.testId, disabled: true }, Validators.required],
              value:  [0, [Validators.required, Validators.min(t.minValue), Validators.max(t.maxValue || 999)]]
            });
            this.tests.push(testForm);
          });
        this.missingVariables = this.missingVariables.filter(v => this.variables.indexOf(v) < 0);

        res.body
          .filter(t => (this.selectedPeriodicity < 1 || this.selectedPeriodicity === t.periodicity) && t.formula && t.testDescription)
          .forEach(t => {
            this.totalsLabels.push(t.testDescription);
            this.formulas.push(t.formula);
            const testForm = this.formBuilder.group({
              value: [{ value: 0, disabled: true }]
            });
            this.totals.push(testForm);
          });
        this.formulas = this.formulas.map(f => this.replaceFormulas(f));
        const formValue: Batch = this.form.getRawValue() as Batch;
        this.savedData(formValue).subscribe(res => this.tests.setValue(res));
      });
  }

  private replaceFormulas(f: string): string {
    let res = f;
    this.formulaMap.forEach((v, k) => res = res.replace(k, "(" + v + ")"));
    return res;
  }

  onMatter(m: LTMLineMatter) {
    this.selectedMatter = m;
    this.matterTestSrv.setParentId(m.matterId);
    this.deleteButton.disabled = !m?.id;
    this.refreshData();
  }

  private delete() {
    const value = this.form.getRawValue();
    if (value.timeStamp) {
      this.confirmationSrv
        .confirmDelete()
        .pipe(switchMap(b => b? this.entitySrv.deleteBatch(<Batch>value) : of( {count: 0})))
        .subscribe(res => {
          if (res.count > 0) {
            this.snackBarSrv.showSuccessMessage();
            const tests: BTest[] = <BTest[]>value.tests;
            const values = tests.map(e => {
              return <BTest>{ id: 0, testId: e.testId, value: 0 };
            });
            this.tests.setValue(values);
          }
        });
    }
  }

  private save() {
    const formValue: Batch = this.form.getRawValue() as Batch;
    if (!this.form.valid) {
      this.snackBarSrv.showFailureMessage("COMMON_INVALID_FORM");
    } else {
      if (formValue.matterId && formValue.centerId) {
        this.shellSrv.setLoading(true);
        this.entitySrv
          .saveBatch(formValue)
          .pipe(switchMap(() => this.onHour_()))
          .subscribe({
            next: tests => {
              this.tests.setValue(tests);
              this.shellSrv.setLoading(false);
              this.snackBarSrv.showSuccessMessage();
            }, error: err => {
              this.shellSrv.setLoading(false);
              throw err;
            }
          });
      }
    }
  }

  // onPeriod(e: number) {
  //   this.selectedPeriodicity = e;
  //   if (this.matterTestSrv.getParentId() > 0) {
  //     this.refreshData();
  //   }
  // }

  savedData(value: Batch): Observable<BTest[]> {
    const date = new Date(value.timeStamp);
    return this.entitySrv
      .input(value.matterId, date)
      .pipe(map(res => {
        const tests: BTest[] = value.tests as BTest[];
        tests.forEach((e, i) => {
          const test = res.find(t => t.parentId === value.matterId && t.testId === e.testId);
          e.id = test?.id || 0;
          e.value = test?.value || 0;
        });
        return tests;
      }));
  }

  onHourChange() {
      const value = this.form.getRawValue();
      const date = new Date(value.timeStamp);
      date.setHours(this.hourCtrl.value, 0, 0, 0);
      value.timeStamp = date;
      this.form.controls['timeStamp'].setValue(date);
  }

  onHour() {
    const value = this.form.getRawValue();
    const date = new Date(value.timeStamp);
    date.setHours(date.getHours(), 0, 0, 0);
    this.hourCtrl.setValue(date.getHours());
    value.timeStamp = date;
    this.form.controls['timeStamp'].setValue(date);
    const tests: BTest[] = <BTest[]>value.tests;
    tests.forEach(e => e.value = 0);
    this.tests.setValue(tests);
    this.savedData(<Batch>value)
      .subscribe(tests => {
        this.tests.setValue(tests);
      });
  }

  private onHour_(): Observable<BTest[]> {
    const value = this.form.getRawValue();
    const date = new Date(value.timeStamp);
    value.timeStamp = date;
    this.form.controls['timeStamp'].setValue(date);
    const tests: BTest[] = <BTest[]>value.tests;
    tests.forEach(e => e.value = 0);
    this.tests.setValue(tests);
    return this.savedData(<Batch>value);
  }
}
