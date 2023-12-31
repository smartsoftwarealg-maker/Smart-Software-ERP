import { Component, HostBinding, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
    private costingPoolSrv = inject(CostingPoolService);
    private loginSrv = inject(LoginService);

    @HostBinding('@routeAnimation') routeAnimation = true;

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
        return this.formBuilder.group({
            id:          [e.id],
            description: [e.description, Validators.required],
            code:        [e.code, Validators.required],
            centerId:    [e.centerId || this.loginSrv.appCtx.center]
        });
    }

    override loadEntity(id: number): Observable<CProject> {
        this.costingPoolSrv.setParentId(id || 0);
        return super.loadEntity(id);
    }
}
