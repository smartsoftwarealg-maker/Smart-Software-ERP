import {Component, OnInit, ViewChild} from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BankService} from '@ss/administration/api-bank';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSelectionList, MatListSubheaderCssMatStyler, MatListOption } from '@angular/material/list';
import {EdoService} from './edo.service';
import {switchMap, tap} from 'rxjs';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import { MatCard } from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '../../../../common/ui-datepicker/src/lib/date-picker.component';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '../../../../common/ui-lang/src/lib/translate.pipe';

interface Lookup {
    id: number;
    description: string;
}

@Component({
    selector: 'ss-edo',
    templateUrl: './edo.component.html',
    styleUrls: ['./edo.component.scss'],
    standalone: true,
    imports: [MatCard, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, DatePickerComponent, MatSelect, NgFor, MatOption, MatButton, MatListSubheaderCssMatStyler, MatSelectionList, MatListOption, TranslatePipe]
})
export class EdoComponent implements OnInit {
    @ViewChild('blist') blist: MatSelectionList
    form: UntypedFormGroup = null;
    curYear = new Date().getFullYear();
    curMonth = new Date().getFullYear();
    bankList: Lookup[] = [];
    receivingBanks: Lookup[] = [];
    selectedBanks = '';
    edoText: string = '';

    constructor(private shellSrv: ShellService,
                private edoSrv: EdoService,
                private route: ActivatedRoute,
                private formBuilder: UntypedFormBuilder,
                private monthSrv: PayrollMonthService,
                private bankSrv: BankService) {

    }

    ngOnInit(): void {
        this.bankSrv
            .getList(0, 1000)
            .pipe(tap(res => {
                    this.bankList = res.body;
                    this.selectedBanks = this.bankList.map(e => e.id).join(',');
                }),
                switchMap(_ => this.monthSrv.maxMonth()),
                tap(res => {
                    this.curYear = +((res.month % 1_000_000)/100).toFixed(0);
                    this.curMonth = +(res.month % 100).toFixed(0);
                } ),
                switchMap(_ => this.edoSrv.getCenterBank()),
                tap(res => this.receivingBanks = this.bankList.filter(e => e.id == res)))
            .subscribe(res => this.buildForm(res));
        this.shellSrv.setGoBackPath('../', this.route);
    }

    generate() {
        const selection = this.blist.selectedOptions.selected.map(e => e.value);
        this.shellSrv.setLoading(true);
        this.form.value['bank'] = this.receivingBanks.length > 0? this.receivingBanks[0].id: 0;
        this.edoSrv
            .generate(this.form.value, selection)
            .subscribe({
                next:
                    res => {
                        this.edoText = res.join('');
                        this.shellSrv.setLoading(false);
                    },
                error:
                    err => {
                        this.shellSrv.setLoading(false);
                        throw err;
                    }
            });
    }

    save() {
        const filename = `${this.form.value.month}-${this.form.value.year}.txt`;
        this.form.value['bank'] = this.receivingBanks.length > 0? this.receivingBanks[0].id: 0;
        const selection = this.blist.selectedOptions.selected.map(e => e.value);
        this.shellSrv.setLoading(true);
        this.edoSrv
            .generate(this.form.value, selection)
            .subscribe({
                next:
                    res => {
                        // saveAs(new Blob(res), filename)
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(new Blob(res, { type: 'application/octet-stream' }));
                        link.download = filename;
                        link.click();
                        setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                        this.shellSrv.setLoading(false);
                    },
                error:
                    err => {
                        this.shellSrv.setLoading(false);
                        throw err;
                    }
            });
    }

    selectBanks(sel: SelectionModel<any>) {
        this.selectedBanks = sel.selected
                .map(e => e.value)
                .join(',');
    }

    private buildForm(bank: number) {
        this.form = this.formBuilder.group({
            month:       [this.curMonth,                   Validators.required],
            year:        [this.curYear,                    Validators.required],
            description: ['',                              Validators.required],
            formula:     ['c990',                          Validators.required],
            bank:        [{ value: bank, disabled: true }, Validators.required],
            date:        [new Date(),                      Validators.required],
            reference:   [1,                               Validators.required],
            special:     ['0',                             [Validators.required, Validators.minLength(1)]],
            all: [false]
        });
    }
}
