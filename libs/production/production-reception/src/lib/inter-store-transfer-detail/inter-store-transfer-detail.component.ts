import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LotsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    InterStoreTransferLine
} from '@ss/logistics/api-transaction';

import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { InterStoreTransferLinesService } from '../interStoreTransfer-lines.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ArticleAutoCompleteModel, ArticleService, LotAutoCompleteModel } from '@ss/master-data/api-article';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';




@Component({
    selector: 'ss-production-inter-store-transfer-detail',
    templateUrl: './inter-store-transfer-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        RouterOutlet,
        UiAutoCompleteComponent
    ]
})
export class InterStoreTransferDetailComponent extends BaseEntityDetailComponent<InterStoreTransferLine> implements OnInit {
    private articleSrv = inject(ArticleService);
    private lotSrv = inject(LotsService);
    articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
    articleLookup2: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
    storeLookup: LotAutoCompleteModel = new LotAutoCompleteModel(this.lotSrv);
    storeLookup2: LotAutoCompleteModel = new LotAutoCompleteModel(this.lotSrv);

    constructor(
        public override entitySrv: InterStoreTransferLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected readonly loginSrv: LoginService,
        protected dialog: MatDialog) {
        super(entitySrv,
             shellSrv ,
             snackBarSrv,
             route,
             formBuilder,
             confirmationSrv,
            'PROD_INTER_STORE_TRANSFER_DETAIL');
    }

override setupForm(e: InterStoreTransferLine): UntypedFormGroup {
    return this.formBuilder.group({
        id:[e.id],
        sourceRef: [e.sourceRef],
        sourceDescription: [e.sourceDescription],
        sourceStore:[e.sourceStore],
        qty: [e.qty],
        destinationDescription: [e.destinationDescription],
        destinationStore:[e.destinationStore]
    });
}


}
