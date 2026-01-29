import { Component, inject, signal } from '@angular/core';
import {
    FormsModule,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    FormArray,
    FormGroup,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { DecimalPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { LeavePlanningCalculatorService } from '../leave-allowance-calculator.service';
import { MatMiniFabButton } from '@angular/material/button';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { VHistory, VTake } from '../vacation-planning-api';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MaterialModule } from '@ss/common/api-common';
import { SnackBarService } from '@ss/common/ui-shell';

@Component({
    selector: 'ss-leave-planning-calculator',
    templateUrl: './leave-planning-calculator.component.html',
    styleUrls: ['./leave-planning-calculator.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatOption,
        MatSelect,
        DecimalPipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatMiniFabButton,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        MatProgressSpinner,
        TranslateDirective,
        TranslatePipe,
    ],
})
export class LeavePlanningCalculatorComponent {
    #calcSrv = inject(LeavePlanningCalculatorService);
    #fb = inject(FormBuilder);
    snackBarSrv = inject(SnackBarService);
    selection = signal<Set<number>>(new Set());
    readonly #THIS_YEAR = new Date().getFullYear();
    form = this.#fb.group({
        year: [this.#THIS_YEAR - 1],
    });

    daysForm = this.#fb.group({
        list: this.#fb.array<FormGroup<{ employee: FormControl<number>; days: FormControl<number>; }>>([]),
    });

    processing = signal(false);
    period = new FormControl<number>(this.#THIS_YEAR);

    periods: number[] = [
        this.#THIS_YEAR - 10,
        this.#THIS_YEAR - 9,
        this.#THIS_YEAR - 8,
        this.#THIS_YEAR - 7,
        this.#THIS_YEAR - 6,
        this.#THIS_YEAR - 5,
        this.#THIS_YEAR - 4,
        this.#THIS_YEAR - 3,
        this.#THIS_YEAR - 2,
        this.#THIS_YEAR - 1,
        this.#THIS_YEAR,
        this.#THIS_YEAR + 1,
    ];

    // base1 = toSignal(this.#calcSrv.formulas());
    // base2 = toSignal(this.#calcSrv.formulas().pipe(map(res => res.filter(v => v.variable?.startsWith('a')))));
    // base3 = toSignal(this.#calcSrv.formulas().pipe(map(res => res.filter(v => v.variable?.startsWith('b')))));
    history = signal<VHistory[]>([]);

    selectedId = 0;

    displayedColumns = [
        'employee',
        'name',
        'post',
        'earned',
        'earned2',
        'earned3',
        'taken',
        'taken2',
        'taken3',
        'rest',
        'days',
        'toTake',
        'selection',
    ];

    get daysFA() {
        return this.daysForm.get('list') as FormArray;
    }

    onSubmit() {
        const value = this.form.value;
        this.processing.set(true);
        this.form.disable();
        this.#calcSrv.history(0, value.year).subscribe((res) => {
            this.daysForm.controls.list = this.#fb.array<FormGroup<{ employee: FormControl<number>; days: FormControl<number>; }>> (
                res.map((v) => {
                    return this.#fb.group({
                        employee: new FormControl(v.employee),
                        days: new FormControl(+v.toTake.toFixed(2)),
                    });
                }),
            );
            this.history.set(res);
            this.processing.set(false);
            this.form.enable();
        });
    }

    select(h: VHistory) {
        this.selectedId = h?.employee || 0;
        this.selection.update((c) => {
            c.has(this.selectedId)
                ? c.delete(this.selectedId)
                : c.add(this.selectedId);
            return new Set([...c]);
        });
    }

    selectAll() {
        this.selection.set(new Set([...this.history().map((h) => h.employee)]));
    }

    unselectAll() {
        this.selection.set(new Set());
    }

    save() {
         const list = this.daysFA.getRawValue()
           .filter((v) => this.selection().has(v.employee)) as VTake[]
         this.#calcSrv.update({ year: +this.form.controls.year.getRawValue(), list : list }).subscribe({
             next: () => {
                 this.snackBarSrv.showSuccessMessage();
             },
             error: (err) => {
                 this.snackBarSrv.showFailureMessage();
                 throw err
             },
         });
    }
}
