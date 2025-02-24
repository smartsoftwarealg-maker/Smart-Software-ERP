import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AbsenceWeight } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AbsenceWeightService } from '../services/absence-weight.service';
import { ElementsInfoService } from '@ss/remuneration/elementsinfo';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatTooltip } from '@angular/material/tooltip';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatRadioButton } from '@angular/material/radio';

@Component({
    selector: 'ss-gica-scale-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        MatCard,
        MatCardContent,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        TranslateDirective,
        UiAutoCompleteComponent
    ],
    templateUrl: './absence-weight-detail.component.html',
    styleUrl: './absence-weight-detail.component.css'
})
export class AbsenceWeightDetailComponent extends BaseEntityDetailComponent<AbsenceWeight> {
    private elementSrv = inject(ElementsInfoService);

    elementLookup = new DefaultAutoCompleteModel(this.elementSrv);

    constructor(
        public override entitySrv: AbsenceWeightService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_WEIGHTS');
    }
    public override setupForm(b: AbsenceWeight): UntypedFormGroup {
        return this.formBuilder.group({
            id:         [b.id],
            elementId:  [b.elementId, Validators.required],
            weight:     [b.weight, Validators.required],
            maxValue:   [b.maxValue, Validators.required],
            cType:      [b.cType, Validators.required],
        });
    }
}
