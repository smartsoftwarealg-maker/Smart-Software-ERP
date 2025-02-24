import { Component } from "@angular/core";
import { MaterialModule } from "@ss/common/api-common";
import { LTMMailingDocument } from '@ltm/ltm-api';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { LtmMailingDocumentService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-ltm-mailing-documents-list',
    templateUrl: './ltm-mailing-documents-list.component.html',
    styleUrls: ['./ltm-mailing-documents-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        TranslatePipe,
        TranslateDirective
    ]
})
export class LtmMailingDocumentsListComponent extends BaseChildEntityListComponent<LTMMailingDocument> {
    override displayedColumns = ['document'];

    readonly documents = ['LTM_PRODUCT_LIBERATION', 'LTM_NON_CONFORMITY', 'LTM_QUALITY_CERTIFICATE'];

    constructor(protected override detailSrv: LtmMailingDocumentService) {
        super(detailSrv, 'LTMMailingDocument');
    }

}
