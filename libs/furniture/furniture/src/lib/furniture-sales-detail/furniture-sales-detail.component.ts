import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {FurnitureTransaction} from '../furniture-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {FurnitureReceptionService} from '../furniture-reception.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router, RouterEvent} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {SupplierService} from '@ss/logistics/api-agent';
import {LoginService} from '@ss/common/api-common';
import {filter} from 'rxjs';
import {FurnitureSalesService} from '../furniture-sales.service';

@Component({
    selector: 'ss-furniture-sales-detail',
    templateUrl: './furniture-sales-detail.component.html',
    styleUrls: ['./furniture-sales-detail.component.scss'],
})
export class FurnitureSalesDetailComponent extends BaseEntityDetailComponent<FurnitureTransaction> implements OnInit {
    supplierLookup = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: FurnitureSalesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private router: Router,
        private supplierSrv: SupplierService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_SALES');
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

