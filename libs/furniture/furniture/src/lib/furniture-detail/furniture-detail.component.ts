import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Furniture} from '../furniture-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {IsParamService, LoginService} from '@ss/common/api-common';
import {FurnitureService} from '../furniture.service';
import {FurnitureReceiverService} from '../furniture-receiver.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {SupplierService} from '@ss/logistics/api-agent';
import {ArticleTypeService, FurnitureStatusService, MarkService, OfficeService} from '@ss/common/api-lookup';
import {AccountService} from '@ss/accounting/api-accounts';
import {OSService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'ss-furniture-detail',
    templateUrl: './furniture-detail.component.html',
    styleUrls: ['./furniture-detail.component.scss'],
})
export class FurnitureDetailComponent extends BaseEntityDetailComponent<Furniture> {
    isCACO = false;
    receiverLookup = new DefaultAutoCompleteModel(this.receiverSrv);
    supplierLookup = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    accountLookup  = new DefaultAutoCompleteModel(this.accountSrv, 'accountNo', 'description');
    markLookup     = new DefaultAutoCompleteModel(this.markSrv);
    statusLookup   = new DefaultAutoCompleteModel(this.statusSrv);
    osLookup       = new DefaultAutoCompleteModel(this.osSrv);
    officeLookup   = new DefaultAutoCompleteModel(this.officeSrv);
    typeLookup     = new DefaultAutoCompleteModel(this.typeSrv);

    constructor(
        public override entitySrv: FurnitureService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService,
        private receiverSrv: FurnitureReceiverService,
        private supplierSrv: SupplierService,
        private markSrv: MarkService,
        private accountSrv: AccountService,
        private statusSrv: FurnitureStatusService,
        private osSrv: OSService,
        private officeSrv: FurnitureReceiverService,
        private typeSrv: ArticleTypeService,
        private isParamSrv: IsParamService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_FURNITURE');
    }

    public override setupForm(b: Furniture) {
        return this.formBuilder.group({
            id:                [b.id],
            centerId:          [b.centerId || this.loginSrv.appCtx.center],
            description:       [b.description, Validators.required],
            reference:         [b.reference, Validators.required],
            memo:              [b.memo],
            serialNo:          [b.serialNo],
            receiver:          [b.receiver],
            supplier:          [b.supplier],
            dateOut:           [b.dateOut],
            acquisitionValue:  [b.acquisitionValue],
            accountNo:         [b.accountNo],
            acquisitionDate:   [b.acquisitionDate],
            status:            [b.status],
            invoiceNo:         [b.invoiceNo],
            furnitureType:     [b.furnitureType   ],
            mark:              [b.mark            ],
            os:                [b.os              ],
            isMultifunctional: [b.isMultifunctional]
        });
    }

    override preload(): Observable<any> {
        return this.isParamSrv
            .is('CACO')
            .pipe(tap(res => this.isCACO = res));
    }
}

