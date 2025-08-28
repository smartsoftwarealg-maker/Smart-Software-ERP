import { Component, inject, OnInit } from '@angular/core';
import {BudgetService} from '../budget.service';
import {Budget} from '../budget-api';
import { LoginService, PaginationModel } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatList, MatListItem } from '@angular/material/list';

import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';
import { AccFileService } from '@ss/accounting/accounting-api';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ss-budget-selector-dlg',
    templateUrl: './budget-selector-dlg.component.html',
    styleUrls: ['./budget-selector-dlg.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        TranslateDirective,
        MatList,
        MatListItem,
        MatButton,
        TranslatePipe,
    ],
})
export class BudgetSelectorDlgComponent implements OnInit {
    #accFileSrv = inject(AccFileService)
    #budgetSrv = inject( BudgetService);
    #shellSrv = inject( ShellService);
    #loginSrv = inject(LoginService)
    #snackBarSrv = inject(SnackBarService);
    #route = inject(ActivatedRoute);
    #router = inject(Router);

    data: Budget[] = [];
    selectedBudget: Budget = null;

    private paginator: PaginationModel = PaginationModel.newInstance({ page: 0, pageSize: 50, elementCount: 0});
    constructor() {}

    ngOnInit(): void {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#budgetSrv
            .getList(0, 49)
            .subscribe(res => {
                this.data = res.body.sort((a, b) => b.year - a.year);
                this.paginator.elementCount = res.itemCount;
            });
    }

    select(budget: Budget) {
        this.selectedBudget = budget;
    }

    selectBudget() {
        this.#budgetSrv.budget = this.selectedBudget;
        this.#shellSrv.setLabels([ { title: this.selectedBudget.description}])
        this.#accFileSrv
            .selectFolder(this.selectedBudget?.id || 0, this.selectedBudget?.year || 0, 1)
            .pipe(tap(ctx => this.#loginSrv.setContext(ctx)))
            .subscribe(() => {
                if (this.selectedBudget) {
                    this.#shellSrv.setLabels([{ title: `${this.selectedBudget.description}` }]);
                }
                this.#snackBarSrv.showSuccessMessage();
                this.#shellSrv.goBack();
            })

        // this.#router.navigate(['../'], { relativeTo: this.#activatedRoute }).then();
    }
}
