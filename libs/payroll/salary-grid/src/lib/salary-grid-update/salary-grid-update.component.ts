import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginService, MaterialModule } from "@ss/common/api-common";


import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { RemunerationPaymonthEditorModule } from "@ss/remuneration/paymonth-editor";

import { PayrollMonthService } from "@ss/remuneration/payroll-month";
import { GridService } from "../grid.service";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: "ss-salary-grid-update",
    templateUrl: "./salary-grid-update.component.html",
    styleUrls: ["./salary-grid-update.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule
    ]
})
export class SalaryGridUpdateComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private snackBar = inject(SnackBarService);
    private fb = inject(FormBuilder);
    private gridSrv = inject(GridService);
    private loginSrv = inject(LoginService);
    private monthSrv = inject(PayrollMonthService);

    processing = signal<boolean>(false);

    form = this.fb.group({
        updateGrid:     [false, Validators.required],
        updateElements: [false, Validators.required],
        year:           [{ value: 0, disabled: true }],
        month:          [{ value: 0, disabled: true }]
    });

    update() {
        const value = this.form.getRawValue();
        this.gridSrv
            .updateGrid(value.updateGrid, value.updateElements)
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBar.showSuccessMessage();
                }
            });
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('PAYROLL_GRID_UPDATE');
        this.monthSrv
            .maxMonth()
            .subscribe(res => {
                const mm = res.month % 100;
                const yy = +(res.month / 100).toFixed(0);
                this.form.controls['month'].setValue(mm);
                this.form.controls['year'].setValue(yy);
            })
    }
}
