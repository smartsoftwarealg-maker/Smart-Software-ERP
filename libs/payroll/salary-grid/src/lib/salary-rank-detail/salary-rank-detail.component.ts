import { Component, inject } from "@angular/core";
import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { GridRank } from "../grid-api";
import { MaterialModule } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { RemunerationPaymonthEditorModule } from "@ss/remuneration/paymonth-editor";
import { CommonPayrollModule } from "@ss/payroll-common";
import { GridRankService } from '../grid-rank.service';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
    selector: "ss-salary-grid-list",
    templateUrl: "./salary-rank-detail.component.html",
    styleUrls: ['./salary-rank-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        CommonPayrollModule
    ]
})

export class SalaryRankDetailComponent extends BaseChildEntityDetailComponent<GridRank> {
    private fb = inject(FormBuilder);
    constructor(protected override entitySrv: GridRankService) {
        super(entitySrv, 'GridRank');
    }

    override setupForm(e: GridRank): UntypedFormGroup {
        return this.fb.group({
            id:          [e.id],
            parentId:    [e.parentId || this.entitySrv.getParentId()],
            rank:        [e.rank, Validators.required],
            index:       [e.index, Validators.required],
            baseSalary:  [e.baseSalary, Validators.required],
        });
    }
}
