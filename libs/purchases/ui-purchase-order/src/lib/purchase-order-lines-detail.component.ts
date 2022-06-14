import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Store, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Article, ArticleAutocompleteModel, ArticleService} from '@ss/stock/api-article';
import {fillObject, LoginService} from '@ss/common/api-common';
import {
    BaseTransactionLinesDetailComponent,
    TransactionLine,
    TransactionLinesService
} from '@ss/logistics/api-transaction';

@Component({
  selector: 'ss-order-lines-detail',
  styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
  templateUrl: './purchase-order-lines-detail.component.html',
})
export class PurchaseOrderLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy  {

    constructor(
        public detailSrv: TransactionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public articleSrv: ArticleService,
        public storeNameSrv: LotsService,
        public lookupsSrv: LookupsService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            storeNameSrv,
            lookupsSrv,
            'PURCHASES_EDIT_ORDER_LINES');
    }
}
