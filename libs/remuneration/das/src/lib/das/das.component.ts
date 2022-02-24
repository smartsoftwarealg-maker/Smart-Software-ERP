import {Component, OnInit, ViewChild} from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BankService} from '@ss/administration/api-bank';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSelectionList} from '@angular/material/list';
import {saveAs} from 'file-saver';
import {switchMap, tap, zip} from 'rxjs';
import {EdoService} from '@ss/remuneration/edo';
import {DasService} from '../das.service';
import {Fund, LookupsService} from '@ss/common/api-lookup';
import {ElementsInfo, ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {Formula, PayrollFormulasService} from '@ss/remuneration/payroll-formulas';

interface Lookup {
    id: number;
    description: string;
}

@Component({
    selector: 'ss-edo',
    templateUrl: './das.component.html',
    styleUrls: ['./das.component.scss']
})
export class DasComponent implements OnInit {
    form: FormGroup = null;
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
                private formBuilder: FormBuilder,
                private elementInfoSrv: ElementsInfoService,
                private formulaSrv: PayrollFormulasService,
                private fundSrv: LookupsService) {

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
            .generate(value.year, value.fund, value.modes, value.periods, value.ssBase, value.absence)
            .subscribe({
                next: res => {
                    this.edoText = res.data.join('\n');
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
                    saveAs(new Blob(res.data), res.filename)
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
            periods: [1, Validators.required]
        });
    }
}
