import { Component, inject, OnInit, signal } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { filter, Observable } from 'rxjs';
import { CMMSRoutingPartService } from '@ss/cmms/lookups';
import { AppArchiveService, CMMS_ROUTING_ARCHIVES } from '@ss/common/app-archive';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@ss/common/api-common';
import { CMMSRoutingDetailService } from '../services/cmms-routing-detail.service';
import { CMMSRoutingService } from '../services/cmms.routing.service';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-routing-detail',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, MatSortModule, MatTableModule, MaterialModule, RouterOutlet, TranslatePipe, TranslateDirective],
    templateUrl: './cmms-routing-detail.component.html',
    styleUrls: ['./cmms-routing-detail.component.css']
})
export class CMMSRoutingDetailComponent extends BaseEntityDetailComponent<Lookup> implements OnInit {
    private router = inject(Router);
    private archiveSrv = inject(AppArchiveService);
    private URLs = ['detail', 'parts', 'archive'];

    isOnEdit = false;
    isChecklist = false;
    showParts = signal(false);

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

    public override setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [e.id],
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.route.data.subscribe(data => this.showParts.set(data['showParts'] === true || false));
    }
}
