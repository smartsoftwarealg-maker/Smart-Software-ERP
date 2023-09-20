import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { JournalUser, JournalUserService } from "@ss/treasury/api-journal";
import { CMMSRoutingPartService } from "@ss/cmms/lookups";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { MaterialModule } from "@ss/common/api-common";

@Component({
    selector: "ss-journal-user-list",
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule, MaterialModule],
    templateUrl: "./journal-user-list.component.html",
    styleUrls: ["./journal-user-list.component.css"]
})
export class JournalUserListComponent extends  BaseChildEntityListComponent <JournalUser> {
    override displayedColumns = ['fullName'];

    constructor(protected override detailSrv: JournalUserService) {
        super(detailSrv);
    }
};
