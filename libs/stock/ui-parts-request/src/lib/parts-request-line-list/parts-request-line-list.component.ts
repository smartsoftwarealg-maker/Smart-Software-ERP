import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BaseTransactionLinesListComponent
} from '@ss/logistics/api-transaction';
import { LotsService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PartsRequestLineService } from '../services/parts-request-line.service';



import { ArticleService } from '@ss/master-data/api-article';
import { MaterialModule } from '@ss/common/api-common';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        RouterModule,
        ReactiveFormsModule,


        DatePickerComponent,

        DocInfoComponent
    ],
    selector: 'ss-parts-request-line-list',
    standalone: true,
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
    templateUrl: './parts-request-line-list.component.html'
})
export class PartsRequestLineListComponent extends  BaseTransactionLinesListComponent implements OnInit {
    displayedColumns = [
        'position',
        'reference',
        'description',
        'qtyOrdered',
        // 'qtySatisfied',
    ];

    constructor(
        public override detailSrv: PartsRequestLineService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override articleSrv: ArticleService,
        public override storeNamesSrv: LotsService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(detailSrv, shellSrv, snackBarSrv, route, router, articleSrv, storeNamesSrv, confirmationSrv);
    }
}
