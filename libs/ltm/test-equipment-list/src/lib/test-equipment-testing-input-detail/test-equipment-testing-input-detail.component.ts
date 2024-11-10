import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import {
    FormArray,
    FormControl,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LtmEquipmentTestService } from '../services/ltm-equipment-test.service';
import { Observable } from 'rxjs';
import { LtmTestingEquipmentService } from '../services/ltm-testing-equipment.service';
import {
    LTMEquipmentTestingLine,
    LTMTestEquipmentTest,
    LTMTestEquipmentTestingInput,
    LTMTestingEquipment
} from '@ltm/ltm-api';
import { LtmEquipmentTestingInputService } from '../services/ltm-equipment-testing-input.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { debug } from '@capacitor/assets/dist/util/log';

@Component({
    selector: 'ss-test-equipment-testing-input-detail',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatCard, MatFormField, MatInput, MatLabel, MaterialModule, ReactiveFormsModule, RouterOutlet, CommonUiAutoCompleteModule, CommonUiDatepickerModule],
    templateUrl: './test-equipment-testing-input-detail.component.html',
    styleUrl: './test-equipment-testing-input-detail.component.scss'
})
export class TestEquipmentTestingInputDetailComponent extends BaseEntityDetailComponent<LTMTestEquipmentTestingInput> {
    #loginSrv = inject(LoginService);
    #equipmentTestSrv = inject(LtmEquipmentTestService);
    #testEquipmentSrv = inject(LtmTestingEquipmentService);

    equipmentLookup = new DefaultAutoCompleteModel(this.#testEquipmentSrv);
    equipmentTests: LTMTestEquipmentTest[] = [];

    constructor(
        public override entitySrv: LtmEquipmentTestingInputService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TEST_EQUIPMENT_TESTING');
        this.equipmentLookup.onObjectSelected = t => this.onEquipment(t);
    }

    public override setupForm(b: LTMTestEquipmentTestingInput): UntypedFormGroup {
        this.equipmentTests = b.lines?.map(e => { return { id: e.id, parentId: e.parentId, testId: e.testId,  value: e.value, testDescription: e.testDescription } }) ;
        return this.formBuilder.group({
            id:            [b.test?.id||0],
            test: this.formBuilder.group({
                id:          [b.test?.id||0, Validators.required],
                equipmentId: [{ value: b.test?.equipmentId||0, disabled: b.test?.id > 0 }, Validators.required],
                time:        [b.test?.time|| new Date(), Validators.required],
                centerId:    [b.test?.centerId||this.#loginSrv.appCtx.center, Validators.required],
                userId:      [b.test?.userId||this.#loginSrv.appCtx.id, Validators.required],
            }),
            lines: this.formBuilder.array(b.lines? b.lines?.map(e => new FormControl<number>(e.value)): [])
        });
    }

    override loadEntity(id: number): Observable<LTMTestEquipmentTestingInput> {
        this.#equipmentTestSrv.setParentId(id);
        return super.loadEntity(id);
    }

    get tests(): FormArray {
        return this.form.controls['lines'] as FormArray;
    }

    private onEquipment(t: LTMTestingEquipment) {
        this.#equipmentTestSrv.setParentId(t?.id||0);
        this.#equipmentTestSrv
            .getList(1, 50)
            .subscribe(res => {
                this.tests.clear();
                this.equipmentTests = res.body;
                this.equipmentTests.forEach(e => this.tests.push(new FormControl<number>(0)));
            });
    }

    override readForm(): LTMTestEquipmentTestingInput {
        const value = this.form.getRawValue();
        const values = this.tests.value as number[];
        const lines: LTMEquipmentTestingLine[] = values.map((v, i) => {
            return {
                id: this.equipmentTests[i].id,
                testId: this.equipmentTests[i].testId,
                value: v,
                parentId: this.equipmentTests[i].parentId,
                userId: this.#loginSrv.appCtx.id
            };
        });
        return {id: 0, test: value.test, lines: lines};
    }

    protected override resetForm<T>(val: T) {}
}
