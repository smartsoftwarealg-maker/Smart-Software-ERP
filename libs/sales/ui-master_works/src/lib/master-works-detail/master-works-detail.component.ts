import {Component, inject} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {MaterialModule} from '@ss/common/api-common';
import {TranslateDirective} from '@ss/common/ui-lang';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MasterWorksService} from "../master-works.service";
import {masterWork} from "../master-works-api.class";

@Component({
    selector: 'ss-sales-master_works-detail',
    templateUrl: 'master-works-detail.component.html',
    styleUrl: 'master-works-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        RouterOutlet
    ]
})
export class MasterWorksDetailComponent extends BaseEntityDetailComponent<masterWork> {
    private masterWorksService = inject(MasterWorksService);

    constructor(
        public override entitySrv: MasterWorksService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'LOGISTICS_MASTER_WORK',
        );
    }

    public override setupForm(e: masterWork): UntypedFormGroup {
        this.masterWorksService.setParentId(e.id || 0);
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr, Validators.required],
        });
    }
}
