import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Smtp, SmtpService} from "@ss/administration/api-smtp";

@Component({
    selector: 'ss-smtp-detail',
    styleUrls: ['./smtp-detail.component.scss'],
    templateUrl: './smtp-detail.component.html'
})
export class SmtpDetailComponent extends BaseEntityDetailComponent<Smtp> {


    constructor(
        public smtpService: SmtpService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(smtpService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_SMTP');
    }


    public setupForm(b: Smtp) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            domain: [b.domain, Validators.required],
            property: [b.property, Validators.required],
            property_value: [b.property_value, Validators.required],
        });
    }

}
