import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Center, CenterService} from "@ss/administration/api-center";


@Component({
    selector: 'ss-center-detail',
    styleUrls: ['./center-detail.component.scss'],
    templateUrl: './center-detail.component.html'
})
export class CenterDetailComponent extends BaseEntityDetailComponent<Center> {


    constructor(
        public centerService: CenterService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(centerService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_CENTER');
    }


    public setupForm(b: Center) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
        });
    }

}
