import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { Lookup } from '@ss/common/api-lookup';
import { LtmMailingDocumentService, LTMMailingList, LtmMailingService, LtmNormService } from '@ltm/ltm-api';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Observable } from 'rxjs';

@Component({
    selector: 'ss-ltm-norm-detail',
    templateUrl: './ltm-mailing-detail.component.html',
    styleUrls: ['./ltm-mailing-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterOutlet
    ],
})
export class LtmMailingDetailComponent extends BaseEntityDetailComponent<LTMMailingList> implements OnInit {
    #documentSrv = inject(LtmMailingDocumentService);

    constructor(
        public override entitySrv: LtmMailingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_MAILING_LIST');
    }

    public override setupForm(b: LTMMailingList) {
        return this.formBuilder.group({
            id:       [b.id],
            fullName: [b.fullName, Validators.required],
            email:    [b.email, [Validators.required, Validators.email]],
        });
    }

    override loadEntity(id: number): Observable<LTMMailingList> {
        this.#documentSrv.setParentId(id);
        return super.loadEntity(id);
    }

}
