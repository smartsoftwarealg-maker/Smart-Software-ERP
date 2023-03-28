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

    private FIXED_COLS    = [
        this.langSrv.translate('LOGISTICS_ID'),
        this.langSrv.translate('COMMON_FIRST_NAME'),
        this.langSrv.translate('COMMON_LAST_NAME')];

    types                 = TYPES
    selected: ATTReport   = null;
    data: ATTReport[]     = [];
    form = this.fb.group({
        id:   [0],
        from: [new Date(), Validators.required],
        to:   [new Date(), Validators.required],
        type: [1,          Validators.required]
    });

    headers = this.FIXED_COLS;

    ngOnInit() {
        registerLocaleData(localeFr);
        registerLocaleData(localeAr);
        this.shellSrv.setGoBackPath('..', this.route);
    }

    refresh() {
        const value = this.form.value;
        this.attendanceLog
            .getReport(1, value.id, value.from, value.to)
            .subscribe(res => {
                this.data = res;
                this.headers = this.FIXED_COLS.concat(this.getVariableHeaders(new Date(value.from)));
            });
    }

    private getVariableHeaders(from: Date): string[] {
        return this.data.length == 0 ? [] :
            this.data[0].attendance.map(e => {
                from.setDate(from.getDate() + 1);
                return this.datePipe.transform(from, 'EEEE, dd');
            });
    }

    select(item: ATTReport) {
        this.selected = item;
    }
}
