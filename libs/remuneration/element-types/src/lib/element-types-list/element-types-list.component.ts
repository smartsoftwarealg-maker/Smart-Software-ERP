import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {ElementTypesService} from '../services/element-types.service';
import {ElementType} from '@ss/payroll-common';



import { ReactiveFormsModule } from "@angular/forms";
import { DatePickerComponent } from "@ss/common/ui-datepicker";

import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'ss-element-types-list',
    templateUrl: './element-types-list.component.html',
    styleUrls: ['./element-types-list.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
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
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMENT_TYPES');
        this.pagination.pageSize = 10;
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.addButton.visible = false;
            }));
    }


}
