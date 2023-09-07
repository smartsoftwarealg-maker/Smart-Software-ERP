import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
    CmmsChecklistService,
    CMMSRoutingDetailService
} from '@ss/cmms/lookups';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { filter, Observable } from 'rxjs';
import { AppArchiveService, CMMS_ROUTING_ARCHIVES } from '@ss/common/app-archive';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-cmms-routing-detail',
    standalone: true,
    imports: [CommonModule,
        CommonUiLangModule,
        MatCheckboxModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        MaterialModule, RouterOutlet
    ],
    templateUrl: 'cmms-checklist-detail.component.html',
    styleUrls: ['../../../../lookups/src/lib/detail-template/cmms-fault-detail.component.css']
})
export class CMMSChecklistDetailComponent extends BaseEntityDetailComponent<Lookup> implements OnInit {
    private router = inject(Router);
    private archiveSrv = inject(AppArchiveService);
    private URLs = ['detail', 'archive'];

    isOnEdit = false;

    private detailSrv  = inject(CMMSRoutingDetailService);

    constructor(
        public override entitySrv: CmmsChecklistService,
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
            'CMMS_CHECKLIST');
    }

    override loadEntity(id: number): Observable<Lookup> {
        this.subscriptions.push(
            this.router.events.pipe(
                filter((e: any): e is RouterEvent => e instanceof RouterEvent)
            ).subscribe((e: RouterEvent) => {
                this.isOnEdit = e.url.indexOf('/detail/') > 1 || e.url.indexOf('/parts/') > 1 ;
                this.saveButton.visible = !this.isOnEdit;
                this.shellSrv.setGoBackEnabled(this.saveButton.visible);
            }));

        this.detailSrv.setParentId(id);
        this.archiveSrv.appId = CMMS_ROUTING_ARCHIVES;
        return super.loadEntity(id);
    }

    onTabChange(idx: number) {
        const url = this.router.url;
        const next = url.split('/').slice(0, 5).join('/') + '/' + this.URLs[idx];
        this.router.navigate([next]).then();
    }

    public override setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}
