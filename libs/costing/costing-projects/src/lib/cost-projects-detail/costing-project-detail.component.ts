import { Component, HostBinding, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { Observable } from 'rxjs';
import { CostingPoolService } from '../services/costing-pool.service';
import { CProductLineService } from '../services/product-line.service';


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
export class CostingProjectDetailComponent extends BaseEntityDetailComponent<CProject> {
    private productSrv = inject(CProductLineService);
    private router = inject(Router);
    private costingPoolSrv = inject(CostingPoolService);
    private loginSrv = inject(LoginService);

    @HostBinding('@routeAnimation') routeAnimation = true;
    activePanel = -1;
    private URLS = ['products', 'pools'];

    PRODUCTS_PANEL = 0;
    POOLS_PANEL = 1;

    constructor(
        public override entitySrv: CostingProjectService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COSTING_PRODUCTS');
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
        this.productSrv.setParentId(id || 0);
        this.costingPoolSrv.setParentId(id || 0);
        return super.loadEntity(id);
    }

    showPanel(index: number) {
        this.activePanel = index;
        const url = this.URLS[index];
        if (this.router.url.indexOf(url) < 0) {
            this.router.navigate([url], { relativeTo: this.route }).then();
        }
    }
}
