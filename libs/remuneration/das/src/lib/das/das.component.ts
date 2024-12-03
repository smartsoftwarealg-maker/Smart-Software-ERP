import {Component, OnInit} from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {zip} from 'rxjs';
import {DasService} from '../das.service';
import {Fund, LookupsService} from '@ss/common/api-lookup';
import {ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {Formula, PayrollFormulasService} from '@ss/remuneration/payroll-formulas';
import {LoginService} from '@ss/common/api-common';
import { MatCard } from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';

interface Lookup {
    id: number;
    description: string;
}

@Component({
    selector: 'ss-edo',
    templateUrl: './das.component.html',
    styleUrls: ['./das.component.scss'],
    standalone: true,
    imports: [MatCard, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, MatSelect, NgFor, MatOption, MatButton, TranslatePipe]
})
export class DasComponent implements OnInit {
    form: UntypedFormGroup = null;
    curYear = new Date().getFullYear() - 1;
    funds: Fund[] = [];
    absences: Formula[] = [];
    bases: Formula[] = [];
    edoText: string = '';
    modes: Lookup[] = [{ id: 1, description: 'REMUN_EMPLOYER'},
                       { id: 2, description: 'PAYROLL_EMPLOYEE'}];

    periods: Lookup[] = [{ id: 1, description: 'REMUN_DAYS'},
                         { id: 2, description: 'REMUN_HOURS'}];

    constructor(private shellSrv: ShellService,
                private dasSrv: DasService,
                private route: ActivatedRoute,
                private formBuilder: UntypedFormBuilder,
                private elementInfoSrv: ElementsInfoService,
                private formulaSrv: PayrollFormulasService,
                private fundSrv: LookupsService,
                private loginSrv: LoginService) {

    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('../', this.route);
        this.buildForm();
        zip(this.fundSrv.getFunds(),
            this.formulaSrv.getList(0, 1000, ))
            .subscribe(res => {
                this.funds = res[0];
                this.absences = res[1].body.filter(e => e.description != null &&
                                                        e.variable.startsWith('a') &&
                                                        e.description.toLowerCase().indexOf('abs') >= 0)
                this.bases = res[1].body.filter(e => e.description != null &&
                                               (e.description.toLowerCase().indexOf('base') >= 0 ||
                                                e.variable == 'a998'))
                });
    }

    generate() {
        const value = this.form.value;
        this.shellSrv.setLoading(true);
        this.dasSrv
            .generate(value.year, value.fund, value.modes, value.periods, value.ssBase, value.absence, '' + this.loginSrv.appCtx.center)
            .subscribe({
                next: res => {
                    this.edoText = res.data.join('');
                    this.shellSrv.setLoading(false);
                },
                error: err => {
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }

    save() {
        const value = this.form.value;
        this.shellSrv.setLoading(true);
        this.dasSrv
            .generate(value.year, value.fund, value.modes, value.periods, value.ssBase, value.absence)
            .subscribe({
                next: res => {
                    // saveAs(new Blob(res.data), res.filename)
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(new Blob(res.data));
                    link.download = res.filename;
                    link.click();
                    setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                    this.shellSrv.setLoading(false);
                },
                error: err => {
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }


    private buildForm() {
        this.form = this.formBuilder.group({
            fund: [null, Validators.required],
            year: [this.curYear, Validators.required],
            ssBase: ['a998', Validators.required],
            absence: ['a037', Validators.required],
            modes: [1, Validators.required],
            periods: [2, Validators.required]
        });
    }
}
