import { Component, inject } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {UserDocument} from '../workflow-api';
import {FormControl} from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';
import {UserDocumentService} from '../user-document.service';
import { UiAutoCompleteComponent, UserLookup } from '@ss/common/ui-auto-complete';






import { OrgChartModule } from 'angular13-organization-chart';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-user-document-list',
    templateUrl: './user-document-list.component.html',
    styleUrls: ['./user-document-list.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    OrgChartModule,
    PaginationComponent,
    UiAutoCompleteComponent
]
})
export class UserDocumentListComponent extends BaseEntityListComponent<UserDocument> {
    private usersSrv =  inject(UserListService);
    userCtrl = new FormControl<number>(0);
    userAutoComplete = new UserLookup(this.usersSrv);
    displayedColumns = [
        'documentDescription',
    ];

    constructor(
        public override entitySrv: UserDocumentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ADMINISTRATION_USER_DOCUMENTS');
        this.userAutoComplete.onObjectSelected = u => {
            this.entitySrv.setParentId(u?.id || 0);
            this.refresh();
        };
        this.entitySrv.setParentId(0);
    }
}
