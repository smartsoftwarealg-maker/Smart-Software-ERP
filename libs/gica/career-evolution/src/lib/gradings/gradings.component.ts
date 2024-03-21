import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EmployeeService, IEmployee, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { GradeService } from '../services/grade.service';
import { Grade } from '../gica-careers-api';
import { LoginService } from '@ss/common/api-common';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'ss-gica-gradings',
    standalone: true,
    imports: [CommonModule,
        CommonUiLangModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        UiPaginationModule,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton, MatHeaderCellDef, MatProgressSpinner, CommonUiAutoCompleteModule, MatHint],
    templateUrl: './gradings.component.html',
    styleUrl: './gradings.component.css'
})
export class GradingsComponent implements OnInit {

    private saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    private CUR_YEAR = new Date().getFullYear() - 1;
    private loginSrv = inject(LoginService);
    private employeeSrv = inject(EmployeeService);
    private gradingSrv = inject(GradeService);
    private fb = inject(FormBuilder);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private destroyRef = inject(DestroyRef);
    private subscription: Subscription|null = null;
    private executionIndex = 1;

    processing = signal(false);

    employeeLookup  = new PersonAutocompleteClass(this.employeeSrv);
    employeeCtrl = new FormControl<number>(0);
    yearCtrl = new FormControl<number>({ value: this.CUR_YEAR, disabled: true });
    gradeCtrl = new FormControl<number>(1 );

    form = this.fb.group({
        index:  [0, [Validators.required, Validators.min(1), Validators.max(3)] ] ,
        grades: this.fb.array([])
    });
    labels = [''];

    ngOnInit(): void {
        this.destroyRef.onDestroy(() => this.subscription?.unsubscribe());
        this.employeeLookup.onObjectSelected = e => this.refresh(e);
        this.shellSrv.setTitle('PAYROLL_GICA_GRADING');
        this.shellSrv.setGoBackPath('../', this.route);
        this.shellSrv.addButton(this.saveButton);

        this.route.data.subscribe(data => {
            this.gradingSrv.gradingMode = !!data['gradingMode'];
        });

        this.subscription = this.gradeCtrl
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged())
            .subscribe(res => {
                if (res && res >= 1 && res <= 3) {
                    this.grades
                        .controls
                        .forEach(c => {
                            const grades = ['grade1', 'grade2', 'finalGrade'];
                            const ctrl = grades[res - 1];
                            grades.forEach(g => (<FormGroup>c).controls[g].disable());
                            (<FormGroup>c).controls[ctrl].enable({ onlySelf: false });
                        });
                }
            });
    }

    get grades(): FormArray {
        return this.form.controls['grades'] as FormArray;
    }

    private refresh(e: IEmployee) {
        this.grades.clear();
        this.labels = [];
        this.gradingSrv
            .get(this.CUR_YEAR, e?.id, this.gradeCtrl.value)
            .subscribe(res => {
                this.executionIndex = this.gradeCtrl.value;
                res.forEach(g => {
                    const idx = this.executionIndex;
                    const temp = this.fb.group({
                        id:          [g.id],
                        year:        [this.CUR_YEAR],
                        employeeId:  [e?.id],
                        criterion:   [g.criterion],
                        description: [g.description],
                        grade1 :     [{ value: g.grade1, disabled: this.gradeCtrl.value !== 1}],
                        grade2:      [{ value: idx >= 2? g.grade2: 0, disabled: this.gradeCtrl.value !== 2}],
                        finalGrade:  [{ value: idx >= 3? g.finalGrade : 0, disabled: !this.gradingSrv.gradingMode || this.gradeCtrl.value !== 3}],
                        userId:      [this.loginSrv.appCtx.id]
                    });
                    this.grades.push(temp);
                    this.labels.push(g.description);
                });
                this.saveButton.disabled = res.length == 0;
            });
    }

    private save() {
        const value = this.form.getRawValue();
        this.processing.set(true);
        this.saveButton.disabled = true;
        this.gradingSrv
            .update(this.gradeCtrl.value, <Grade[]>value.grades)
            .subscribe(res => {
                if (res.length > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.processing.set(false);
                this.saveButton.disabled = false;
            });
    }
}
