import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
//import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Bank, BankService} from '@ss/administration/api-bank';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';




@Component({
    selector: 'ss-bank-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
    ],
    styleUrls: ['./bank-detail.component.scss'],
    templateUrl: './bank-detail.component.html'
})
export class BankDetailComponent extends BaseEntityDetailComponent<Bank> {
    constructor(
        public override entitySrv: BankService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_BANK');
    }


    public override setupForm(b: Bank) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            code: [b.code, Validators.maxLength(4)],
            description: [b.description, Validators.required],
        });
    }
}
