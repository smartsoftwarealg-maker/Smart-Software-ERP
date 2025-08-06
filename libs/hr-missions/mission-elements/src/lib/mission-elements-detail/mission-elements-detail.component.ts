import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UserListService } from '@ss/common/api-users';
import { MissionElement } from '../mission-elements-api.class';
import { MissionsElementService } from '../mission-element.service';
import { MissionsElementPricingService } from '../mission-elementPricing.service';

@Component({
    selector: 'ss-mission-elements-list-detail',
    imports: [CommonModule, MaterialModule, TranslateDirective, RouterOutlet],
    templateUrl: './mission-elements-detail.component.html',
    styleUrl: './mission-elements-detail.component.scss',
    standalone: true,
})
export class MissionElementsDetailComponent extends BaseEntityDetailComponent<MissionElement> {
    private pricingSrv = inject(MissionsElementPricingService);

    constructor(
        public detailSrv: MissionsElementService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public usersSrv: UserListService,
    ) {
        super(
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'MISSION_MISSION_ELEMENT_DETAIL',
        );
    }

    public override setupForm(b: MissionElement): UntypedFormGroup {
        this.pricingSrv.setParentId(b.id || 0);
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            elemType: [b.elemType],
            fromHour: [b.fromHour, Validators.required],
            fromMin: [b.fromMin, Validators.required],
            toHour: [b.toHour, Validators.required],
            toMin: [b.toMin, Validators.required],
        });
    }
}
