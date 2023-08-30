import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSRoutingService } from '../services/cmms.routing.service';
import { LookupsService } from '@ss/common/api-lookup';
import { CMMSRoutingDetailService } from '../services/cmms-routing-detail.service';
import { filter, Observable } from 'rxjs';
import { CMMSRoutingPartService } from '../services/cmms-routing-parts.service';
import { AppArchiveService, CMMS_ROUTING_ARCHIVES } from '@ss/common/app-archive';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CMMSRouting } from './routing-api';

@Component({
    selector: 'ss-cmms-routing-detail',
    templateUrl: './cmms-routing-detail.component.html',
    styleUrls: ['../detail-template/cmms-fault-detail.component.css']
})
export class CMMSRoutingDetailComponent extends BaseEntityDetailComponent<CMMSRouting> implements OnInit {
    private router = inject(Router);
    private archiveSrv = inject(AppArchiveService);
    private URLs = ['detail', 'parts', 'archive'];

    isOnEdit = false;
    isChecklist = false;

    private detailSrv  = inject(CMMSRoutingDetailService);
    private partSrv  = inject(CMMSRoutingPartService);

    constructor(
        public override entitySrv: CMMSRoutingService,
      public override shellSrv: ShellService,
      public override snackBarSrv: SnackBarService,
      public override route: ActivatedRoute,
      public override formBuilder: UntypedFormBuilder,
      public override confirmationSrv: ConfirmationDialogService,
      public lookupsSrv: LookupsService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'CMMS_ROUTING');
    }

    override loadEntity(id: number): Observable<CMMSRouting> {
        this.subscriptions.push(
            this.router.events.pipe(
                filter((e: any): e is RouterEvent => e instanceof RouterEvent)
            ).subscribe((e: RouterEvent) => {
                this.isOnEdit = e.url.indexOf('/detail/') > 1 || e.url.indexOf('/parts/') > 1 ;
                this.saveButton.visible = !this.isOnEdit;
                this.shellSrv.setGoBackEnabled(this.saveButton.visible);
            }));

        this.detailSrv.setParentId(id);
        this.partSrv.setParentId(id);
        this.archiveSrv.appId = CMMS_ROUTING_ARCHIVES;
        return super.loadEntity(id);
    }

    onTabChange(index: number) {
        const url = this.router.url;
        const idx = this.isChecklist && index > 0? index + 1 : index;
        const next = url.split('/').slice(0, 5).join('/') + '/' + this.URLs[idx];
        this.router.navigate([next]).then();
    }

    public override setupForm(e: CMMSRouting): UntypedFormGroup {
        this.isChecklist = e?.isChecklist || false;
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            isChecklist:   [e.isChecklist || false, Validators.required]
        });
    }
}
