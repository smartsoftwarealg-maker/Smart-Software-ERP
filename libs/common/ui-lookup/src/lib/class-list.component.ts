import {Component} from '@angular/core';
import {Class, ClassService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Observable} from 'rxjs';
import {
    GenerationAccountAutocompleteModel
} from '@ss/accounting/api-accounts';
import {GenerationAccountService} from '@ss/accounting/api-accounts';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-class-list',
    templateUrl: './base-templates/class-list.component.html',
    styleUrls: ['./base-templates/classes.scss']
})
export class ClassListComponent extends BaseEntityListComponent<Class> {

    displayedColumns = ['description', 'accountno'];

    constructor(
        public classSrv: ClassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(classSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_CLASSES');
        this.pagination.pageSize = 10;
    }

    override processLoadedData(data: Class[]): Observable<Class[]> {
        return this.classSrv.reload(data);
    }
}

@Component({
    selector: 'ss-class-detail',
    templateUrl: './base-templates/class-detail-template.html',
    styles: [`
        .value {
            width: 300px;
            display: block;
            margin: auto;
        }

        form {
        width: 100%;
        padding-top: 16px;
        height: 100px;
        display: flex;
        flex-flow: column;
    }`]
})
export class ClassDetailComponent extends BaseEntityDetailComponent<Class> {
    accountLookupModel = new GenerationAccountAutocompleteModel(this.accountSrv) ;

    constructor(
        public classSrv: ClassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
        private accountSrv: GenerationAccountService) {
        super(classSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CLASS');
    }

    public override setupForm(e: Class): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            accountId: [e.accountId]
        });
    }
}
