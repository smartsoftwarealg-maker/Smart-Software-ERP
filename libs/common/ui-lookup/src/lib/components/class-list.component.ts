import { Component, inject } from '@angular/core';
import {Class, ClassService, SubclassService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Observable} from 'rxjs';
import {GenerationAccountService} from '@ss/accounting/api-accounts';
import {IsParamService, LanguageService, MaterialModule, PaginatorPersistenceService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'ss-class-list',
    templateUrl: '../base-templates/class-list.component.html',
    styleUrls: ['../base-templates/classes.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class ClassListComponent extends BaseEntityListComponent<Class> {
    #langSrv = inject(LanguageService);

    displayedColumns = ['description', 'descriptionAr', 'accountno'];

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
        if (this.#langSrv.isSodismac) {
            this.displayedColumns = ['descriptionAr', 'description', 'accountno', 'subclassDescription'];
        }
    }

    override processLoadedData(data: Class[]): Observable<Class[]> {
        return this.classSrv.reload(data);
    }
}

@Component({
    selector: 'ss-class-detail',
    templateUrl: '../base-templates/class-detail-template.html',
    styles: [`
        mat-card {
            width: 90%;
            max-width: 600px;
            margin: 8px auto 0;
            padding: 16px;
            border-radius: 1.4em;
        }
        `],
    standalone: true,
    imports: [MaterialModule, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, UiAutoCompleteComponent]
})
export class ClassDetailComponent extends BaseEntityDetailComponent<Class> {
    #subclassSrv = inject(SubclassService);
    #accountSrv =  inject(GenerationAccountService);
    accountLookupModel = new DefaultAutoCompleteModel(this.#accountSrv) ;
    subclassLookupModel = new DefaultAutoCompleteModel(this.#subclassSrv) ;
    langSrv = inject(LanguageService);

    constructor(
        public classSrv: ClassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(classSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CLASS');
    }

    public override setupForm(e: Class): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            accountId:     [e.accountId],
            subclassId:    [e.subclassId]
        });
    }
}
