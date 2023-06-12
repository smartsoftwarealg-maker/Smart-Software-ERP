import { Component, inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { LTMLineMatter } from '../ltm-api';
import {LtmLineMatterService} from '../services/ltm-line-matter.service';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { LoginService } from '@ss/common/api-common';
import { LtmMatterService } from '../services/ltm-matter.service';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-line-matter-detail',
    templateUrl: './line-matter-detail.component.html',
    styleUrls: ['./line-matter-detail.component.scss'],
})
export class LineMatterDetailComponent extends BaseEntityDetailComponent<LTMLineMatter> {
    private loginSrv = inject(LoginService);
    private matterSrv = inject(LtmMatterService);

    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);
    constructor(
        public override entitySrv: LtmLineMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_LINE_MATTERS');
    }


    public override setupForm(b: LTMLineMatter) {
        return this.formBuilder.group({
            id:            [b.id],
            centerId:      [b.centerId || this.loginSrv.appCtx.center],
            matterId:      [b.matterId],
        });
    }
}
