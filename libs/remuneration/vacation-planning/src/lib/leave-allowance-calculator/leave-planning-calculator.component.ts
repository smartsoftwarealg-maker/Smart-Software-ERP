import { Component, inject, OnInit, signal } from '@angular/core';
import {
    FormsModule,
    FormControl,
    ReactiveFormsModule, FormBuilder
} from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AsyncPipe, DatePipe, DecimalPipe, JsonPipe, NgForOf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { VacationPlanningDetailListComponent } from '../vacation-planning-detail-list/vacation-planning-detail-list.component';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeavePlanningCalculatorService } from '../leave-allowance-calculator.service';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { History } from '@ss/exchange/api-currency-deposit';
import { VHistory } from '../vacation-planning-api';

@Component({
    selector: 'ss-leave-planning-calculator',
    templateUrl: './leave-planning-calculator.component.html',
    styleUrls: ['./leave-planning-calculator.component.scss'],
    standalone: true,
    imports: [MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, VacationPlanningDetailListComponent, MatOption, MatSelect, NgForOf, MatCardContent, JsonPipe, MatIconButton, AsyncPipe, DatePipe, DecimalPipe, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatMiniFabButton, MatRow, MatRowDef, MatTable, MatHeaderCellDef]
})
export class LeavePlanningCalculatorComponent implements OnInit {
    #calcSrv = inject(LeavePlanningCalculatorService);
    #fb = inject(FormBuilder)

    readonly #THIS_YEAR = new Date().getFullYear();
    form = this.#fb.group({
        year:       [this.#THIS_YEAR - 1],
        ssFormula:  [''],
        ssFormula2: [''],
        irgFormula: [''],
    })
    selectedYear = signal(this.#THIS_YEAR - 1);
    period  = new FormControl<number>(  this.#THIS_YEAR);

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

    ssFformulas = toSignal(this.#calcSrv.formulas());
    ssFformulas2 = toSignal(this.#calcSrv.formulas());
    irgFformulas = toSignal(this.#calcSrv.formulas());
    history = signal<VHistory[]>([]);

    selectedId = 0;

    displayedColumns = [
        'employee',
        'name',
        'post',
        'earned',
        'taken',
        'rest',
        'days',
        'toTake'
    ];
    ngOnInit() {
    }


    onSubmit() {
        const value = this.form.value;
        this.#calcSrv
            .history(0, value.year, value.ssFormula, value.irgFormula)
            .subscribe(res => this.history.set(res));
    }

    select(h: VHistory) {
        this.selectedId = h.employee;
    }
}
