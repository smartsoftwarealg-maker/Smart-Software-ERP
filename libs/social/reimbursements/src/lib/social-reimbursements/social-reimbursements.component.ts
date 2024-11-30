import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    EmployeeAidService,
    ReimbursementService,
    SocialAid,
    SocialEmployeeService
} from '@social/social-api';
import { IEmployee, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { dateToYmdStr, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { map, Observable, of } from 'rxjs';
import { SocialReimbursementsListComponent } from '../social-reimbursements-list/social-reimbursements-list.component';
import { ShellService } from '@ss/common/ui-shell';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-social-reimbursements',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        RouterOutlet,
        CommonUiDatepickerModule,
        SocialReimbursementsListComponent,
        PaginationComponent
    ],
    templateUrl: './social-reimbursements.component.html',
    styleUrl: './social-reimbursements.component.scss',
})
export class SocialReimbursementsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private employeeSrv  = inject(SocialEmployeeService);
    private employeeAidSrv = inject(EmployeeAidService);
    private reimbursementSrv = inject(ReimbursementService);
    private fb = inject(FormBuilder);
    private shellSrv = inject(ShellService);

    pagination = PaginationModel.newInstance({page: 0, pageSize: 10, elementCount: 0});

    data$ =  signal<Observable<SocialAid[]>>( of([]));

    displayedColumns = [
        'typeDescription',
        'number',
        'date',
        'amount',
        'installmentCount'
    ];

    form = this.fb.group({
        employee: [0],
        date:     [new Date(new Date().getTime() - 365 * 24 * 3600 * 1000), new Date()],
    });

    employeeLookup = new PersonAutocompleteClass(this.employeeSrv);
    parentId = signal(0);

    constructor() {
        this.employeeLookup.onObjectSelected = e => this.refresh(e);
    }

    select(id: number) {
        this.parentId.set(id);
        this.reimbursementSrv.setParentId(id);
    }

    private refresh(e: IEmployee) {
        const formValue = this.form.getRawValue();
        this.employeeAidSrv.setParentId(e?.id||0);
        const obs = this
            .employeeAidSrv
            .getList(this.pagination.page - 1, this.pagination.pageSize, dateToYmdStr(formValue.date), null)
            .pipe(map(res => {
                this.pagination.elementCount = res.itemCount;
                return res.body;
            }));
        this.data$.set(obs);
    }

    ngOnInit() {
        this.shellSrv.setTitle('SOCIAL_REIMBURSEMENTS');
        this.shellSrv.setGoBackPath('..', this.route);
    }
}
