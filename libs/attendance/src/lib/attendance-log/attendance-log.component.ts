import {Component, inject, OnInit} from '@angular/core';
import {AttendanceLogService} from '../attendance-log.service';
import {ShellService} from '@ss/common/ui-shell';
import {FormBuilder, Validators} from '@angular/forms';
import {Lookup} from '@ss/common/api-lookup';
import {ATTReport, TYPES} from '../attendance-api';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {LanguageService} from '@ss/common/api-common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';

@Component({
    selector: 'ss-attendance-log',
    templateUrl: './attendance-log.component.html',
    styleUrls: ['./attendance-log.component.scss'],
})
export class AttendanceLogComponent implements OnInit {
    private langSrv       = inject(LanguageService);
    private attendanceLog = inject(AttendanceLogService);
    private shellSrv      = inject(ShellService);
    private fb            = inject(FormBuilder);
    private route         = inject(ActivatedRoute);
    private datePipe      = new DatePipe(this.langSrv.lang);

    private FIXED_HEADERS    = [
        this.langSrv.translate('LOGISTICS_ID'),
        this.langSrv.translate('COMMON_FIRST_NAME'),
        this.langSrv.translate('COMMON_LAST_NAME'),
        this.langSrv.translate('PAYROLL_POST')
    ];
    private FIXED_COLS = ['id', 'firstName', 'lastName', 'post'];

    tableWidth            = 390;
    types                 = TYPES
    selected: ATTReport   = null;
    data: ATTReport[]     = [];
    form = this.fb.group({
        id:   [0],
        from: [new Date(), Validators.required],
        to:   [new Date(), Validators.required],
        type: [1,          Validators.required]
    });

    headers = this.FIXED_HEADERS;
    columns = this.FIXED_COLS;
    varHeaders: string[] = [];
    displayedCols = this.headers;

    ngOnInit() {
        registerLocaleData(localeFr);
        registerLocaleData(localeAr);
        this.shellSrv.setGoBackPath('..', this.route);
    }

    refresh() {
        const value = this.form.value;
        this.attendanceLog
            .getReport(value.type, value.id, value.from, value.to)
            .subscribe(res => {
                this.data = res;
                this.varHeaders = this.getVariableHeaders(new Date(value.from), new Date(value.to));
                this.tableWidth = this.data.length == 0 ? 390 : this.data[0].attendance.length * 110 + 390;
                this.displayedCols = this.FIXED_COLS.concat(this.varHeaders.map((_, i) => `e${i}`));
                this.columns = this.displayedCols;
            });
    }

    private getVariableHeaders(from: Date, to: Date): string[] {
        const dDay = new Date(from);
        dDay.setDate(dDay.getDate() - 1);
        return  Array.from({length: (to.getDate() - from.getDate() + 1)}, (v, k) => k)
            .map(i => {
                dDay.setDate(dDay.getDate() + 1);
                dDay.setHours(0, 0, 0);
                return this.datePipe.transform(dDay, 'EE, dd');
            });

    }


    select(item: ATTReport) {
        this.selected = item;
    }
}
