import { Component, inject } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { LookupsService, RoleService } from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {
    LoginService,
    Role,
    User,
    UserCenter,
    UserRole, UserService
} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {CenterService} from '@ss/administration/api-center';
import { switchMap, tap } from 'rxjs/operators';
import { MatSelectionListChange, MatSelectionList, MatListOption } from '@angular/material/list';
import {of} from 'rxjs';
import {UserListService} from '@ss/common/api-users';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-bank-detail',
    styleUrls: ['./user-detail.component.scss'],
    templateUrl: './user-detail.component.html',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, MatCheckbox, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatButton, NgClass, MatSelectionList, NgFor, MatListOption, MatMiniFabButton, UiAutoCompleteComponent]
})
export class UserDetailComponent extends BaseEntityDetailComponent<User> {
    private userSrv = inject(UserService);
    private loginSrv = inject(LoginService);
    private centerSrv = inject(CenterService);
    private roleServ = inject(RoleService);
    pwd1 = new UntypedFormControl();
    pwd2 = new UntypedFormControl();
    validId = false;
    openedPanel = -1;
    isManager = this.loginSrv.appCtx?.manager;

    userRoles: UserRole[] = [];
    userCenters: UserCenter[] = [];

    selectedRole = 0;
    selectedCenter = 0;

    roleCtrl = new UntypedFormControl();
    centerCtrl = new UntypedFormControl();
    roleAutoComplete = new DefaultAutoCompleteModel<Role>(this.roleServ);
    centerAutoComplete = new DefaultAutoCompleteModel<Role>(this.centerSrv);

    private curUser: User;

    constructor(
        private userListSrv: UserListService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(userListSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_USERS');
        this.centerSrv.setParentId(this.loginSrv.appCtx.company);
    }


    public override setupForm(b: User) {
        this.saveButton.visible = this.isManager;
        this.curUser = b;
        this.validId = b.id > 0;
        // Make sure to update the template if you edit the configuration here
        this.loadCentersAndRoles();

        return this.formBuilder.group({
            id: [b.id],
            fullName:    [{ value: b.fullName, disabled: !this.isManager }, Validators.required],
            fullNameAr:  [{ value: b.fullNameAr, disabled: !this.isManager }],
            description: [{ value: b.description, disabled: !this.isManager }, Validators.required],
            manager:     [b.manager || false],
            responsible: [b.responsible || false],
            blocked:     [b.blocked || false],
            email:       [b.email, Validators.email]
        });
    }


    public updatePassword() {
        if (this.pwd1.value === this.pwd2.value && this.curUser != null) {
            this.curUser.password = this.pwd1.value;
            this.userSrv
                .updatePassword( { id: this.curUser.id, password: this.pwd1.value })
                .subscribe(() => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
        }
    }

    deleteRole() {
        if (this.selectedRole) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(yes => yes?
                    this.userSrv.deleteRole(this.curUser.id, this.selectedRole) : of({ count: 0 })),
                switchMap(res => !res || res['count'] > 0? this.userSrv.loadRoles(this.curUser.id) : of(null)))
                .subscribe(res => {
                    if (res) {
                        this.userRoles = res;
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    addRole() {
        if (this.roleCtrl.value != null) {
            this.userSrv
                .addRole(this.curUser.id, this.roleCtrl.value)
                .pipe(switchMap(() => this.userSrv.loadRoles(this.curUser.id)))
                .subscribe(res => {
                    this.userRoles = res;
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }

    roleSelectionChanged(ev: MatSelectionListChange) {
        this.selectedRole = ev.options[0].value;
    }

    deleteCenter() {
        if (this.selectedCenter) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(yes => yes?
                    this.userSrv.deleteCenter(this.curUser.id, this.selectedCenter) : of({ count: 0 })),
                switchMap(res => !res || res['count'] > 0? this.userSrv.loadCenters(this.curUser.id) : of(null)))
                .subscribe(res => {
                    if (res) {
                        this.userCenters = res;
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    addCenter() {
        if (this.centerCtrl.value != null) {
            this.userSrv
                .addCenter(this.curUser.id, this.centerCtrl.value)
                .pipe(switchMap(() => this.userSrv.loadCenters(this.curUser.id)))
                .subscribe(res => {
                    this.userCenters = res;
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }


    centerSelectionChanged(ev: MatSelectionListChange) {
        this.selectedCenter = ev.options[0].value;
    }

    loadCentersAndRoles() {
        this.userSrv
            .loadCenters(this.curUser.id)
            .pipe(
                tap(res => this.userCenters = res),
                switchMap(() => this.userSrv.loadRoles(this.curUser.id))
            ).subscribe(res => this.userRoles = res);

    }
}
