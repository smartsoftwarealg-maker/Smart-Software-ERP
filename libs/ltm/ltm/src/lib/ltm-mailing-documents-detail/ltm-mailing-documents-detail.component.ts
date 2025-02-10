import { Component, inject } from '@angular/core';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import {LTMMailingDocument} from '@ltm/ltm-api';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { LtmMatterService } from '@ltm/ltm-api';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { LtmMailingDocumentService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-ltm-mailing-documents-detail',
    templateUrl: './ltm-mailing-documents-detail.component.html',
    styleUrls: ['../line-matter-detail/line-matter-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe
    ]
})
export class LtmMailingDocumentsDetailComponent extends BaseChildEntityDetailComponent<LTMMailingDocument> {
    private articleSrv = inject(LtmMatterService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv);

    constructor(protected override entitySrv: LtmMailingDocumentService) {
        super(entitySrv, 'LTMMixtureDetail');
    }

    override ngOnInit() {
        if (this.entitySrv.getParentId() < 1) {
            this.router.navigate(['..'], { relativeTo: this.route }).then();
        }
        super.ngOnInit();
    }

    setupForm(e: LTMMailingDocument): UntypedFormGroup {
        return this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId || this.entitySrv.getParentId()],
            document:  [e.document, Validators.required],
        });
    }
}
