import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { MaterialModule } from "@ss/common/api-common";


import { ReactiveFormsModule } from "@angular/forms";


import { DatePickerComponent } from "@ss/common/ui-datepicker";

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-contract-article-main',
    templateUrl: './contract-article-main.component.html',
    styleUrls: ['./contract-article-main.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
],
})
export class ContractArticleMainComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.router.navigate(['articles'], {relativeTo: this.route}).then();
    }
}
