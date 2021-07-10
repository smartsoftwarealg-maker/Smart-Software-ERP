import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Smtp, SmtpService} from "@ss/administration/api-smtp";
import {DefaultReportService} from '@ss/common/ui-default-report-component';

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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService) {
        super(smtpSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'ADMINISTRATION_SMTP');
    }


}
