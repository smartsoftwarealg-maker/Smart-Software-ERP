import { Component, signal, ChangeDetectionStrategy, inject} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Routing } from '../production-routing-services/production-routing-api';
import { ProductionRoutingService } from '../production-routing-services/production-routing.service';
import {RoutingEditDialogComponent} from "../routing-edit-dialog/routing-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'ss-production-list',
    templateUrl: './production-routing-list.component.html',
    styleUrls: ['./production-routing-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        TranslateDirective,
    ],
})
export class ProductionRoutingListComponent extends BaseEntityListComponent<Routing> {
    #dialog = inject(MatDialog);
    readonly displayedColumns = (['routingNumber', 'revision', 'description', 'productName', 'status']);

    constructor(
        public override entitySrv: ProductionRoutingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PROD_PRODUCTIONS_ROUTING',
        );
    }

    override showDetail(id:number){
        if (id === 0) {
            this.openEAddRoutingDialog();
        } else {
            super.showDetail(id);
        }
    }

    openEAddRoutingDialog(): void {
        const routing: Routing = { id: 0, productId: 0, routingNumber: '', revision: '', description: '', status: 'DRAFT', validFrom: new Date()};
        const dialogRef = this.#dialog.open(RoutingEditDialogComponent, {
            width: '900px',
            maxWidth: '900px',
            data: routing, // Pass the current routing object to the dialog
            disableClose: true // Prevent closing by clicking outside
        });

        dialogRef.afterClosed()
            .subscribe((routing: Routing) => {
                console.log('routing', routing);
                if (routing) {
                    this.data = [...this.data, routing]; //.push(routing);
                    this.snackBarSrv.showSuccessMessage();
                    this.cdr.markForCheck();
                }
            });
    }
}
