import { Component, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AccJournalsService, AccPoliciesService, ACCPolicy } from '@ss/accounting/accounting-api';
import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LookupsService } from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { Observable, switchMap } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { QRCodeModule } from 'angularx-qrcode';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-options',
    templateUrl: './asset-options.component.html',
    styleUrls: ['./asset-options.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,

        DatePickerComponent,
        RouterModule,

        QRCodeModule
    ]

})
export class AssetOptionsComponent extends BaseEntityDetailComponent<ACCPolicy> {
    constructor(
        public detailSrv: AccPoliciesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_OPTIONS');
    }

    protected override getRouteParam(): Observable<any> {
        return this.loginSrv
            .loadContext()
            .pipe(
                tap(_ => {
                    this.detailSrv.setParentId(this.loginSrv.appCtx.center);
                    this.id = this.loginSrv.appCtx.center;
                }));
    }

    override loadEntity(id: number): Observable<ACCPolicy> {
        return super.loadEntity(this.loginSrv.appCtx.center);
    }

    public override setupForm(e: ACCPolicy): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            investAccount: [e.investAccount],
            depreciationAccount: [e.depreciationAccount],
            assetsAccount: [e.assetsAccount],
            minAssetValue: [e.minAssetValue || 0, Validators.required],
            inventoryYear: [e.inventoryYear || 0, Validators.required]
        });
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

    updateOptionChanged(event: MatCheckboxChange) {
        const ctrl = this.form.controls['openPeriods'];
        ctrl.setValue(event.checked ? 12 : 0);
        if (event.checked) {
            ctrl.disable({ onlySelf: true });
        } else {
            ctrl.enable({ onlySelf: true });
        }
    }

    override readForm(): ACCPolicy {
        const value = super.readForm();
        value.openPeriods = value.modifyClosedPeriods ? 12 : value.openPeriods || 0;
        return value;
    }
}
