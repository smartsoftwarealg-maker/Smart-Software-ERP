import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Smtp, SmtpService} from "@ss/administration/api-smtp";
import { MatCard, MatCardContent } from "@angular/material/card";
import { NgIf } from "@angular/common";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { TranslateDirective } from "../../../../../common/ui-lang/src/lib/translate.directive";
import { MatInput } from "@angular/material/input";

@Component({
    selector: 'ss-smtp-detail',
    styleUrls: ['./smtp-detail.component.scss'],
    templateUrl: './smtp-detail.component.html',
    standalone: true,
    imports: [MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError]
})
export class SmtpDetailComponent extends BaseEntityDetailComponent<Smtp> {


    constructor(
        public smtpService: SmtpService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(smtpService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_SMTP');
    }


    public override setupForm(b: Smtp) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            domain: [b.domain, Validators.required],
            property: [b.property, Validators.required],
            property_value: [b.property_value, Validators.required],
        });
    }

}
