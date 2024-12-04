import { Component } from "@angular/core";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { GridRank } from "../grid-api";
import { MaterialModule } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";


import { GridRankService } from "../grid-rank.service";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: "ss-salary-grid-list",
    templateUrl: "./salary-rank-list.component.html",
    styleUrls: ["./salary-rank-list.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        TranslatePipe,
        TranslateDirective
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
