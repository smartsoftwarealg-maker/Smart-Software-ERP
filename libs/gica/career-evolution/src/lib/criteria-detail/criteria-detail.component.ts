import { Component } from '@angular/core';

import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Criterion } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CriterionService } from '../services/criterion.service';
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-gica-criteria-detail',
    standalone: true,
    imports: [MaterialModule, TranslateDirective],
    templateUrl: './criteria-detail.component.html',
    styleUrl: './criteria-detail.component.css'
})
export class CriteriaDetailComponent extends BaseEntityDetailComponent<Criterion> {
    constructor(
        public override entitySrv: CriterionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_CAREER_CRITERIA');
    }
    public override setupForm(b: Criterion): UntypedFormGroup {
        return this.formBuilder.group({
            id:          [b.id],
            parentId:    [{ value: b.parentId || this.entitySrv.getParentId(), disabled: true }, Validators.required],
            description: [b.description, Validators.required],
            grade:       [b.grade || 4, [Validators.required, Validators.min(1)]],
        });
    }
}
