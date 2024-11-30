import { Component, inject, OnInit } from "@angular/core";
import { BaseEntityDetailComponent } from "@ss/common/ui-base-entity";
import { Grid } from "../grid-api";
import { BankService } from "@ss/administration/api-bank";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LookupsService } from "@ss/common/api-lookup";
import { GridService } from "../grid.service";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";


import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { RemunerationPaymonthEditorModule } from "@ss/remuneration/paymonth-editor";

import { GridRankService } from "../grid-rank.service";
import { Observable } from "rxjs";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: "ss-salary-grid-detail",
    templateUrl: "./salary-grid-detail.component.html",
    styleUrls: ["./salary-grid-detail.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,

        RouterOutlet
    ]
})
export class SalaryGridDetailComponent extends BaseEntityDetailComponent<Grid> {
    protected rankSrv = inject(GridRankService);

    constructor(
        public detailSrv: GridService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_SALARY_GRID');
    }

    setupForm(b: Grid): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            category: [b.category, Validators.required],
            sec: [b.sec, Validators.required],
            baseSalary: [b.baseSalary || 0, Validators.required],
            indexValue: [b.indexValue || 0, Validators.required]
        });
    }

    override loadEntity(id: number): Observable<Grid> {
        this.rankSrv.setParentId(id);
        return super.loadEntity(id);
    }
}
