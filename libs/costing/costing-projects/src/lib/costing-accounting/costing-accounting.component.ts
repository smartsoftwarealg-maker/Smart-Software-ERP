import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';



import { CACCReport } from '@ss/costing/costing-utils';
import { catchError, tap } from 'rxjs';
import { CostingAccountingService } from '../services/costing-accounting.service';
import { CostingProjectService } from '../services/costing-project.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ShellService } from '@ss/common/ui-shell';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-costing-reports',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        UiAutoCompleteComponent,
        ReactiveFormsModule
    ],
    templateUrl: './costing-accounting.component.html',
    styleUrl: './costing-accounting.component.css',
})
export class CostingAccountingComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private projectSrv = inject(CostingProjectService);
    private dataSrv = inject(CostingAccountingService);
    private fb = inject(FormBuilder);

    displayedColumns = ['accountNo', 'description', 'debit', 'credit'];

    projectLookup = new DefaultAutoCompleteModel(this.projectSrv);
    form = this.fb.group({
        project: [0, Validators.required],
        units:   [1, [Validators.required, Validators.min(1)]]
    });
    data =  signal<CACCReport>(null);
    processing = signal(false);

    refresh() {
        const projectId = this.form.value.project;
        const qty = this.form.value.units;
        this.processing.set(true);
        this.dataSrv
            .getReport(projectId, qty)
            .pipe(tap(() => this.processing.set(false)),
                catchError(err => {
                    this.processing.set(false);
                    throw err;
                }))
            .subscribe(res => this.data.set(res));
    }

    ngOnInit() {
        this.shellSrv.setTitle('COST_TRANSACTIONS');
        this.shellSrv.setGoBackPath('..', this.route);
    }
}
