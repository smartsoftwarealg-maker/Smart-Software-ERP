import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ArticleService} from '@ss/stock/api-article';
import {
    BaseTransactionLinesDetailComponent,
    TransactionLinesService
} from '@ss/logistics/api-transaction';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './reception-lines-detail.component.html'
})
export class ReceptionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(
        public receptionLinesSrv: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public router: Router,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(receptionLinesSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            storeNameSrv,
            lookupsSrv,
            'STOCK_EDIT_RECEPTION_LINES'
        );
    }

    ngOnInit() {
        super.onInit();
    }

    ngOnDestroy() {
        super.onDestroy();
    }
}
