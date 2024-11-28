import { Component, inject } from '@angular/core';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { LTMMixtureDetail } from '@ltm/ltm-api';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { LtmMixtureDetailService } from '@ltm/ltm-api';
import { LtmMatterService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-matter-test-detail',
    templateUrl: './ltm-mixture-detail-detail.component.html',
    styleUrls: ['../line-matter-detail/line-matter-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule,
        TranslatePipe
    ]
})
export class LtmMixtureDetailDetailComponent extends BaseChildEntityDetailComponent<LTMMixtureDetail> {
    private articleSrv = inject(LtmMatterService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv);

    constructor(protected override entitySrv: LtmMixtureDetailService) {
        super(entitySrv, 'LTMMixtureDetail');
    }

    setupForm(e: LTMMixtureDetail): UntypedFormGroup {
        return this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId || this.entitySrv.getParentId()],
            matterId:  [e.matterId],
        });
    }
}
