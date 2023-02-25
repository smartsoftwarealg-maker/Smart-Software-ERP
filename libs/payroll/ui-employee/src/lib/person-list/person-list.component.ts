import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonSummary as IPersonSummary, PersonListService } from '@ss/payroll/api-employee';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ImageModel } from '@ss/common/ui-image-input';
import { HttpService, LanguageService, PaginatorPersistenceService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';

interface Lookup {
    id: number;
    description: string;
}

// frontend only
interface PersonSummary extends IPersonSummary {
    fullName: string;
    imageModel: ImageModel;
}

@Component({
    selector: 'ss-person-list',
    styleUrls: ['./person-list.component.scss'],
    templateUrl: './person-list.component.html'
})
export class PersonListComponent extends BaseEntityListComponent<IPersonSummary> implements OnInit {
    activePersonnel = true;
    public displayedColumns = [
        'photo',
        'id',
        'fullname',
        'birth',
        'post',
        'department',
        'service',
        'maritalStatus',
        'employmentType',
        'hireDate',
        'profCategory',
        'contractType',
        'categSection',
        'rank'
    ];

    maritalStatus: { [id: number]: string; };
    nationalities: { [id: number]: string; };

    constructor(
        public personListSrv: PersonListService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(personListSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PAYROLL_EMPLOYEE_SUMMARY');
        this.pagination.pageSize = 15;
        this.deleteButton.visible = false;
        this.editButton.visible = false;
        this.addButton.visible = false;
    }

    trackByFn(index: number, item: PersonSummary) {
        return item.id;
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('..', this.route);
        this.addButton.visible = false;
    }

    public override select(id: number): void {
        //const disableControls = id == null || id < 1;
        super.select(id);
    }

    onLookupLoaded(data: Lookup[]): { [id: number]: string; } {
        const map: { [id: number]: string; } = {};
        data.forEach(m => map[m.id] = m.description);
        return map;
    }

    public override processLoadedData(data: PersonSummary[]): Observable<PersonSummary[]> {
        return of(data.map(p => {
            // note: formatting the date here means it will not change when the language
            // is changed until the page is refreshed
            p.birthDate = this.langSrv.formatDate(p.birthDate);
            p.hireDate = this.langSrv.formatDate(p.hireDate);
            p.fullName = this.langSrv.formatFullName(p.firstName, p.lastName);
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.personListSrv.getPhotoUrl(p.id), false);
            return p;
        }));
    }
}
