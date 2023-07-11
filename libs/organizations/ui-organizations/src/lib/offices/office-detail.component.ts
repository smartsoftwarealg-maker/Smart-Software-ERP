import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { OfficeService, Office } from '@ss/common/api-lookup';
import {CodeDescriptionAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {map} from 'rxjs/operators';
import { AssetBuilding, AssetLocation, AssetLocationService, AssetsBuildingService } from '@ss/assets-component';

@Component({
    selector: 'ss-office-detail',
    templateUrl: './office-detail.component.html',
    styleUrls: ['./office-detail.component.scss']
})
export class OfficeDetailComponent extends BaseEntityDetailComponent<Office> implements OnInit, OnDestroy {
    private buildingSrv = inject(AssetsBuildingService);
    private locationSrv = inject(AssetLocationService);

    locationLookup = new CodeDescriptionAutoCompleteModel(this.locationSrv);
    buildingLookup = new BuildingLookup(this.buildingSrv);

    public saving = false;

    constructor(
        public officeSrv: OfficeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(officeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_OFFICE');
        this.locationLookup.onObjectSelected = e => this.locationSelected(e);
        // this.buildingLookup.onObjectSelected = e => this.buildingSelected(e);
    }

    protected override getRouteParam(): Observable<any> {
        this.officeSrv.setParentId(0);
        return super.getRouteParam();
    }

    override setupForm(a: Office): UntypedFormGroup {
        this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            code:        [a.code, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
            buildingId:  [a.buildingId, Validators.required],
            floorNo:     [a.floorNo, [Validators.min(0), Validators.max(20)]],
            location:    [a.location],
            id:          [a.id]
        });

        return this.form;
    }

    public override readForm(): Office {
        const formVal = this.form.value as Office;
        return formVal;
    }

    private locationSelected(e: AssetLocation) {
        this.buildingLookup.location = (e?.id || 99999);
        this.form.get('buildingId').setValue(0);
    }

    // private buildingSelected(e: AssetBuilding) {
    //     this.buildingCode = e?.code || '';
    //     this.computeCode();
    // }

    // private withLeadingZeros(v: string | number) {
    //     const str = ('0000' + v);
    //     return str.substring(str.length - 2);
    // }
    // private computeCode() {
    //     const code = this.locationCode +
    //         this.buildingCode +
    //         this.withLeadingZeros(this.form.value.floorNo || '') +
    //         this.withLeadingZeros(this.numberCtrl.value || 1);
    //     this.form.controls['code'].setValue(code, {onlySelf: true});
    // }
}

class BuildingLookup extends CodeDescriptionAutoCompleteModel<AssetBuilding> {
    private _locationId = 0;

    constructor(buildingSrv: AssetsBuildingService) {
        super(buildingSrv);
    }

    set location(l: number) {
        this._locationId = l;
        this.clear();
    }

    override filter = (filter: string) =>
        this.entitySrv
            .getList(0, 999, filter, this.descriptionField)
            .pipe(map(x => x.body.filter(e => e.locationId === this._locationId).slice(0, 20)));
}
