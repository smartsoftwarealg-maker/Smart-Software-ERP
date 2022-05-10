import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, RoleService} from '@ss/common/api-lookup';
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
import {switchMap} from 'rxjs/operators';
import {MatSelectionListChange} from '@angular/material/list';
import {of} from 'rxjs';
import {UserListService} from '@ss/common/api-users';


@Component({
    selector: 'ss-bank-detail',
    styleUrls: ['./user-detail.component.scss'],
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent extends BaseEntityDetailComponent<User> {
    pwd1 = new FormControl();
    pwd2 = new FormControl();
    validId = false;
    openedPanel = -1;
    isManager = false;

    roleList: Role[] = [];
    centerList: Role[] = [];
    userRoles: UserRole[] = [];
    userCenters: UserCenter[] = [];

    selectedRole = 0;
    selectedCenter = 0;

    roleCtrl = new FormControl();
    centerCtrl = new FormControl();
    roleAutoComplete = new DefaultAutoCompleteModel<Role>(this.roleServ);
    centerAutoComplete = new DefaultAutoCompleteModel<Role>(this.centerSrv);

    private curUser: User;

    constructor(
        private userListSrv: UserListService,
        private userSrv: UserService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private roleServ: RoleService,
        private loginSrv: LoginService,
        private centerSrv: CenterService) {
        super(userListSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_USERS');
        this.isManager = loginSrv.appCtx?.manager;
    }


    public setupForm(b: User) {
        this.curUser = b;
        this.validId = b.id > 0;
        // Make sure to update the template if you edit the configuration here

        this.roleServ
            .getList(0, 50)
            .pipe(
                switchMap(res => {
                    this.roleList = res['body'];
                    this.centerSrv.setParentId(this.loginSrv.appCtx?.company);
                    return this.centerSrv.getList(0, 50)
                }),
                switchMap(res => {
                    this.centerList = res['body'];
                    return this.userSrv.loadCenters(b.id);
                }),
                switchMap((res: any) => {
                    this.loadUserCenters(res);
                    return this.userSrv.loadRoles(b.id);
                })).subscribe(res => this.loadUserRoles(res));

        return this.formBuilder.group({
            id: [b.id],
            fullName: [b.fullName, Validators.required],
            description: [b.description, Validators.required],
            manager: [b.manager || false],
            responsible: [b.responsible || false],
            blocked: [b.blocked || false]
        });
    }


    public updatePassword() {
        if (this.pwd1.value === this.pwd2.value && this.curUser != null) {
            this.curUser.password = this.pwd1.value;
            this.userSrv
                .updatePassword( { id: this.curUser.id, password: this.pwd1.value })
                .subscribe(res => this.snackBarSrv.showMessage('COMMON_SUCCESS', false, false));
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
                        this.loadUserRoles(res as UserRole[]);
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    addRole() {
        if (this.roleCtrl.value != null) {
            this.userSrv
                .addRole(this.curUser.id, this.roleCtrl.value)
                .pipe(switchMap(res => this.userSrv.loadRoles(this.curUser.id)))
                .subscribe(res => {
                    this.loadUserRoles(res);
                    this.snackBarSrv.showSuccessMessage()
                });
        }
    }

    private loadUserRoles(res: UserRole[]) {
        this.userRoles = res;
        this.userRoles.forEach(e => e.description = this.roleList.find(r => r.id === e.roleId)?.description);
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
                        this.loadUserCenters(res as UserCenter[]);
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    addCenter() {
        if (this.centerCtrl.value != null) {
            this.userSrv
                .addCenter(this.curUser.id, this.centerCtrl.value)
                .pipe(switchMap(res => this.userSrv.loadCenters(this.curUser.id)))
                .subscribe(res => {
                    this.loadUserCenters(res);
                    this.snackBarSrv.showSuccessMessage()
                });
        }
    }

    private loadUserCenters(res: UserCenter[]) {
        this.userCenters = res;
        this.userCenters.forEach(e => e.description = this.centerList.find(r => r.id === e.centerId)?.description);
    }

    centerSelectionChanged(ev: MatSelectionListChange) {
        this.selectedCenter = ev.options[0].value;
    }
}
