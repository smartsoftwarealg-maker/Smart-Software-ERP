import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListOption, MatListSubheaderCssMatStyler, MatSelectionList } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { PayrollMonthService } from '@ss/remuneration/payroll-month';
import { BankService } from '@ss/administration/api-bank';
import { switchMap, tap } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Lookup } from '@ss/common/api-lookup';
import { SocialEDOService } from '@social/social-api';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-social-edo',
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        FormsModule,
        MatButton,
        MatCard,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatListOption,
        MatListSubheaderCssMatStyler,
        MatOption,
        MatSelect,
        MatSelectionList,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        CommonUiDatepickerModule
    ],
    templateUrl: './social-edo.component.html',
    styleUrl: './social-edo.component.scss'
})
export class SocialEdoComponent implements OnInit {
    @ViewChild('blist') blist: MatSelectionList;
    form: UntypedFormGroup = null;
    curYear = new Date().getFullYear();
    curMonth = new Date().getMonth();
    bankList: Lookup[] = [];
    receivingBanks: Lookup[] = [];
    selectedBanks = '';
    edoText: string = '';

    constructor(private shellSrv: ShellService,
        private edoSrv: SocialEDOService,
        private route: ActivatedRoute,
        private formBuilder: UntypedFormBuilder,
        private monthSrv: PayrollMonthService,
        private bankSrv: BankService) {

    }

    ngOnInit(): void {
        this.shellSrv.setTitle('REMUN_EDO');
        this.bankSrv
            .getList(0, 1000)
            .pipe(tap(res => {
                this.bankList = res.body;
                this.selectedBanks = this.bankList.map(e => e.id).join(',');
            }),
            switchMap(_ => this.edoSrv.getCenterBank()),
            tap(res => this.receivingBanks = this.bankList.filter(e => e.id == res)))
            .subscribe(res => this.buildForm(res));
        this.shellSrv.setGoBackPath('../', this.route);
    }

    generate() {
        const selection = this.blist.selectedOptions.selected.map(e => e.value);
        this.shellSrv.setLoading(true);
        this.form.value['bank'] = this.receivingBanks.length > 0? this.receivingBanks[0].id: 0;
        console.log(this.form.value);
        this.edoSrv
            .generate(this.form.value, selection)
            .subscribe({
                next:
                    res => {
                        if (res) {
                            this.edoText = res.join('');
                        }
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
