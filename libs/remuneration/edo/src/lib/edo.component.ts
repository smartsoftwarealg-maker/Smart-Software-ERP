import {Component, inject, OnInit, signal, ViewChild, ChangeDetectionStrategy} from '@angular/core';
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

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';
import {Center, LoginService, MaterialModule } from '@ss/common/api-common';
import {CenterService} from "@ss/administration/api-center";


interface Lookup {
    id: number;
    description: string;
}

@Component({
    selector: 'ss-edo',
    templateUrl: './edo.component.html',
    styleUrls: ['./edo.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, DatePickerComponent, MatSelect, MatOption, MatButton, MatListSubheaderCssMatStyler, MatSelectionList, MatListOption, TranslatePipe]
})
export class EdoComponent implements OnInit {
    #_centerSrv = inject(CenterService);
    #loginSrv = inject(LoginService);
    private shellSrv =  inject(ShellService);
    private edoSrv =  inject(EdoService);
    private route =  inject(ActivatedRoute);
    private formBuilder =  inject(UntypedFormBuilder);
    private monthSrv =  inject(PayrollMonthService);
    private bankSrv =  inject(BankService);
    protected curYear = new Date().getFullYear();
    protected curMonth = new Date().getMonth();


    #_form = this.formBuilder.group({
        month:       [this.curMonth,                   Validators.required],
        year:        [this.curYear,                    Validators.required],
        description: ['',                              Validators.required],
        formula:     ['c990',                          Validators.required],
        bank:        [{ value: 0, disabled: true },    Validators.required],
        center:      [this.#loginSrv.appCtx.center,   Validators.required],
        date:        [new Date(),                      Validators.required],
        reference:   [1,                               Validators.required],
        special:     ['0',                             [Validators.required, Validators.minLength(1)]],
        all:         [false]
    });
    @ViewChild('blist') blist: MatSelectionList
    form = signal<UntypedFormGroup|null>(this.#_form);
    loading = signal(true);
    bankList = signal<Lookup[]>([]);
    centers = signal<Center[]>([]);
    receivingBanks = signal<Lookup[]>([]);
    selectedBanks = '';
    edoText: string = '';

    constructor() {
        this.shellSrv.setTitle('PAYROLL_ELECTRONIC_DEPOSIT_ORDER');
    }


    ngOnInit(): void {
        this.#_centerSrv.setParentId(this.#loginSrv.appCtx.company);

        this.bankSrv
            .getList(0, 1000)
            .pipe(tap(res => {
                    this.bankList.set(res.body);
                    this.selectedBanks = this.bankList().map(e => e.id).join(',');
                }),
                switchMap(_ => this.monthSrv.maxMonth()),
                tap(res => {
                    this.curYear = +((res.month % 1_000_000)/100).toFixed(0);
                    this.curMonth = +(res.month % 100).toFixed(0);
                } ),
                switchMap(() => this.#_centerSrv.getList(0, 100)),
                tap(res => this.centers.set(res.body.filter(e => e.id === this.#loginSrv.appCtx.center ||
                    res.body.find(e => e.id === this.#loginSrv.appCtx.center)?.headCenter === true))),
                switchMap(_ => this.edoSrv.getCenterBank()),
                tap(res => this.receivingBanks.set(this.bankList().filter(e => e.id == res))))
            .subscribe(res => {
                this.buildForm(res);
                this.loading.set(false);
            });
        this.shellSrv.setGoBackPath('../', this.route);

    }

    generate() {
        const selection = this.blist.selectedOptions.selected.map(e => e.value);
        this.shellSrv.setLoading(true);
        this.#_form.value['bank'] = this.receivingBanks().length > 0? this.receivingBanks()[0].id: 0;
        this.edoSrv
            .generate(this.#_form.value, selection)
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
        const filename = `${this.#_form?.value.month}-${this.#_form.value.year}.txt`;
        this.#_form.value['bank'] = this.receivingBanks().length > 0? this.receivingBanks()[0].id: 0;
        const selection = this.blist.selectedOptions.selected.map(e => e.value);
        this.shellSrv.setLoading(true);
        this.edoSrv
            .generate(this.#_form.value, selection)
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
        this.#_form.controls.bank.setValue(bank);
        // this.#_form = this.formBuilder.group({
        //     month:       [this.curMonth,                   Validators.required],
        //     year:        [this.curYear,                    Validators.required],
        //     description: ['',                              Validators.required],
        //     formula:     ['c990',                          Validators.required],
        //     bank:        [{ value: bank, disabled: true }, Validators.required],
        //     date:        [new Date(),                      Validators.required],
        //     reference:   [1,                               Validators.required],
        //     special:     ['0',                             [Validators.required, Validators.minLength(1)]],
        //     all: [false]
        // });
        // this.form.set(this.#_form);
    }
}
