import { Component, inject } from "@angular/core";
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { FormGroup, UntypedFormBuilder } from "@angular/forms";
import { BaseLookupDetailClass } from '../detail-template/base-lookup-detail.class';
import { CMMSRoutingService } from '../services/cmms.routing.service';
import { Lookup } from "@ss/common/api-lookup";
import { CMMSRoutingDetailService } from "../services/cmms-routing-detail.service";
import { Observable } from "rxjs";

@Component({
    selector: 'ss-cmms-routing-detail',
    templateUrl: '../detail-template/cmms-fault-detail.component.html',
    styleUrls: ['../detail-template/cmms-fault-detail.component.css'],
})
export class CMMSRoutingDetailComponent extends BaseLookupDetailClass {
    private detailSrv  = inject(CMMSRoutingDetailService);
    constructor(
        public override entitySrv: CMMSRoutingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_ROUTING');
    }

    override loadEntity(id: number): Observable<Lookup> {
        this.detailSrv.setParentId(id);
        return super.loadEntity(id);
    }
}
