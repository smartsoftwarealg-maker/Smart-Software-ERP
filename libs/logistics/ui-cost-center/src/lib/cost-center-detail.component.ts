import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {CCGroup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {CostCenter, CostCenterService} from '@ss/logistics/api-cost-center';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Component({
    selector: 'ss-cost-center-detail',
    styleUrls: ['./cost-center-detail.component.scss'],
    templateUrl: './cost-center-detail.component.html'
})
export class CostCenterDetailComponent extends BaseEntityDetailComponent<CostCenter> {

    public groups: CCGroup[];

    constructor(
        public costCenterService: CostCenterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(costCenterService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_COST_CENTERS');
    }


    override preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public override setupForm(b: CostCenter) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            code: [b.code, Validators.required],
            description: [b.description, Validators.required],
            groupId: [b.groupId],
        });
    }
}
