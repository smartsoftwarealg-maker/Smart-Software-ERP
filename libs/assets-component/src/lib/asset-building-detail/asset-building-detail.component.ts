import { Component, inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetBuilding} from '../assets-api';
import {AssetsBuildingService} from '../services/assets-building.service';
import { CodeDescriptionAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {AssetLocationService} from '../services/asset-location.service';

import { MaterialModule } from '@ss/common/api-common';

import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-asset-building-detail',
  templateUrl: './asset-building-detail.component.html',
  styleUrls: ['./asset-building-detail.component.scss'],
  standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    RouterModule,
    UiAutoCompleteComponent
]})
export class AssetBuildingDetailComponent extends BaseEntityDetailComponent<AssetBuilding> {
    private router = inject(Router);
    private locationSrv = inject(AssetLocationService);
    locationLookup = new CodeDescriptionAutoCompleteModel(this.locationSrv);

    constructor(
        public override entitySrv: AssetsBuildingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_BUILDINGS');
        this.title = this.route.snapshot?.data['title'] || this.title;
    }


    public override setupForm(b: AssetBuilding) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:          [b.id],
            parentId:    [{ value: b.parentId || this.entitySrv.getParentId(), disabled: true} ],
            code:        [b.code, Validators.maxLength(4)],
            description: [b.description, Validators.required],
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        if (!this.entitySrv.getParentId()) {
            this.router.navigate(['../'], { relativeTo: this.route }).then();
        }
    }

}
