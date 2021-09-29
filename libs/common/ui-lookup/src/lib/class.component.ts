import {Component} from '@angular/core';
import {Class, ClassService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Observable} from 'rxjs';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {
    AccountAutocompleteModel,
    AccountService,
    GenerationAccountAutocompleteModel
} from '@ss/accounting/api-accounts';
import {GenerationAccountService} from "../../../../accounting/api-accounts/src/lib/generation-account.service";


@Component({
    selector: 'ss-class-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/classes.scss']
})
export class ClassListComponent extends BaseEntityListComponent<Class> {

    displayedColumns = ['description', 'accountId'];

    constructor(
        public classSrv: ClassService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(classSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_CLASSES');
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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder,
        private accountSrv: GenerationAccountService) {
        super(classSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CLASS');
    }

    public setupForm(e: Class): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            accountId: [e.accountId]
        });
    }

}
