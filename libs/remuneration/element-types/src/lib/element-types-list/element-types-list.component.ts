import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {ElementTypesService} from '../services/element-types.service';
import {ElementType} from '@ss/payroll-common';
import { CommonModule } from "@angular/common";


import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-element-types-list',
    templateUrl: './element-types-list.component.html',
    styleUrls: ['./element-types-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        PaginationComponent
    ]
})
export class ElementTypesListComponent extends BaseEntityListComponent<ElementType>  {
    displayedColumns = [
        'description',
        'field',
        'fieldName'
    ];
    constructor(
        public infoSrv: ElementTypesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMENT_TYPES');
        this.pagination.pageSize = 10;
    }

    ngOnInit() {
        this.addButton.visible = false;
        super.ngOnInit();
    }
}
