import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    Employee, EmployeeService,
    IEmployee,
    PersonAutocompleteClass,
    SubordinateService
} from '@ss/employee-services/employee-services';

import { GradeService } from '../services/grade.service';
import { Grade } from '../gica-careers-api';
import { HttpService, LoginService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { map, Observable, of, Subscription, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-gica-gradings',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
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
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatHeaderCellDef,
        PaginationComponent,
        ImageInputComponent,
        TranslatePipe,
        TranslateDirective
    ],
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

    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.refreshSubordinates()

    };

    private httpSrv = inject(HttpService);
    private loginSrv = inject(LoginService);
    private employeeSrv = inject(EmployeeService);
    private subordinateSrv = inject(SubordinateService);
    private gradingSrv = inject(GradeService);
    private fb = inject(FormBuilder);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private destroyRef = inject(DestroyRef);
    private subscriptions: Subscription[] = [];
    private executionIndex = 1;

    processing = signal(false);
    gradingMode = signal(true);
    emp = signal<IEmployee|null>(null);
    imageModel = new ImageModel(this.httpSrv);

    subordinateLookup  = new PersonAutocompleteClass(this.subordinateSrv);
    // employeeCtrl = new FormControl<number>(0);
    readonly currYear = new Date().getFullYear() - 1;
    yearCtrl = new FormControl<number>({ value: this.currYear, disabled: false }, [Validators.min(this.currYear - 3)]);
    gradeCtrl = new FormControl<number>(1);
    searchCtrl = new FormControl<string>('');

    form = this.fb.group({
        index:  [0, [Validators.required, Validators.min(1), Validators.max(3)] ] ,
        grades: this.fb.array([])
    });
    labels = [''];
    displayedColumns = ['id', 'lastName', 'firstName'];
    paginator = PaginationModel.newInstance({page: 1, pageSize: 10, elementCount: 0});
    data$: Observable<Employee[]> = of([]);
    selectedId = 0;

    ngOnInit(): void {
        this.imageModel.readOnly = true;
        this.destroyRef.onDestroy(() => this.subscriptions.forEach(s => s.unsubscribe()));
        this.subordinateLookup.onObjectSelected = e => this.refresh(e);
        this.shellSrv.setTitle('PAYROLL_GRADING');
        this.shellSrv.setGoBackPath('../', this.route);
        this.shellSrv.setButtons([this.refreshButton, this.saveButton, ]);

        this.route.data.subscribe(data => {
            this.gradingSrv.gradingMode = !!data['gradingMode'];
            this.gradingMode.set(this.gradingSrv.gradingMode);
            this.subordinateLookup  = new PersonAutocompleteClass(this.gradingSrv? this.subordinateSrv : this.employeeSrv);
        });

        this.subscriptions.push(
            this.gradeCtrl
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
                        this.refreshSubordinates();
                    }
                }));

        this.subscriptions.push(
            this.searchCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(() => this.refreshSubordinates()));

        this.paginator.onChange = () => this.refreshSubordinates();
        this.refreshSubordinates();
    }

    refreshSubordinates() {
        const srv = this.gradingMode()? this.subordinateSrv : this.employeeSrv;
        const filter = this.gradingMode()? '//' + this.gradeCtrl.value : '';
        this.data$ = srv
            .getList(this.paginator.page - 1, this.paginator.pageSize, this.searchCtrl.value + filter, this.subordinateSrv.sortColumn)
            .pipe(
                tap(res => this.paginator.elementCount = res.itemCount),
                map(res => res.body)
            );
        this.refresh({id: 0, firstName: null, lastName: null});
    }
    get grades(): FormArray {
        return this.form.controls['grades'] as FormArray;
    }

    private refresh(e: IEmployee) {
        this.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(e.id), false);
        this.emp.set(e);
        this.grades.clear();
        this.labels = [];
        this.gradingSrv
            .get(this.yearCtrl.value, e?.id, this.gradeCtrl.value)
            .subscribe(res => {
                this.executionIndex = this.gradeCtrl.value;
                res.forEach(g => {
                    const idx = this.executionIndex;
                    const temp = this.fb.group({
                        id:          [g.id],
                        centerId:    [g.centerId || this.loginSrv.appCtx.center],
                        year:        [this.yearCtrl.value],
                        employeeId:  [e?.id],
                        criterion:   [g.criterion],
                        description: [g.description],
                        grade1 :     [{ value: g.grade1, disabled: !this.gradingSrv.gradingMode || this.gradeCtrl.value !== 1}],
                        grade2:      [{ value: idx >= 2? g.grade2: 0, disabled: !this.gradingSrv.gradingMode || this.gradeCtrl.value !== 2}],
                        finalGrade:  [{ value: idx >= 3? g.finalGrade : 0, disabled: this.gradeCtrl.value !== 3}],
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

    selectEmployee(emp: Employee) {
        this.selectedId = emp?.id | 0;
        this.refresh(emp);
    }

    sort(event: Sort) {
        this.subordinateSrv.sortColumn = event;
        this.refreshSubordinates();
    }
}
