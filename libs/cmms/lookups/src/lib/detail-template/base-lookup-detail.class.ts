import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseLookupService } from '@ss/common/api-common';

export class BaseLookupDetailClass extends BaseEntityDetailComponent<Lookup> {
    protected constructor(
        public override entitySrv: BaseLookupService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public override title: string) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, title);
    }

    public override setupForm(e: Lookup): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
