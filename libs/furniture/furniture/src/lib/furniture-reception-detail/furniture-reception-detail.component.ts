import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router, RouterEvent} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService} from '@ss/common/api-common';
import {FurnitureReceptionService} from '../furniture-reception.service';
import {FurnitureTransaction} from '../furniture-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {SupplierService} from '@ss/logistics/api-agent';
import {filter} from 'rxjs';

@Component({
    selector: 'ss-furniture-reception-detail',
    templateUrl: './furniture-reception-detail.component.html',
    styleUrls: ['./furniture-reception-detail.component.scss'],
})
export class FurnitureReceptionDetailComponent extends BaseEntityDetailComponent<FurnitureTransaction> implements OnInit {
    supplierLookup = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: FurnitureReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private router: Router,
        private supplierSrv: SupplierService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_RECEPTIONS');
    }


    public override setupForm(b: FurnitureTransaction) {
        const sub = this.router.events.pipe(
            filter((e: any): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((e: RouterEvent) => {
            this.saveButton.visible = e.url.indexOf('/detail') < 0;
        });
        this.subscriptions.push(sub);

        return this.formBuilder.group({
            id:        [b.id],
            centerId:  [b.centerId || this.loginSrv.appCtx.center],
            document:  [b.document || 514, Validators.required],
            number:    [b.number, Validators.required],
            date:      [b.date,   Validators.required],
            supplier:  [b.supplier],
            requester: [b.requester],
            orderNo:   [b.orderNo],
            invoiceNo: [b.invoiceNo],
        });
    }

    override ngOnInit() {
        this.saveButton.visible = this.router.url.indexOf("/detail") < 0;
        super.ngOnInit();
    }
}

