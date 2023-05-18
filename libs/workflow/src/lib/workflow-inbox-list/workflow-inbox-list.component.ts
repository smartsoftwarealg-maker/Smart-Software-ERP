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
        'key'
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

    private getURL(documentId: number, targetId: number) {
        switch (documentId) {
        case 2:    return `/app/purchases/porders/${targetId}`;
        case 10:   return `/app/purchases/prequests/${targetId}`;
        case 257:  return `/app/sales/delivery/${targetId}`;
        case 258:  return `/app/sales/invoice/${targetId}`;
        case 259:  return `/app/purchases/transfers/${targetId}`;
        case 260:  return `/app/purchases/consumptions/${targetId}`;
        case 262:  return `/app/purchases/creceptions/${targetId}`;
        case 514:  return `/app/purchases/receptions/${targetId}`;
        case 516:  return `/app/purchases/transfer-reception/${targetId}`;
        case 519:  return `/app/purchases/inventory/${targetId}`;
        case 531:  return `/app/assets-app/asset-receptions/${targetId}`;
        case 767:  return `/app/assets-app/inventory-entries/${targetId}`;
        case 1010: return `/app/assets-app/asset-appointments/${targetId}`;
        default:   return '.';
        }
    }
    open(documentId: number, targetId: number) {
        const url = this.getURL(documentId, targetId);
        if (url.length > 5) {
            this.router.navigate([url]).then();
        }
    }
}
