import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTransactionLinesListComponent } from '@ss/logistics/api-transaction';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@ss/master-data/api-article';
import { LotsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ReservationLinesService } from '../services/reservation-lines.service';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@ss/common/api-common';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-parts-reservation-line-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        ReactiveFormsModule,
        MaterialModule,
        DocInfoComponent,
        PaginationComponent,
        TranslatePipe,
        TranslateDirective,
    ],
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-list.scss',
    ],
    templateUrl: './parts-reservation-line-list.component.html',
})
export class PartsReservationLineListComponent
    extends BaseTransactionLinesListComponent
    implements OnInit {
    override displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
        'total',
    ];

    constructor(
        public override detailSrv: ReservationLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override articleSrv: ArticleService,
        public override storeNamesSrv: LotsService,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            articleSrv,
            storeNamesSrv,
            confirmationSrv,
        );
    }
}
