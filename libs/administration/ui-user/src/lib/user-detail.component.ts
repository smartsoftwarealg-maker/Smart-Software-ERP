import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {Bank, BankService} from "@ss/administration/api-bank";
import {User, UserService} from '@ss/common/api-users';


@Component({
    selector: 'ss-bank-detail',
    styleUrls: ['./user-detail.component.scss'],
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent extends BaseEntityDetailComponent<User> {
    pwd1 = new FormControl();
    pwd2 = new FormControl();
    validId = false;
    private curUser: User;

    constructor(
        public userService: UserService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(userService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_BANK');
    }


    public setupForm(b: User) {
        this.curUser = b;
        this.validId = b.id > 0;
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            fullName: [b.fullName, Validators.required],
            description: [b.description, Validators.required],
            manager: [b.manager || false],
            blocked: [b.blocked || false]
        });
    }

    public updatePassword() {
        if (this.pwd1.value === this.pwd2.value && this.curUser != null) {
            this.curUser.password = this.pwd1.value;
            this.userService
                .updatePassword(this.curUser)
                .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }
}
