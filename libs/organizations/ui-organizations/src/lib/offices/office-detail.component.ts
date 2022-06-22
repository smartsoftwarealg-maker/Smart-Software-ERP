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
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AssetLocation} from '../../../../../assets-component/src/lib/assets-api';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'ss-office-detail',
    templateUrl: './office-detail.component.html',
    styleUrls: ['./office-detail.component.scss']
})
export class OfficeDetailComponent extends BaseEntityDetailComponent<Office> implements OnInit, OnDestroy {
    locationLookup = new DefaultAutoCompleteModel(this.locationSrv);
    numberCtrl = new FormControl(1, [Validators.min(1), Validators.max(90)]);
    private locationCode = '';

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
        private locationSrv: AssetLocationService) {
        super(officeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_OFFICE');
        this.locationLookup.onObjectSelected = e => this.locationSelected(e);
    }

    protected getRouteParam(): Observable<any> {
        this.officeSrv.setParentId(0);
        return super.getRouteParam();
    }

    setupForm(a: Office): FormGroup {
        this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            blockNo:     [a.blockNo, [Validators.minLength(1), Validators.maxLength(4)]],
            floorNo:     [a.floorNo, [Validators.min(0), Validators.max(20)]],
            location:    [a.location],
            id:          [a.id]
        });

        this.subscriptions
            .push(this.form.controls['blockNo']
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(v => this.computeCode()));

        this.subscriptions
            .push(this.form.controls['floorNo']
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(v => this.computeCode()));

        this.subscriptions
            .push(this.numberCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(v => this.computeCode()));

        return this.form;
    }

    public readForm(): Office {
        const formVal = this.form.value as Office;
        return formVal;
    }

    private locationSelected(e: AssetLocation) {
        this.locationCode = e?.code || '';
        this.computeCode();
    }

    private withLeadingZeros(v: string | number) {
        const str = ('0000' + v);
        return str.substring(str.length - 2);
    }
    private computeCode() {
        const code = this.locationCode +
            this.withLeadingZeros(this.form.value.blockNo || '') +
            this.withLeadingZeros(this.form.value.floorNo || '') +
            this.withLeadingZeros(this.numberCtrl.value || 1);
        this.form.controls['description'].setValue(code, {onlySelf: true});
    }
}
