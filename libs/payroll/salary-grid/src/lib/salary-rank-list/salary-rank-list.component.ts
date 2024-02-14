import { Component } from "@angular/core";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { GridRank } from "../grid-api";
import { MaterialModule } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { RemunerationPaymonthEditorModule } from "@ss/remuneration/paymonth-editor";
import { CommonPayrollModule } from "@ss/payroll-common";
import { GridRankService } from "../grid-rank.service";

@Component({
    selector: "ss-salary-grid-list",
    templateUrl: "./salary-rank-list.component.html",
    styleUrls: ["./salary-rank-list.component.scss"],
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
export class SalaryRankListComponent extends BaseChildEntityListComponent<GridRank> {
    override displayedColumns = [
        "rank",
        "index",
        "baseSalary",
    ];

    constructor(protected override detailSrv: GridRankService) {
        super(detailSrv, 'GridRank');
    }
}
