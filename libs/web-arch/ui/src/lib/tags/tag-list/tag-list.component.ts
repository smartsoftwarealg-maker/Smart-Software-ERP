import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from './tag.service';
import {Tag} from '../tag';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService} from '@ss/common/api-lookup';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
  selector: 'ss-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})

export class TagListComponent extends BaseEntityListComponent<Tag>  {

  public displayedColumns = ['description'];

    constructor(
        public tagSrv: TagService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(tagSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'WAR_TAGS');
    }
}
