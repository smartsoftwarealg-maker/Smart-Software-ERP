import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseLookupDetailClass } from '../detail-template/base-lookup-detail.class';
import { CMMSRoutingService } from '../services/cmms.routing.service';
import { Lookup } from '@ss/common/api-lookup';
import { CMMSRoutingDetailService } from '../services/cmms-routing-detail.service';
import { filter, Observable } from 'rxjs';
import { CMMSRoutingPartService } from '../services/cmms-routing-parts.service';

@Component({
    selector: 'ss-cmms-routing-detail',
    templateUrl: './cmms-routing-detail.component.html',
    styleUrls: ['../detail-template/cmms-fault-detail.component.css'],
})
export class CMMSRoutingDetailComponent extends BaseLookupDetailClass {
    private URLs = ['detail', 'parts'];
    private router = inject(Router);

    isOnEdit = false;

    private detailSrv  = inject(CMMSRoutingDetailService);
    private partSrv  = inject(CMMSRoutingPartService);

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
        this.subscriptions.push(
            this.router.events.pipe(
                filter((e: any): e is RouterEvent => e instanceof RouterEvent)
            ).subscribe((e: RouterEvent) => {
                this.isOnEdit = e.url.indexOf('/detail/') > 1 || e.url.indexOf('/parts/') > 1;
                this.saveButton.visible = !this.isOnEdit;
                this.shellSrv.setGoBackEnabled(this.saveButton.visible);
            }));

        this.detailSrv.setParentId(id);
        this.partSrv.setParentId(id);
        return super.loadEntity(id);
    }

    onTabChange(index: number) {
        const url = this.router.url;
        const slashIndex = url.lastIndexOf('/') + 1;
        const next = url.substring(0, slashIndex) + this.URLs[index];
        this.router.navigate([next]).then();
    }
}
