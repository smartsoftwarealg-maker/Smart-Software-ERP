import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import {
    FormBuilder,
    ReactiveFormsModule,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import {LotsService} from '@ss/common/api-lookup';
import { InterStoreTransferLine } from '@ss/logistics/api-transaction';
import { MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {
    ArticleAutoCompleteModel,
    ArticleService, Location,
    LotAutoCompleteModel
} from '@ss/master-data/api-article';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { InterStoreTransferLinesService } from '../interStoreTransfer-lines.service';
import { MatDialog } from '@angular/material/dialog';
import {ArticleSearchDlg} from '@ss/logistics/article-search';

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
    implements OnInit {
    #dialog = inject(MatDialog);
    #formBuilder = inject(FormBuilder);
    #lotSrv = inject(LotsService);
    #articleSrv = inject(ArticleService);

    articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.#articleSrv);
    // articleLookup2: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(
    //     this.articleSrv,
    // );
    lotLookup: LotAutoCompleteModel = new LotAutoCompleteModel(this.#lotSrv);
    selectedStock = signal(0);
    // storeLookup2: LotAutoCompleteModel = new LotAutoCompleteModel(this.lotSrv);
    storeName = signal('');
    stock = signal(0);
    qtyIsNotNull = signal(false);

    constructor(protected override entitySrv: InterStoreTransferLinesService) {
        super(entitySrv, 'PROD_INTER_STORE_TRANSFER_DETAIL');
        this.articleLookup.onValueChanged = (e) => console.log(e);
    }


    override setupForm(e: InterStoreTransferLine): UntypedFormGroup {
        this.storeName.set(e?.storeDescription||'');
        if (e.id > 0) {
            this.entitySrv
                .getStock(e.sourceRef, e.sourceStore)
                .subscribe( res => this.stock.set(res.stock));
        }
        this.qtyIsNotNull.set(e.id > 0 && (e?.qty||0) > 0)

        return this.#formBuilder.group({
            id:               [e.id],
            parentId:         [e.parentId],
            rightId:          [e.rightId || 0],
            sourceRef:        [{ value: e.sourceRef,  disabled: this.qtyIsNotNull()}, Validators.required],
            sourceStore:      [{ value:e.sourceStore, disabled: this.qtyIsNotNull()}, Validators.required],
            qty:              [e.qty||0, Validators.required],
            destinationRef:   [e.destinationRef],
            storeDescription: [e.storeDescription],
            destinationStore: [e.destinationStore],
            lotDescription:   [e.lotDescription],
        });
    }

    showSearchDialog() {
        const dialogRef = this.#dialog.open(ArticleSearchDlg, {
            width: '900px!important',
            height: '620px',
            maxWidth: '900px',
            disableClose: true
        });
        dialogRef
            .afterClosed()
            .subscribe((location: Location|null) => {
                if (location) {
                    this.form.controls['sourceRef'].setValue(location.reference);
                    this.form.controls['sourceStore'].setValue(location.storeId);
                    this.storeName.set(location.storeName);
                    this.stock.set(location.stock);
                }
            });
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.altKey && event.key === 'f') {
            this.showSearchDialog();
            event.preventDefault();
        }
    }
}
