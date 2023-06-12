import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, LotsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ConsumptionLinesService} from '@ss/stock/api-consumption-lines';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ArticleAutoCompleteModel, ArticleService, LotAutoCompleteModel, QtyPrice} from '@ss/stock/api-article';
import {
    BaseTransactionLinesDetailComponent,
    DOC_CONSUMPTION, DOC_CORRECTION_IN,
    DOC_EXTRA_COSTS,
    TransactionLine
} from "@ss/logistics/api-transaction";
import {LoginService} from '@ss/common/api-common';
import {OptionService} from '@ss/logistics/ui-options';


@Component({
    selector: 'ss-consumption-lines-detail',
    templateUrl: './consumption-lines-detail.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class ConsumptionLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(
        public detailSrv: ConsumptionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override articleSrv: ArticleService,
        public override lotSrv: LotsService,
        public override lookupsSrv: LookupsService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            articleSrv,
            lotSrv,
            lookupsSrv,
            'STOCK_EDIT_CONSUMPTION',
            DOC_CORRECTION_IN
        );
    }
}
