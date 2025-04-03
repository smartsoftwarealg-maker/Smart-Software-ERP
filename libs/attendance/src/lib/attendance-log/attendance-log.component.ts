import { Component, inject, OnInit, signal } from '@angular/core';
import {AttendanceLogService} from '../attendance-log.service';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceMachine, ATTReport, TYPES } from '../attendance-api';
import {ActivatedRoute} from '@angular/router';
import { DatePipe, NgStyle } from '@angular/common';
import { dateTimeToStr, LanguageService, MaterialModule } from '@ss/common/api-common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {  MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslatePipe } from '@ss/common/ui-lang';
import { AttendanceMachineService } from '../attendance-machine.service';
import { MatSelectionListChange } from '@angular/material/list';
import { MatRadioChange } from '@angular/material/radio';
import { finalize, map, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

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
        TranslatePipe
    ]
})
export class AttendanceLogComponent implements OnInit {
    private snackBarSrv = inject(SnackBarService);
    private attMachineSrv = inject(AttendanceMachineService);
    private langSrv       = inject(LanguageService);
    private attendanceLog= inject(AttendanceLogService);
    private shellSrv      = inject(ShellService);
    private fb             = inject(FormBuilder);
    private route       = inject(ActivatedRoute);
    private datePipe        = new DatePipe(this.langSrv.lang);
    private uploadSub: Subscription|null  = null;


    private FIXED_HEADERS    = [
        this.langSrv.translate('COMMON_ID'),
        this.langSrv.translate('COMMON_FIRST_NAME'),
        this.langSrv.translate('COMMON_LAST_NAME'),
        this.langSrv.translate('PAYROLL_POST')
    ];
    private FIXED_COLS = ['id', 'firstName', 'lastName', 'post'];
    private ipList = signal<string[]>([]);

    uploadProgress = 0;
    file: File|null = null;
    fileName: string|null = null;
    attendanceMachines: AttendanceMachine[] = [];
    tableWidth            = 390;
    types                 = TYPES
    selected: ATTReport   = null;
    data: ATTReport[]     = [];
    form = this.fb.group({
        id:     [0],
        from:   [new Date(new Date().getTime() - (31 * 24 * 60 * 60 * 1000)), Validators.required],
        to:     [new Date(), Validators.required],
        type:   [1,          Validators.required],
        source: [1, Validators.required]
    });

    headers = this.FIXED_HEADERS;
    columns = this.FIXED_COLS;
    varHeaders: string[] = [];
    displayedCols = this.headers;

    readonly DATABASE = 1;
    readonly MACHINES = 2;
    readonly TEXT = 3;

    processing = signal(false);
    inputSource = signal(this.DATABASE);
    canSaveToDB = signal(false);

    ngOnInit() {
        registerLocaleData(localeFr);
        registerLocaleData(localeAr);
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('ATTENDANCE');
        this.attMachineSrv
            .getList(0, 1000)
            .subscribe(res => this.attendanceMachines = res.body);
    }

    refresh(e: FileList|null) {
        this.onChange(e);
        if (this.inputSource() === this.TEXT) {
            this.upload();
        } else {
            this.doRefresh();
        }
    }
    saveToDB() {
        console.log('____________________saving to DB');
    }

    toggleCanSaveToDB() {
        this.canSaveToDB.update(v => !v);
    }
    private upload() {
        if (this.file) {
            const formData = new FormData();
            const formValue = this.form.value;
            formData.append("id", formValue.id.toString());
            formData.append("from", dateTimeToStr(formValue.from));
            formData.append("to", dateTimeToStr(formValue.to));
            formData.append("file", this.file);

            this.processing.set(true);
            const value = this.form.value;

            this.uploadSub = this.attendanceLog
                .upload(value.type, formData)
                .pipe(finalize(() => this.reset()),
                      map(res => res.body))
                .subscribe({
                    next: (res: any) => {
                        if (res) {
                            this.processData(res);
                        }
                    },
                    error: err => {
                        this.processing.set(false);
                        throw err;
                    }
                });
        }
    }

    doRefresh() {
        this.processing.set(true);
        const value = this.form.value;
        const ipList = this.inputSource()? null : this.ipList().join(',');
        const source = this.attendanceLog.getReport(value.type, value.id, value.from, value.to, ipList);
        source.subscribe({
                next: res => this.processData(res),
                error: err => {
                    this.processing.set(false);
                    throw err;
                }});
    }

    private processData(res: ATTReport[]) {
        const value = this.form.value;
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

    toggleSource(event: MatRadioChange) {
        this.inputSource.set( event.value);
    }

    onSelection(event: MatSelectionListChange) {
        const ip = event.options[0].value as string;
        this.ipList.update(v => event.options[0].selected? [ip, ...v] : v.filter(i => i !== ip));
    }

    onChange(e: FileList|null) {
        this.file = e[0] as File;
        this.fileName = this.file?.name;
    }


    cancelUpload() {
        this.uploadSub.unsubscribe();
        this.reset();
    }

    reset() {
        this.uploadProgress = null;
        this.uploadSub = null;
        this.processing.set(false);
    }

}
