import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { Person as IPerson, PersonService, EmployeeActivationService } from '@ss/payroll/api-person';
import { Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { LookupsService } from "@ss/common/api-lookup";
import { LanguageService } from "@ss/common/ui-lang";
import { DomSanitizer } from "@angular/platform-browser";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService } from '@ss/common/api-common';

interface Lookup {
    id: number;
    description: string;
}

// frontend only
interface Person extends IPerson {
    fullName: string;
    imageModel: ImageModel;
    // turns false when loading is done
    loading: boolean;
    //
    suspended: boolean;
    from: string;
    to: string;
    suspensionReason: number;
    employmentType: number;
}

@Component({
    selector: 'ss-employee-list',
    styleUrls: ['./employee-list.component.scss'],
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseEntityListComponent<IPerson> implements OnInit {

    public displayedColumns = [
        'photo',
        'id',
        'fullname',
        'date',
        'employmentType',
        'suspended',
        'suspensionReason'
    ];

    employmentTypes: { [id: number]: string; };
    suspensionReasons: { [id: number]: string; };

    constructor(
        public personSrv: PersonService,
        public employeeActivationSrv: EmployeeActivationService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public domSanitizer: DomSanitizer,
        public httpSrv: HttpService) {
        super(personSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_EMPLOYEE_ACTIVATION_SUSPENSION');
    }

    public preload(): Observable<any> {
        return this.lookupsSrv.getEmploymentTypes()
            .pipe(
                tap(list => this.employmentTypes = this.lookupListToMap(list)),
                switchMap(() => this.lookupsSrv.getSuspensionReason()),
                tap(list => this.suspensionReasons = this.lookupListToMap(list))
            );
    }

    lookupListToMap(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public processLoadedData(data: Person[]): Observable<Person[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.birthDate = this.langSrv.formatDate(p.birthDate);
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.personSrv.getPhotoUrl(p.id), false);
            p.loading = true;
            this.employeeActivationSrv.setParentId(p.id);
            // incase of error, keep displaying the loading animation
            this.employeeActivationSrv.getLast()
                .subscribe(x => {
                    p.loading = false;
                    p.employmentType = !!x ? x.employmentType : 0;
                    p.suspensionReason = !!x ? x.suspensionReason : 0;
                    p.from = !!x ? this.langSrv.formatDate(x.hireDate) : null;
                    p.to = !!x ? this.langSrv.formatDate(x.suspensionDate) : null;
                    if (!!x && p.to == null) {
                        p.to = this.langSrv.translate('PAYROLL_TODAY');
                    }
                    p.suspended = !x || x.activityStatus !== 0;
                })
            return p;
        }));
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        this.shellSrv.updateShell();
    }
}
