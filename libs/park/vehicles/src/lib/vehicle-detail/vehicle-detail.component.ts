import {Component, inject} from '@angular/core';

import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Vehicle} from '../vehicle-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {HttpService, LoginService, MaterialModule} from '@ss/common/api-common';
import {FixedElementsEntryService} from '@ss/remuneration/elements-entry';
import {VehicleService} from '../services/vehicle.service';
import {VehicleTypeService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';
import {AppArchiveMainComponent, AppArchiveService, PARK_ARCHIVES} from '@ss/common/app-archive';
import {DatePickerComponent} from '@ss/common/ui-datepicker';


import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {VehicleMaintenanceService} from '../services/vehicle-maintenance.service';
import {Observable} from 'rxjs';
import {VehicleFuelConsumptionService} from '../services/vehicle-fuel-consumption.service';
import {VehicleOilChangeService} from '../services/vehicle-oil-change.service';
import {VehicleInsuranceService} from '../services/vehicle-insurance.service';
import {VehicleDamageService} from '../services/vehicle-damage.service';
import {VehicleDriverService} from '../services/vehicle-driver.service';
import {VehicleMissionService} from '../services/vehicle-mission.service';
import {TranslateDirective} from "@ss/common/ui-lang";

@Component({
    selector: 'ss-vehicle-detail',
    standalone: true,
    imports: [
        DatePickerComponent,
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
        MaterialModule,
        RouterOutlet,
        UiAutoCompleteComponent,
        AppArchiveMainComponent,
        TranslateDirective
    ],
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent extends BaseEntityDetailComponent<Vehicle> {
    private router = inject(Router);
    private PANELS = ['archive', 'maintenance', 'fuel', 'oil', 'insurance', 'damages', 'drivers', 'missions'];

    private archiveSrv = inject(AppArchiveService);
    private typeSrv = inject(VehicleTypeService);
    private loginSrv = inject(LoginService);
    private maintenanceSrv = inject(VehicleMaintenanceService);
    private fuelSrv = inject(VehicleFuelConsumptionService);
    private oilSrv = inject(VehicleOilChangeService);
    private insuranceSrv = inject(VehicleInsuranceService);
    private damageSrv = inject(VehicleDamageService);
    private driverSrv = inject(VehicleDriverService);
    private missionSrv = inject(VehicleMissionService);

    readonly ARCHIVE_PANEL = 1;
    readonly MAINTENANCE_PANEL = 2;
    readonly FUEL_PANEL = 3;
    readonly OIL_PANEL = 4;
    readonly INSURANCE_PANEL = 5;
    readonly DAMAGE_PANEL = 6;
    readonly DRIVER_PANEL = 7;
    readonly MISSIONS_PANEL = 8;

    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);
    detailPanel = 0;

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
        this.archiveSrv.appId = PARK_ARCHIVES;
    }

    override loadEntity(id: number): Observable<Vehicle> {
        this.maintenanceSrv.setParentId(id || 0);
        this.fuelSrv.setParentId(id || 0);
        this.oilSrv.setParentId(id || 0);
        this.insuranceSrv.setParentId(id || 0);
        this.damageSrv.setParentId(id || 0);
        this.driverSrv.setParentId(id || 0);
        this.missionSrv.setParentId(id || 0);
        this.oilSrv.setParentId(id || 0);
        return super.loadEntity(id);
    }

    public override setupForm(e: Vehicle): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            centerId: [e.centerId || this.loginSrv.appCtx.center],
            description: [e.description],
            acquisitionDate: [e.acquisitionDate],
            plateNumber: [e.plateNumber],
            odoMeter: [e.odoMeter],
            vType: [e.vType]
        });
    }

    showPanel(idx: number) {
        this.detailPanel = idx + 1;
        const panel = this.PANELS[idx];
        if (this.router.url.indexOf(panel) < 0) {
            this.router.navigate([panel], {relativeTo: this.route}).then();
        }
    }

    showArchive() {
        this.showPanel(this.ARCHIVE_PANEL - 1);
    }

    showMaintenance() {
        this.showPanel(this.MAINTENANCE_PANEL - 1);
    }

    showFuel() {
        this.showPanel(this.FUEL_PANEL - 1);
    }

    showOil() {
        this.showPanel(this.OIL_PANEL - 1);
    }

    showInsurance() {
        this.showPanel(this.INSURANCE_PANEL - 1);
    }

    showDamages() {
        this.showPanel(this.DAMAGE_PANEL - 1);
    }

    showDrivers() {
        this.showPanel(this.DRIVER_PANEL - 1);
    }

    showMissions() {
        this.showPanel(this.MISSIONS_PANEL - 1);
    }
}
