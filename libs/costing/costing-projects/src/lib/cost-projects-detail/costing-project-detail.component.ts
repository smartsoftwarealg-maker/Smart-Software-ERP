import { Component, HostBinding, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterEvent, RouterModule } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {
    CProject,
    slideToRight
} from '@ss/costing/costing-utils';
import { CommonModule } from '@angular/common';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CostingProjectService } from '../services/costing-project.service';
import { filter, Observable } from 'rxjs';
import { CostingPoolService } from '../services/costing-pool.service';
import { CProductLineService } from '../services/product-line.service';
import { CostingOhService } from '../services/costing-oh.service';
import { CostingReportService } from '../services/costing-report.service';


@Component({
    selector: 'ss-costing-project-detail',
    templateUrl: './costing-project-detail.component.html',
    styleUrls: ['./costing-project-detail.component.scss'],
    animations: [slideToRight],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        CommonUiLangModule
    ]
})
export class CostingProjectDetailComponent extends BaseEntityDetailComponent<CProject> implements  OnInit {
    private reportSrv = inject(CostingReportService);
    private productSrv = inject(CProductLineService);
    private router = inject(Router);
    private costingPoolSrv = inject(CostingPoolService);
    private ohSrv = inject(CostingOhService);
    private loginSrv = inject(LoginService);

    onEdit = signal(false);
    @HostBinding('@routeAnimation') routeAnimation = true;
    activePanel = -1;
    private URLS = ['products', 'pools', 'oh', 'reports'];

    PRODUCTS_PANEL = 0;
    POOLS_PANEL = 1;
    COH_PANEL = 2;
    COH_REPORT = 3;

    constructor(
        public override entitySrv: CostingProjectService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COSTING_PROJECTS');
    }

    public override setupForm(e: CProject): FormGroup {
        this.showPanel(0);
        return this.formBuilder.group({
            id:          [e.id],
            description: [e.description, Validators.required],
            code:        [e.code, Validators.required],
            centerId:    [e.centerId || this.loginSrv.appCtx.center]
        });
    }

    override loadEntity(id: number): Observable<CProject> {
        const iId = id || 0;
        this.productSrv.setParentId(iId);
        this.costingPoolSrv.setParentId(iId);
        this.ohSrv.setParentId(iId);
        this.reportSrv.parentId = iId;
        return super.loadEntity(id);
    }

    showPanel(index: number) {
        this.activePanel = index;
        const url = this.URLS[index];
        if (this.router.url.indexOf(url) < 0) {
            this.router.navigate([url], { relativeTo: this.route }).then();
        }
    }

    override ngOnInit() {
        super.ngOnInit();
        this.router.events.pipe(filter((e: any): e is RouterEvent => e instanceof RouterEvent))
            .subscribe((e: RouterEvent) => {
                this.onEdit.set(e.url.split('/').length > 6);
            });
    }
}
