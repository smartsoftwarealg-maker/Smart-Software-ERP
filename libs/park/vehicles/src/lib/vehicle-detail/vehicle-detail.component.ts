import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Vehicle } from '../vehicle-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, LoginService, MaterialModule } from '@ss/common/api-common';
import { FixedElementsEntryService } from '@ss/remuneration/elements-entry';
import { VehicleService } from '../vehicle.service';
import { VehicleTypeService } from '@ss/common/api-lookup';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { AppArchiveModule } from '@ss/common/app-archive';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'ss-vehicle-detail',
    standalone: true,
    imports: [
        CommonModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiImageInputModule,
        CommonUiLangModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent extends BaseEntityDetailComponent<Vehicle> {
    private typeSrv = inject(VehicleTypeService);
    private loginSrv = inject(LoginService);

    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);

    constructor(
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override entitySrv: VehicleService,
        public httpSrv: HttpService,
        public infoSrv: FixedElementsEntryService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PARK_VEHICLES');
    }

    public override setupForm(e: Vehicle): UntypedFormGroup {
        return this.formBuilder.group({
            id:              [e.id],
            centerId:        [e.centerId || this.loginSrv.appCtx.center],
            description:     [e.description],
            acquisitionDate: [e.acquisitionDate],
            plateNumber:     [e.plateNumber],
            odoMeter:        [e.odoMeter],
            vType:           [e.vType]
        });
    }
}
