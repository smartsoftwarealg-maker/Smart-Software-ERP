import { Component, inject, OnInit, signal } from '@angular/core';
import {AttendanceLogService} from '../attendance-log.service';
import {ShellService} from '@ss/common/ui-shell';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceMachine, ATTReport, TYPES } from '../attendance-api';
import {ActivatedRoute} from '@angular/router';
import { DatePipe, NgStyle } from '@angular/common';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {  MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslatePipe } from '@ss/common/ui-lang';
import { Lookup } from '@ss/common/api-lookup';
import { AttendanceMachineService } from '../attendance-machine.service';
import { sign } from 'chart.js/helpers';
import { MatSelectChange } from '@angular/material/select';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
    selector: 'ss-attendance-log',
    templateUrl: './attendance-log.component.html',
    styleUrls: ['./attendance-log.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateDirective,
        DatePickerComponent,
        NgStyle,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        TranslatePipe,
    ],
})
export class AttendanceLogComponent implements OnInit {
    private attMachineSrv = inject(AttendanceMachineService);
    private langSrv       = inject(LanguageService);
    private attendanceLog = inject(AttendanceLogService);
    private shellSrv      = inject(ShellService);
    private fb            = inject(FormBuilder);
    private route         = inject(ActivatedRoute);
    private datePipe      = new DatePipe(this.langSrv.lang);

    private FIXED_HEADERS    = [
        this.langSrv.translate('COMMON_ID'),
        this.langSrv.translate('COMMON_FIRST_NAME'),
        this.langSrv.translate('COMMON_LAST_NAME'),
        this.langSrv.translate('PAYROLL_POST')
    ];
    private FIXED_COLS = ['id', 'firstName', 'lastName', 'post'];
    private ipList = signal<string[]>([]);

    attendanceMachines: AttendanceMachine[] = [];
    tableWidth            = 390;
    types                 = TYPES
    selected: ATTReport   = null;
    data: ATTReport[]     = [];
    form = this.fb.group({
        id:     [0],
        from:   [new Date(), Validators.required],
        to:     [new Date(), Validators.required],
        type:   [1,          Validators.required],
        source: [1, Validators.required]
    });

    headers = this.FIXED_HEADERS;
    columns = this.FIXED_COLS;
    varHeaders: string[] = [];
    displayedCols = this.headers;
    processing = signal(false);
    fromDatabase = signal(true);

    ngOnInit() {
        registerLocaleData(localeFr);
        registerLocaleData(localeAr);
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('ATTENDANCE');
        this.attMachineSrv
            .getList(0, 1000)
            .subscribe(res => this.attendanceMachines = res.body);
    }

    refresh() {
        this.processing.set(true);
        const value = this.form.value;
        const ipList = this.fromDatabase()? null : this.ipList().join(',');
        this.attendanceLog
            .getReport(value.type, value.id, value.from, value.to, ipList)
            .subscribe({
                next: res => {
                this.data = res;
                if (res) {
                    this.varHeaders = this.getVariableHeaders(new Date(value.from), new Date(value.to));
                    this.tableWidth = (this.data.length || 0) == 0 ? 390 : (this.data[0].attendance?.length ?? 50) * 110 + 390;
                    this.displayedCols = this.FIXED_COLS.concat(this.varHeaders.map((_, i) => `e${i}`));
                    this.columns = this.displayedCols;
                    this.data
                        .forEach(e => {
                            if (e.colors) {
                                e.hexColors = e.colors.map((c, i) => {
                                    if (e.weekends && e.weekends[i]) {
                                        return 'pink';
                                    }
                                    if (c > 0) {
                                        const hex = '0000' + c.toString(16);
                                        return '#' + hex.substring(hex.length - 6);
                                    } else {
                                        return 'inherit';
                                    }
                                });
                            } else {
                                e.hexColors = this.columns.map(() => 'inherit');
                            }
                        });
                }
                this.processing.set(false);
            }, error: err => {
                    this.processing.set(false);
                    throw err;
                }});
    }

    private getVariableHeaders(from: Date, to: Date): string[] {
        const dDay = new Date(from);
        dDay.setDate(dDay.getDate() - 1);
        const length = Math.min(31, Math.round((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000)));
        return  Array.from({length: length }, (v, k) => k)
            .map(i => {
                dDay.setDate(dDay.getDate() + 1);
                dDay.setHours(0, 0, 0);
                return this.datePipe.transform(dDay, 'EE, dd');
            });
    }

    select(item: ATTReport) {
        this.selected = item;
    }

    toggleSource() {
        this.fromDatabase.update(v => !v);
    }

    onSelection(event: MatSelectionListChange) {
        const ip = event.options[0].value as string;
        this.ipList.update(v => event.options[0].selected? [ip, ...v] : v.filter(i => i !== ip));
    }
}
