import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Language, LookupsService } from '@ss/common/api-lookup';
import { EmployeeLanguage, EmployeeLanguagesService } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-emp-languages-detail',
    templateUrl: './employee-languages-detail.component.html',
    styleUrls: ['./employee-languages-detail.component.scss']
})
export class EmployeeLanguagesDetailComponent extends BaseEntityDetailComponent<EmployeeLanguage> implements OnInit, OnDestroy {

    entity: EmployeeLanguage;
    languages: Language[] = [];
    languageLevels: Language[] = [];

    parentId: number = 0;

    constructor(
        public employeeLanguagesSrv: EmployeeLanguagesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(employeeLanguagesSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_LANGUAGES');
    }

    protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p.id;
                    this.employeeLanguagesSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }

    setupForm(a: EmployeeLanguage): UntypedFormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.person_id,
            language_id: [a.language_id, Validators.required],
            read_level: [a.read_level, Validators.required],
            write_level: [a.write_level, Validators.required],
        });
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getLanguages()
            .pipe(
                tap(languages => this.languages = languages),
                switchMap(() => this.lookupsSrv.getLanguageLevels()),
                tap(list => this.languageLevels = list)
            );
    }

    public readForm(): EmployeeLanguage {
        const formVal = this.form.value as EmployeeLanguage;
        formVal.person_id = this.parentId;
        return formVal;
    }
}
