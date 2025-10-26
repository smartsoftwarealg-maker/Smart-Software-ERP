import { Component } from '@angular/core';
import {TranslateDirective} from "@ss/common/ui-lang";
import {BaseEntityDetailComponent} from "@ss/common/ui-base-entity";
import {PackagingUnit} from "../packaging-units.api";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {PackagingUnitsService} from "../packaging-units.service";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MaterialModule} from "@ss/common/api-common";

@Component({
    selector: 'ss-packaging-units-list',
    imports: [
        TranslateDirective,
        MatCard,
        MatFormField,
        MatInput,
        MatLabel,
        MaterialModule,
        ReactiveFormsModule
    ],
    templateUrl: './packaging-units-detail.component.html',
    styleUrl: './packaging-units-detail.component.scss',
})
export class PackagingUnitsDetailComponent extends BaseEntityDetailComponent<PackagingUnit> {
    displayedColumns = ['description', 'descriptionAr', 'units'];

    constructor(
        public override entitySrv: PackagingUnitsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_PACKAGING_UNITS');
    }

    override setupForm(e: PackagingUnit): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            units:         [{ value: e.units, disabled: !this.isEditable || e.id > 0 }, Validators.required],
        });
    }
}
