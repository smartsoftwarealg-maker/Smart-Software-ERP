import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/master-data/api-article';
import {LotsService} from '@ss/common/api-lookup';
import {
    BaseTransactionLinesListComponent
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { ReceptionLinesService } from '../reception-lines.service';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-reception-lines-list',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-list.scss'],
    templateUrl: './reception-lines-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
       

        DocInfoComponent
    ]
})
export class ReceptionLinesListComponent  extends BaseTransactionLinesListComponent implements OnInit {
    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
        'vat',
        'total'
    ];

    constructor(
        public override detailSrv: ReceptionLinesService,
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
