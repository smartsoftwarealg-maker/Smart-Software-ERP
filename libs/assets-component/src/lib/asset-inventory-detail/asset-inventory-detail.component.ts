import {Component, ViewChild} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetInventory} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService, OfficeService} from '@ss/common/api-lookup';
import {AssetInventoryService} from '../asset-inventory.service';
import {LoginService} from '@ss/common/api-common';
import {AccPoliciesService, ACCPolicy} from '@ss/accounting/accounting-api';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AssetLookupModel} from '../asset-lookup-model';
import {AssetsService} from '../assets.service';

@Component({
  selector: 'ss-asset-inventory',
  templateUrl: './asset-inventory-detail.component.html',
  styleUrls: ['./asset-inventory-detail.component.scss']
})
export class AssetInventoryDetailComponent extends BaseEntityDetailComponent<AssetInventory> {
    private accPolicy: ACCPolicy | null = null;

    officeLookup      = new DefaultAutoCompleteModel(this.officeSrv);
    assetLookupModel  = new AssetLookupModel(this.assetSrv);

    constructor(
        public override entitySrv: AssetInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        private officeSrv: OfficeService,
        private policySrv: AccPoliciesService,
        private assetSrv: AssetsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'INVENTORY');
    }

    public override setupForm(b: AssetInventory) {
        this.id = this.id || 0;
        return this.formBuilder.group({
            id:         [b.id || 0],
            centerId:   [this.loginSrv.appCtx.center],
            office:     [b.office, Validators.required],
            investId:   [b.investId],
            inventYear: [b.inventYear | this.accPolicy?.inventoryYear, Validators.required],
            date:       [b.date || new Date(), Validators.required],
            inventMemo: [b.inventMemo],
        });
    }

    override preload(): Observable<any> {
        return this.loginSrv
            .loadContext()
            .pipe(switchMap(_ => this.policySrv.get(this.loginSrv.appCtx.center)),
                  tap(res => {
                      this.accPolicy = res;
                      this.entitySrv.setParentId(res.inventoryYear);
                  }));
    }


    onScan(data: any) {
        console.log(data)
    }
}
