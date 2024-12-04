import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DuplicationService } from '../duplication-service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Insert, Invoice } from '../services-api';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { MatSelectionList } from '@angular/material/list';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-invoice-duplication',
    standalone: true,
    imports: [
        CommonModule,


        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MaterialModule,
        DatePickerComponent
    ],
    templateUrl: './invoice-duplication.component.html',
    styleUrls: ['./invoice-duplication.component.css'],
})
export class InvoiceDuplicationComponent implements OnInit {
    private  confirmationSrv = inject(ConfirmationDialogService);
    private snackBarSrv  = inject(SnackBarService);
    private loginSrv = inject(LoginService);
    private route =  inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private fb = inject(FormBuilder);
    private duplicateSrv = inject(DuplicationService);

    data$: Observable<Invoice[]> = null;
    curYear = new Date().getFullYear();
    prevYear = this.curYear - 1;
    form = this.fb.group({
        month: [1,            Validators.required],
        year:  [this.curYear, Validators.required],
        date:  [new Date(),   Validators.required]
    });

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
    }

    list(list: MatSelectionList) {
        list.deselectAll();
        const formValue = this.form.value;
        const params = new HttpParams()
            .set('month', formValue.month)
            .set('year', formValue.year);
        this.data$ = this.duplicateSrv
            .getList(0, 50, null, null, params)
            .pipe(map(res => res.body));
    }

    private doDuplicate(list: MatSelectionList): Observable<{ count: number }> {
        const e = list.selectedOptions.selected;
        const value = this.form.value;
        const insert: Insert = {
            center: this.loginSrv.appCtx.center,
            date: value.date,
            numbers: e.filter(x => x.value).map(x => +x.value.toString()),
            userId: this.loginSrv.appCtx.id
        };
        return this.duplicateSrv.clone(insert);
    }

    duplicate(list: MatSelectionList) {
        this.confirmationSrv
            .confirm('CONFIRMATION', 'COMMON_DUPLICATE')
            .pipe(switchMap(ans => ans? this.doDuplicate(list) : of({ count: 0}) ))
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    list.deselectAll();
                }
                this.list(list);
            });
    }
}
