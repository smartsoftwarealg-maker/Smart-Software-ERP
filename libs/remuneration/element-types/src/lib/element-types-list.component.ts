import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ElementTypesService} from './element-types.service';
import {ElementType} from '@ss/payroll-common';

@Component({
  selector: 'ss-element-types-list',
  templateUrl: './element-types-list.component.html',
  styleUrls: ['./element-types-list.component.scss']
})
export class ElementTypesListComponent extends BaseEntityListComponent<ElementType>  {
    displayedColumns = [
        'description',
        'field',
        'fieldName'
    ]
    constructor(
        public infoSrv: ElementTypesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMENT_TYPES');
        this.pagination.pageSize = 10;
    }
}
