import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Inbox} from '../workflow-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {WorkflowInboxService} from '../workflow-inbox.service';

@Component({
    selector: 'ss-workflow-inbox-list',
    templateUrl: './workflow-inbox-list.component.html',
    styleUrls: ['./workflow-inbox-list.component.scss'],
})
export class WorkflowInboxListComponent extends BaseEntityListComponent<Inbox> implements OnInit {
    displayedColumns = [
        'document',
        'number',
        'date',
        'message',
        'sender',
        'time',
    ];
    constructor(
        public override entitySrv: WorkflowInboxService,
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
            'ADMINISTRATION_WORKFLOW_INBOX');
    }

    override ngOnInit(): void {
        this.editButton.visible = false;
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();
    }

    changeMode(all: boolean) {
        this.entitySrv.all = all;
        this.refresh();
    }
}
