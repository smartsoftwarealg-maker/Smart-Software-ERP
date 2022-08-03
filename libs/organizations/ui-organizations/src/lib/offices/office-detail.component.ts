import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { EmployeeService } from '@ss/payroll/api-employee';
import { Observable } from 'rxjs';
import { OfficeService, Office } from '@ss/common/api-lookup';
import { PersonAutocompleteClass } from '@ss/payroll-common';
import {AssetLocationService} from '../../../../../assets-component/src/lib/asset-location.service';
import {CodeDescriptionAutoCompleteModel, DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AssetBuilding, AssetLocation} from '../../../../../assets-component/src/lib/assets-api';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AssetsBuildingService} from '../../../../../assets-component/src/lib/assets-building.service';

@Component({
    selector: 'ss-office-detail',
    templateUrl: './office-detail.component.html',
    styleUrls: ['./office-detail.component.scss']
})
export class OfficeDetailComponent extends BaseEntityDetailComponent<Office> implements OnInit, OnDestroy {
    locationLookup = new CodeDescriptionAutoCompleteModel(this.locationSrv);
    buildingLookup = new CodeDescriptionAutoCompleteModel(this.buildingSrv);

    public form: FormGroup = null;
    public saving: boolean = false;

    constructor(
        public officeSrv: OfficeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        private buildingSrv: AssetsBuildingService,
        private locationSrv: AssetLocationService) {
        super(officeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_OFFICE');
        // this.locationLookup.onObjectSelected = e => this.locationSelected(e);
        // this.buildingLookup.onObjectSelected = e => this.buildingSelected(e);
    }

    protected getRouteParam(): Observable<any> {
        this.officeSrv.setParentId(0);
        return super.getRouteParam();
    }

    setupForm(a: Office): FormGroup {
        this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            code:        [a.code, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
            buildingId:  [a.buildingId],
            floorNo:     [a.floorNo, [Validators.min(0), Validators.max(20)]],
            location:    [a.location],
            id:          [a.id]
        });

        // this.subscriptions
        //     .push(this.form.controls['buildingId']
        //         .valueChanges
        //         .pipe(
        //             debounceTime(300),
        //             distinctUntilChanged())
        //         .subscribe(v => this.computeCode()));

        // this.subscriptions
        //     .push(this.form.controls['floorNo']
        //         .valueChanges
        //         .pipe(
        //             debounceTime(300),
        //             distinctUntilChanged())
        //         .subscribe(v => this.computeCode()));

        // this.subscriptions
        //     .push(this.numberCtrl
        //         .valueChanges
        //         .pipe(
        //             debounceTime(300),
        //             distinctUntilChanged())
        //         .subscribe(v => this.computeCode()));

        return this.form;
    }

    public readForm(): Office {
        const formVal = this.form.value as Office;
        return formVal;
    }

    // private locationSelected(e: AssetLocation) {
    //     this.locationCode = e?.code || '';
    //     this.computeCode();
    // }

    // private buildingSelected(e: AssetBuilding) {
    //     this.buildingCode = e?.code || '';
    //     this.computeCode();
    // }

    private withLeadingZeros(v: string | number) {
        const str = ('0000' + v);
        return str.substring(str.length - 2);
    }
    // private computeCode() {
    //     const code = this.locationCode +
    //         this.buildingCode +
    //         this.withLeadingZeros(this.form.value.floorNo || '') +
    //         this.withLeadingZeros(this.numberCtrl.value || 1);
    //     this.form.controls['code'].setValue(code, {onlySelf: true});
    // }
}
