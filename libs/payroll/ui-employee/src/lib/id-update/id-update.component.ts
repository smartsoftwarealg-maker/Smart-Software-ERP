import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
    EmploymentTypeService,
    SuspensionReasonService
} from '@ss/common/api-lookup';
import { FormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-employee';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MaterialModule } from '@ss/common/api-common';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'ss-emp-active-detail',
    templateUrl: './id-update.component.html',
    styleUrls: ['./id-update.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        TranslatePipe]
})
export class IdUpdateComponent implements OnInit {
    #snackBarSrv = inject(SnackBarService);
    #destroyRef = inject(DestroyRef);
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);
    #employeeSrv = inject(EmployeeService);
    #fb = inject(FormBuilder);

    processing = signal(false);

    form = this.#fb.group({
        id:        [0],
        newId:     [0],
        firstName: [{ value: '', disabled: true }],
        lastName: [{ value: '', disabled: true }]
    });

    ngOnInit() {
        this.#shellSrv.setTitle('PAYROLL_ID_UPDATE');
        this.#shellSrv.setGoBackPath('../..', this.#route);
        this.form
            .controls
            .id
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.#destroyRef),
                mergeMap(id => this.#employeeSrv.get(id)),
                catchError((error, source) => {
                    this.form.controls.lastName.setValue('');
                    this.form.controls.firstName.setValue('');
                    return source;
                })
            ).subscribe({
            next: res => {
                this.form.controls.lastName.setValue(res?.lastName||'');
                this.form.controls.firstName.setValue(res?.firstName||'');
            },
            error: err => {
                this.form.reset();
            }
        });
    }

    update() {
        this.processing.set(true);
        if (this.form.controls.id.value > 0 && this.form.controls.newId.value > 0) {
            this.#employeeSrv
                .updateId(this.form.controls.id.value, this.form.controls.newId.value)
                .subscribe({
                    next: res => {
                        this.processing.set(false);
                        this.#snackBarSrv.showSuccessMessage();
                    },
                    error: err => {
                        this.processing.set(false);
                        throw err;
                    }
                });
        }
    }
}
