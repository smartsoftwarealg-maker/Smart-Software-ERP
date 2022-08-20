import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lookup, Organization } from '@ss/organizations/api-organizations';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService, LoginService } from '@ss/common/api-common';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SnackBarService } from '@ss/common/ui-shell';
import { Level } from './common';
import { OrganizationsService } from '@ss/organizations/api-organizations';
import { DivisionService, DepartmentService, ServiceService, OfficeService } from '@ss/common/api-lookup';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
class LookupService extends BaseEntityService<Lookup> {
    constructor(protected httpSrv: HttpService) {
        super(httpSrv, null);
    }
}

@Component({
    selector: 'ss-organizations-detail',
    templateUrl: './organizations-detail.component.html',
    styleUrls: ['./organizations-detail.component.scss'],
    providers: [
        LookupService
    ]
})
export class OrganizationsDetailComponent {

    public title: string;
    public level: Level;
    public form: UntypedFormGroup = null;
    public saving: boolean = false;
    public lookups: Lookup[];
    public loading = true;
    public organization: Organization;

    constructor(public dialogRef: MatDialogRef<OrganizationsDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public formBuilder: UntypedFormBuilder,
        public snackBarSrv: SnackBarService,
        public loginSrv: LoginService,
        public orgSrv: OrganizationsService,
        private divisionsSrv: DivisionService,
        private departmentSrv: DepartmentService,
        private serviceSrv: ServiceService,
        private officeSrv: OfficeService,
        public httpSrv: HttpService) {

        const titles = [
            ' ',
            'COMMON_DIVISION',
            'COMMON_DEPARTMENT',
            'COMMON_SERVICE',
            'COMMON_OFFICE'
        ];

        this.title = titles[data.level];
        this.level = data.level;
        this.loadLookups().subscribe(o => this.setup({
            center: this.loginSrv.appCtx.center,
            id: 0,
            parentId: !data.id || data.id < 1 ? null : data.id
        }));
    }

    private loadLookups() {
        switch (this.level) {
            case Level.Division:
                return this.divisionsSrv.getListSimple().pipe(tap((list: any[]) => this.lookups = list));
            case Level.Department:
                return this.departmentSrv.getListSimple().pipe(tap((list: any[]) => this.lookups = list));
            case Level.Service:
                return this.serviceSrv.getListSimple().pipe(tap((list: any[]) => this.lookups = list));
            case Level.Office:
                return this.officeSrv.getListSimple().pipe(tap((list: any[]) => this.lookups = list));
        }
        return of([]);
    }

    private setup(org: Organization) {
        this.organization = org;
        this.form = this.formBuilder.group({
            lookup: [null, Validators.required],
        });
        this.loading = false;
    }

    public save(): void {
        if (this.saving) {
            return;
        }
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        this.saving = true;
        switch (this.level) {
            case Level.Division:
                this.organization.division = this.form.value.lookup;
                break;
            case Level.Department:
                this.organization.department = this.form.value.lookup;
                break;
            case Level.Service:
                this.organization.service = this.form.value.lookup;
                break;
            case Level.Office:
                this.organization.office = this.form.value.lookup;
                break;
        }
        this.orgSrv.save(this.organization).subscribe({
            next: () => {
                //this.saving = false;
                this.close(true);
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
            },
            error: (err: Error) => {
                this.snackBarSrv.showFailureMessage();
                this.saving = false;
                throw err;
            }
        })
    }

    close(refresh: boolean) {
        this.dialogRef.close(refresh);
    }
}
