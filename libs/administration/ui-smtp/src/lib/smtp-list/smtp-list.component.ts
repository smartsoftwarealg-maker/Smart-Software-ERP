import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Smtp, SmtpService} from '@ss/administration/api-smtp';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-smtp-list',
    styleUrls: ['./smtp-list.component.scss'],
    templateUrl: './smtp-list.component.html'
})
export class SmtpListComponent extends BaseEntityListComponent<Smtp> {


    displayedColumns = [
        'domain',
        'property',
        'property_value'
    ];


    constructor(
        public smtpSrv: SmtpService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(smtpSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'ADMINISTRATION_SMTP');
        this.pagination.pageSize = 10;
    }
}
