import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LtmNormTreeService } from '@ltm/ltm-api';
import { NormTree } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'ss-ltm-norm-tree',
    templateUrl: './ltm-norm-tree.component.html',
    styleUrls: ['./ltm-norm-tree.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        ReactiveFormsModule
    ],
})
export class LtmNormTreeComponent extends BaseEntityListComponent<NormTree> implements OnInit {

    displayedColumns = [
        'matter',
    ];

    constructor(
        public override entitySrv: LtmNormTreeService,
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
            'LTM_TEST_NORMS');
        this.pagination.pageSize = 15;
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.deleteButton.visible = false;
                this.addButton.visible = false;
                this.editButton.visible = false;
            }));
    }



    toggle(e: NormTree) {
        e.expanded = !e.expanded;
    }
}
