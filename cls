[1mdiff --git a/libs/common/assets/src/assets/locale/common_ar.json b/libs/common/assets/src/assets/locale/common_ar.json[m
[1mindex 128d0268e..434cf6558 100644[m
[1m--- a/libs/common/assets/src/assets/locale/common_ar.json[m
[1m+++ b/libs/common/assets/src/assets/locale/common_ar.json[m
[36m@@ -369,5 +369,7 @@[m
     "DECISION_DATE":      "تاريخ القرار",[m
     "PERIOD":             "فترة",[m
     "HR_TABLES":         "جداول الموارد البشرية",[m
[31m-    "PRODUCTION":         "الإنتاج"[m
[32m+[m[32m    "PRODUCTION":         "الإنتاج",[m[41m[m
[32m+[m[32m    "UNSELECT_ALL":       "الغاء اختيار الكل"[m[41m[m
[32m+[m[32m}[m[41m[m
 [m
[1mdiff --git a/libs/common/assets/src/assets/locale/common_en.json b/libs/common/assets/src/assets/locale/common_en.json[m
[1mindex 4631d7f7d..914c0e8e3 100644[m
[1m--- a/libs/common/assets/src/assets/locale/common_en.json[m
[1m+++ b/libs/common/assets/src/assets/locale/common_en.json[m
[36m@@ -367,10 +367,11 @@[m
     "SAVE_PARAMS":        "Save parameters",[m
     "BACK":               "Back",[m
     "SUBMIT":             "Submit",[m
[31m-    "ANOMALIES":         "Anomalies",[m
[32m+[m[32m    "ANOMALIES":          "Anomalies",[m[41m[m
     "DECISION_NO":        "Decision no",[m
     "DECISION_DATE":      "Decision date",[m
     "PERIOD":             "Period",[m
[31m-    "HR_TABLES": "HR tables",[m
[31m-    "PRODUCTION": "Production"[m
[32m+[m[32m    "HR_TABLES":          "HR tables",[m[41m[m
[32m+[m[32m    "PRODUCTION":         "Production",[m[41m[m
[32m+[m[32m    "UNSELECT_ALL":       "Unselect all"[m[41m[m
 }[m
[1mdiff --git a/libs/common/assets/src/assets/locale/common_fr.json b/libs/common/assets/src/assets/locale/common_fr.json[m
[1mindex 5c25b78a8..0e0cd36ad 100644[m
[1m--- a/libs/common/assets/src/assets/locale/common_fr.json[m
[1m+++ b/libs/common/assets/src/assets/locale/common_fr.json[m
[36m@@ -371,6 +371,7 @@[m
     "DECISION_NO":        "N° Décision ",[m
     "DECISION_DATE":      "Date de la décision",[m
     "PERIOD":             "Période",[m
[31m-    "HR_TABLES":        "Tables RH",[m
[31m-    "PRODUCTION":          "Production"[m
[32m+[m[32m    "HR_TABLES":          "Tables RH",[m[41m[m
[32m+[m[32m    "PRODUCTION":         "Production",[m[41m[m
[32m+[m[32m    "UNSELECT_ALL":       "UNSELECT TOUS"[m[41m[m
 }[m
[1mdiff --git a/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.html b/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.html[m
[1mindex 9cbfc5519..23a773b3e 100644[m
[1m--- a/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.html[m
[1m+++ b/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.html[m
[36m@@ -14,7 +14,7 @@[m
         <button mat-mini-fab[m
                 class="default-25 small-50"[m
                 type="submit"[m
[31m-                matTooltip="'COMMON_REFRESH'|translate"[m
[32m+[m[32m                matTooltip="{{'COMMON_REFRESH'|translate}}"[m
                 color="primary">[m
             <i class="fa-solid fa-arrows-rotate"></i>[m
         </button>[m
[36m@@ -22,7 +22,7 @@[m
                 class="default-25 small-50"[m
                 type="button"[m
                 color="primary"[m
[31m-                matTooltip="'COMMON_SELECT_ALL'|translate"[m
[32m+[m[32m                matTooltip="{{'COMMON_SELECT_ALL'|translate}}"[m
                 (click)="selectAll()">[m
             <i class="fa-solid fa-check-double"></i>[m
         </button>[m
[36m@@ -30,10 +30,18 @@[m
                 class="default-25 small-50"[m
                 type="button"[m
                 color="primary"[m
[31m-                matTooltip="'COMMON_UNSELECT_ALL'|translate"[m
[32m+[m[32m                matTooltip="{{'COMMON_UNSELECT_ALL'|translate}}"[m
                 (click)="unselectAll()">[m
             <i class="fa-solid fa-circle-xmark"></i>[m
         </button>[m
[32m+[m[32m        <button mat-mini-fab[m
[32m+[m[32m                class="default-25 small-50"[m
[32m+[m[32m                type="button"[m
[32m+[m[32m                color="primary"[m
[32m+[m[32m                matTooltip="{{'COMMON_SAVE'|translate}}"[m
[32m+[m[32m                (click)="save()">[m
[32m+[m[32m            <i class="fas fa-save"></i>[m
[32m+[m[32m        </button>[m
     </form>[m
 </mat-card>[m
 [m
[36m@@ -42,8 +50,9 @@[m
         <mat-spinner></mat-spinner>[m
     </div>[m
 } @else {[m
[31m-    <div class="table__container">[m
[31m-        <mat-table mat-table [dataSource]="history()" class="main-table">[m
[32m+[m[32m    <form [formGroup]="form" class="leave__form" (submit)="onSubmit()">[m
[32m+[m[32m    <div formArrayName="list" class="table__container">[m
[32m+[m[32m        <mat-table mat-table [dataSource]="form.controls.list.getRawValue()" class="main-table">[m
 [m
             <ng-container matColumnDef="employee">[m
                 <mat-header-cell *matHeaderCellDef translate>PAYROLL_ID</mat-header-cell>[m
[36m@@ -122,6 +131,8 @@[m
             <ng-container matColumnDef="days">[m
                 <mat-header-cell *matHeaderCellDef translate>COMMON_DAYS</mat-header-cell>[m
                 <mat-cell *matCellDef="let e">[m
[32m+[m[32m                    <input type="number" style="border-radius: 1.6em; max-width: 50px; text-align: center"[m
[32m+[m[32m                           formControlName="days">[m
                     {{ e.days| number: '1.0-2' }}[m
                 </mat-cell>[m
             </ng-container>[m
[36m@@ -146,6 +157,7 @@[m
                      *matRowDef="let row; columns: displayedColumns;"></mat-row>[m
         </mat-table>[m
     </div>[m
[32m+[m[32m    </form>[m
 }[m
 [m
 [m
[1mdiff --git a/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.ts b/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.ts[m
[1mindex c25d8eb48..92265ccc1 100644[m
[1m--- a/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.ts[m
[1m+++ b/libs/remuneration/vacation-planning/src/lib/leave-allowance-calculator/leave-planning-calculator.component.ts[m
[36m@@ -25,7 +25,7 @@[m [mimport {[m
     MatRowDef,[m
     MatTable[m
 } from '@angular/material/table';[m
[31m-import { VHistory } from '../vacation-planning-api';[m
[32m+[m[32mimport { VHistory, VTake, VUpdate } from '../vacation-planning-api';[m
 import { MatProgressSpinner } from '@angular/material/progress-spinner';[m
 import { MaterialModule } from '@ss/common/api-common';[m
 import { map } from 'rxjs/operators';[m
[36m@@ -58,20 +58,24 @@[m [mimport { map } from 'rxjs/operators';[m
         MatTable,[m
         MatHeaderCellDef,[m
         MatProgressSpinner,[m
[31m-        TranslateDirective[m
[31m-    ][m
[32m+[m[32m        TranslateDirective,[m
[32m+[m[32m        TranslatePipe,[m
[32m+[m[32m    ],[m
 })[m
 export class LeavePlanningCalculatorComponent {[m
     #calcSrv = inject(LeavePlanningCalculatorService);[m
[31m-    #fb = inject(FormBuilder)[m
[32m+[m[32m    #fb = inject(FormBuilder);[m
 [m
[31m-    selection = signal<Set<number>>(new Set());[m
[32m+[m[32m    selection = signal<Set<VTake>>(new Set());[m
     readonly #THIS_YEAR = new Date().getFullYear();[m
     form = this.#fb.group({[m
[31m-        year:  [this.#THIS_YEAR - 1],[m
[31m-    })[m
[32m+[m[32m        year: [this.#THIS_YEAR - 1],[m
[32m+[m[32m        list: this.#fb.array<VHistory>([])[m
[32m+[m[32m    });[m
[32m+[m
[32m+[m
     processing = signal(false);[m
[31m-    period  = new FormControl<number>(  this.#THIS_YEAR);[m
[32m+[m[32m    period = new FormControl<number>(this.#THIS_YEAR);[m
 [m
     periods: number[] = [[m
         this.#THIS_YEAR - 10,[m
[36m@@ -89,9 +93,17 @@[m [mexport class LeavePlanningCalculatorComponent {[m
     ];[m
 [m
     base1 = toSignal(this.#calcSrv.formulas());[m
[31m-    base2 = toSignal(this.#calcSrv.formulas().pipe(map(res => res.filter(v => v.variable?.startsWith('a')))));[m
[31m-    base3 = toSignal(this.#calcSrv.formulas().pipe(map(res => res.filter(v => v.variable?.startsWith('b')))));[m
[31m-    history = signal<VHistory[]>([]);[m
[32m+[m[32m    base2 = toSignal([m
[32m+[m[32m        this.#calcSrv[m
[32m+[m[32m            .formulas()[m
[32m+[m[32m            .pipe(map((res) => res.filter((v) => v.variable?.startsWith('a')))),[m
[32m+[m[32m    );[m
[32m+[m[32m    base3 = toSignal([m
[32m+[m[32m        this.#calcSrv[m
[32m+[m[32m            .formulas()[m
[32m+[m[32m            .pipe(map((res) => res.filter((v) => v.variable?.startsWith('b')))),[m
[32m+[m[32m    );[m
[32m+[m[32m    //history = signal<VHistory[]>([]);[m
 [m
     selectedId = 0;[m
 [m
[36m@@ -108,36 +120,52 @@[m [mexport class LeavePlanningCalculatorComponent {[m
         'rest',[m
         'days',[m
         'toTake',[m
[31m-        'selection'[m
[32m+[m[32m        'selection',[m
     ];[m
 [m
[31m-[m
     onSubmit() {[m
         const value = this.form.value;[m
         this.processing.set(true);[m
         this.form.disable();[m
[31m-        this.#calcSrv[m
[31m-            .history(0, value.year)[m
[31m-            .subscribe(res => {[m
[31m-                this.history.set(res);[m
[31m-                this.processing.set(false);[m
[31m-                this.form.enable();[m
[31m-            });[m
[32m+[m[32m        this.#calcSrv.history(0, value.year).subscribe((res) => {[m
[32m+[m[32m            this.form.controls['list'].setValue(res);[m
[32m+[m[32m            this.processing.set(false);[m
[32m+[m[32m            this.form.enable();[m
[32m+[m[32m        });[m
     }[m
 [m
     select(h: VHistory) {[m
[31m-        this.selectedId = h?.employee||0;[m
[31m-        this.selection.update(c => {[m
[31m-            c.has(this.selectedId) ? c.delete(this.selectedId) : c.add(this.selectedId);[m
[32m+[m[32m        this.selectedId = h?.employee || 0;[m
[32m+[m[32m        const employee = {employee: this.selectedId, days : h?.days | 0 } ;[m
[32m+[m[32m        this.selection.update((c) => {[m
[32m+[m[32m            c.has(employee)[m
[32m+[m[32m                ? c.delete(employee)[m
[32m+[m[32m                : c.add(employee);[m
             return new Set([...c]);[m
[31m-        })[m
[32m+[m[32m        });[m
     }[m
 [m
     selectAll() {[m
[31m-        this.selection.set(new Set([...this.history().map(h => h.employee)]));[m
[32m+[m[32m        this.selection.set(new Set([...this.form.controls['list'].getRawValue().map([m
[32m+[m[32m          h => {return {employee: h.employee, days: h.days } }[m
[32m+[m[32m        )]));[m
     }[m
 [m
     unselectAll() {[m
         this.selection.set(new Set());[m
     }[m
[32m+[m
[32m+[m[32m    save(){[m
[32m+[m[32m        const list = this.form.controls['list'].getRawValue().filter(v => v.);[m
[32m+[m
[32m+[m[32m        const value : VUpdate = { year: this.form.controls.year, list : this.selection. as VTake[] };[m
[32m+[m[32m        this.#calcSrv.update(value).subscribe({[m
[32m+[m[32m            next:() => {[m
[32m+[m[32m                console.log(this.selectedId);[m
[32m+[m[32m            },[m
[32m+[m[32m            error: err => {[m
[32m+[m[32m                console.log(err);[m
[32m+[m[32m            }[m
[32m+[m[32m        })[m
[32m+[m[32m    }[m
 }[m
