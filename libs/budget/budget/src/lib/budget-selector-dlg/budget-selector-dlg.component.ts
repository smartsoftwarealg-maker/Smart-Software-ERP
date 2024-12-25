import { Component, OnInit } from '@angular/core';
import {BudgetService} from '../budget.service';
import {Budget} from '../budget-api';
import {PaginationModel} from '@ss/common/api-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ShellService} from '@ss/common/ui-shell';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ss/common/ui-lang';

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
        NgFor,
        MatListItem,
        MatButton,
        TranslatePipe,
    ],
})
export class BudgetSelectorDlgComponent implements OnInit {
    data: Budget[] = [];
    selectedBudget: Budget = null;

    private paginator: PaginationModel = PaginationModel.newInstance({ page: 0, pageSize: 50, elementCount: 0});
    constructor(private budgetSrv: BudgetService,
                private activatedRoute: ActivatedRoute,
                private shellSrv: ShellService,
                private router: Router) {}

    ngOnInit(): void {
        this.budgetSrv
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
        this.budgetSrv.budget = this.selectedBudget;
        this.shellSrv.setLabels([ { title: this.selectedBudget.description}])
        this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
    }
}
