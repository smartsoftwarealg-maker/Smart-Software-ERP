import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
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


@Component({
    selector: 'ss-costing-project-detail',
    templateUrl: './costing-project-duplicate-detail.component.html',
    styleUrls: ['./costing-project-duplicate-detail.component.scss'],
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
export class CostingProjectDuplicateDetailComponent extends BaseEntityDetailComponent<CProject> implements  OnInit {
    private router = inject(Router);
    private loginSrv = inject(LoginService);

    onEdit = signal(false);
    @HostBinding('@routeAnimation') routeAnimation = true;


    constructor(
        public override entitySrv: CostingProjectService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COST_PROJECT_DUPLICATION');
    }

    public override setupForm(e: CProject): FormGroup {
        return this.formBuilder.group({
            id:          [e.id],
            description: [e.description, Validators.required],
            code:        [e.code, Validators.required],
            centerId:    [e.centerId || this.loginSrv.appCtx.center]
        });
    }


    override save() {
        this.form.markAllAsTouched();
        if (!this.isValidForm()) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val = this.form?.getRawValue();
        this.entitySrv
            .duplicate(val)
            .subscribe({
                next: () => {
                    this.shellSrv.setLoading(false);
                    this.goBack();
                    this.form.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    this.shellSrv.setLoading(false);
                    this.form?.reset(val);
                    throw err;
                }
            });

    }

    override cancel() {
        this.canDeactivate()
            .subscribe(res => res ? this.goBack() : {});
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../..', this.route);
    }
}
