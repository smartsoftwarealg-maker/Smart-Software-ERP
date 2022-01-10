import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LDocument} from '../document-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService} from '@ss/common/api-lookup';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DocumentNumberingService} from '../document-numbering.service';

@Component({
  selector: 'ss-document-numbering-list',
  templateUrl: './document-numbering-list.component.html',
  styleUrls: ['./document-numbering-list.component.scss']
})
export class DocumentNumberingListComponent extends BaseEntityListComponent<LDocument> {
    displayedColumns = [
        'description',
        'startNumber'
    ];

    constructor(
        public documentSrv: DocumentNumberingService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(documentSrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
            'LOGISTICS_DOCUMENT_NUMBERING');
        this.pagination.pageSize = 15;
    }
}
