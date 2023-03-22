import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {PersonShift} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PersonShiftService} from '../person-shift.service';
import {EmployeeService} from '@ss/payroll/api-employee';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {WorkshiftService} from '../workshift.service';
import {PersonAutocompleteClass} from '@ss/payroll-common';
import {ServiceService} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-person-shift-detail',
    templateUrl: './person-shift-detail.component.html',
    styleUrls: ['./person-shift-detail.component.scss'],
})
export class PersonShiftDetailComponent extends BaseEntityDetailComponent<PersonShift> {
    employeeLookup = new PersonAutocompleteClass(this.employeeSrv);
    shiftLookup    = new DefaultAutoCompleteModel(this.shiftSrv);
    serviceLookup  = new DefaultAutoCompleteModel(this.serviceSrv);

    constructor(
        public override entitySrv: PersonShiftService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private employeeSrv: EmployeeService,
        private shiftSrv: WorkshiftService,
        private serviceSrv: ServiceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ATT_SHIFT_ASSIGNMENTS');
    }

    public override setupForm(b: PersonShift) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:               [b.id],
            parentId:         [{ value: b.parentId || this.entitySrv.getParentId(), disabled: true }, Validators.required],
            date:             [b.date,  Validators.required],
            shift:            [b.shift, Validators.required],
            shiftDescription: [b.shiftDescription],
            service:          [0]
        });
    }

    override readForm(): PersonShift {
        return this.form.getRawValue();
    }

    // override save() {
    //     const value = this.form.getRawValue();
    //     if (value.service) {
    //         value.parentId = value.service;
    //         delete value.service;
    //     } else {
    //         super.save();
    //     }
    // }
}
