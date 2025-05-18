import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    ReactiveFormsModule,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { LotsService } from '@ss/common/api-lookup';
import { InterStoreTransferLine } from '@ss/logistics/api-transaction';
import { MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {
    ArticleAutoCompleteModel,
    ArticleService,
    LotAutoCompleteModel,
} from '@ss/master-data/api-article';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { InterStoreTransferLinesService } from '../interStoreTransfer-lines.service';

@Component({
    selector: 'ss-production-inter-store-transfer-lines-detail',
    templateUrl: './inter-store-transfer-lines-detail.component.html',
    styleUrl: './inter-store-transfer-lines-detail.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslatePipe,
    ],
})
export class InterStoreTransferLinesDetailComponent
    extends BaseChildEntityDetailComponent<InterStoreTransferLine>
    implements OnInit
{
    private formBuilder = inject(FormBuilder);

    private articleSrv = inject(ArticleService);
    private lotSrv = inject(LotsService);
    articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(
        this.articleSrv,
    );
    articleLookup2: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(
        this.articleSrv,
    );
    storeLookup: LotAutoCompleteModel = new LotAutoCompleteModel(this.lotSrv);
    storeLookup2: LotAutoCompleteModel = new LotAutoCompleteModel(this.lotSrv);

    constructor(protected override entitySrv: InterStoreTransferLinesService) {
        super(entitySrv, 'PROD_INTER_STORE_TRANSFER_DETAIL');
    }

    override setupForm(e: InterStoreTransferLine): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            parentId: [e.parentId],
            rightId: [e.rightId || 0],
            sourceRef: [e.sourceRef, Validators.required],
            sourceStore: [e.sourceStore, Validators.required],
            qty: [e.qty, Validators.required],
            destinationRef: [e.destinationRef, Validators.required],
            destinationStore: [e.destinationStore, Validators.required],
        });
    }
}
