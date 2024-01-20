import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-contract-article-main',
    templateUrl: './contract-article-main.component.html',
    styleUrls: ['./contract-article-main.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        AppArchiveModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule,
    ],
})
export class ContractArticleMainComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.router.navigate(['articles'], {relativeTo: this.route}).then();
    }
}
