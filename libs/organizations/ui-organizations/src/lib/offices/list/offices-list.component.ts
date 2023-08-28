import { Component, inject } from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService, User, UserService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { OfficeService, Office } from '@ss/common/api-lookup';
import { AssetBuilding, AssetLocation, AssetLocationService, AssetsBuildingService } from "@ss/assets-component";
import { CodeDescriptionAutoCompleteModel, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'ss-offices-list',
    templateUrl: './offices-list.component.html',
    styleUrls: ['./offices-list.component.scss'],
})
export class OfficesListComponent extends BaseEntityListComponent<Office> {
    private locationSrv = inject(AssetLocationService);
    private buildingSrv = inject(AssetsBuildingService);

    locationLookup = new DefaultAutoCompleteModel(this.locationSrv);
    buildingLookup = new DefaultAutoCompleteModel(this.buildingSrv);

    locationCtrl = new FormControl<number>(this.buildingSrv.getParentId() || 0);
    buildingCtrl = new FormControl<number>(0);

    displayedColumns = [
        'code',
        'description',
        'floorNo'
    ];

    constructor(
        public officeSrv: OfficeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(officeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_OFFICES');
        this.pagination.pageSize = 10;
        const title = this.route.snapshot?.data['title'];
        if (title) {
            this.title = title;
            this.displayedColumns = this.displayedColumns.slice(0, 2);
        }
        this.locationLookup.onObjectSelected = e => this.onLocation(e);
        this.buildingLookup.onObjectSelected = b => this.onBuilding(b);
        if (!this.entitySrv.getParentId()) {
            this.entitySrv.setParentId(0);
        }
        this.buildingCtrl.setValue(this.entitySrv.getParentId() || 0);
    }

    override ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        super.ngOnInit();
    }

    onLocation(l: AssetLocation) {
        this.buildingSrv.setParentId(l?.id || 0);
    }

    onBuilding(b: AssetBuilding) {
        this.entitySrv.setParentId(b?.id);
        this.refresh();
    }
}
