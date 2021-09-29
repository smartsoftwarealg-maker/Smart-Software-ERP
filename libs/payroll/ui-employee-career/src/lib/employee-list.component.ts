import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee as IEmployee, EmployeeService, Career, EmployeeCareerService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService, LanguageService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { tap, switchMap } from 'rxjs/operators';

interface Lookup {
    id: number;
    description: string;
}

// frontend only
interface Employee extends IEmployee {
    fullName: string;
    imageModel: ImageModel;
    // turns false when loading is done
    loading: boolean;
    // career
    career: Career;
}

@Component({
    selector: 'ss-employee-list-career',
    styleUrls: ['./employee-list.component.scss'],
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseEntityListComponent<IEmployee> implements OnInit {

    public displayedColumns = [
        'photo',
        'id',
        'fullname',
        'post',
        'date',
        'payMonth',
        'division',
        'department',
        'service'
    ];

    constructor(
        public employeeSrv: EmployeeService,
        public empCareerSrv: EmployeeCareerService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public httpSrv: HttpService) {
        super(employeeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'PAYROLL_CAREER');
    }

    posts: { [id: number]: string; };
    divisions: { [id: number]: string; };
    departments: { [id: number]: string; };
    services: { [id: number]: string; };

    public preload(): Observable<any> {
        this.posts = {};
        return this.lookupsSrv.getPosts()
            .pipe(
                tap(posts => this.posts = this.lookupListToMap(posts)),
                switchMap(() => this.lookupsSrv.getDepartments()),
                tap(list => this.departments = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getDivisions()),
                tap(list => this.divisions = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getServices()),
                tap(list => this.services = this.lookupListToMap(list))
            );
    }

    lookupListToMap(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public processLoadedData(data: Employee[]): Observable<Employee[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.employeeSrv.getPhotoUrl(p.id), false);
            p.loading = true;
            this.empCareerSrv.setParentId(p.id);
            // incase of error, keep displaying the loading animation
            this.empCareerSrv.getLast()
                .subscribe((x: Career) => {
                    p.career = x;
                    if (p.career) {
                        p.career.from_date = this.langSrv.formatDate(p.career.from_date);
                        p.career.to_date = this.langSrv.formatDate(p.career.to_date);
                    }
                    p.loading = false;
                });
            return p;
        }));
    }

    payMonth(c: Career): string {
        return c && c.paymonth ? this.langSrv.formatPaymonth(c.paymonth) : null;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        this.shellSrv.updateShell();
    }
}
