import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { HrCriterion } from '../hr-criteria-api';
import { HrCriterionService } from '../hr-criterion.service';

@Component({
    selector: 'ss-hr-criteria-detail',
    standalone: true,
    imports: [CommonModule, MaterialModule, TranslateDirective],
    templateUrl: './hr-criteria-detail.component.html',
    styleUrl: './hr-criteria-detail.component.scss',
})
export class HrCriteriaDetailComponent extends BaseEntityDetailComponent<HrCriterion> {
    constructor(
        public override entitySrv: HrCriterionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PAYROLL_HR_CRITERIA',
        );
    }

    public override setupForm(b: HrCriterion): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            parentId: [
                {
                    value: b.parentId || this.entitySrv.getParentId(),
                    disabled: true,
                },
                Validators.required,
            ],
            description: [b.description, Validators.required],
            grade: [b.grade || 4, [Validators.required, Validators.min(1)]],
        });
    }
}
