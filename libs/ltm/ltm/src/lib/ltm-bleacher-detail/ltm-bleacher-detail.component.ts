import { Component } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { Lookup } from '@ss/common/api-lookup';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { LtmBleacherService } from '@ltm/ltm-api';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-bleacher-detail',
    templateUrl: './ltm-bleacher-detail.component.html',
    styleUrls: ['./ltm-bleacher-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective
    ],
})
export class LtmBleacherDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public override entitySrv: LtmBleacherService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_BLEACHERS');
    }

    public override setupForm(b: Lookup) {
        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }
}
