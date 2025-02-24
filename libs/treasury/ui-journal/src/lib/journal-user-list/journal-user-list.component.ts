import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseChildEntityListComponent } from "@ss/common/ui-base-entity";
import { JournalUser, JournalUserService } from "@ss/treasury/api-journal";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";

import { MaterialModule } from "@ss/common/api-common";
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: "ss-journal-user-list",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTableModule, MaterialModule, TranslatePipe, PaginationComponent, TranslateDirective],
    templateUrl: "./journal-user-list.component.html",
    styleUrls: ["./journal-user-list.component.css"]
})
export class JournalUserListComponent extends  BaseChildEntityListComponent <JournalUser> {
    override displayedColumns = ['fullName'];

    constructor(protected override detailSrv: JournalUserService) {
        super(detailSrv, 'JournalUser');
    }
}
