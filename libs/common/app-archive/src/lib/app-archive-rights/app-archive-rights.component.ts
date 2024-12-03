import { Component, inject, OnInit } from '@angular/core';
import { Lookup, RoleService } from '@ss/common/api-lookup';
import { APPLICATIONS } from '../app-archive-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppArchiveService } from '../app-archive.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { AccessRight, MaterialModule, Role } from '@ss/common/api-common';
import { AccessRightsService } from '@ss/common/api-access-rights';
import { switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-app-archive-rights',
    templateUrl: './app-archive-rights.component.html',
    styleUrls: ['./app-archive-rights.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        UiAutoCompleteComponent
    ]})
export class AppArchiveRightsComponent implements OnInit {
    private accessRightSrv = inject(AccessRightsService);
    private archiveSrv = inject(AppArchiveService);
    private roleSrv = inject(RoleService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private snackBarSrv = inject(SnackBarService);


    roleLookup = new DefaultAutoCompleteModel<Role>(this.roleSrv);
    selectedApp:  Lookup = null;
    selectedRole: Lookup = null;
    selectedRight: AccessRight = null;
    roleCtrl = new FormControl<number>(0);

    applications: Lookup[] = APPLICATIONS;
    assignedRoles: AccessRight[] = [];
    roleAssigned = false;


    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('COMMON_ACCESS_RIGHTS');
        this.roleLookup.onObjectSelected = (r) => this.selectRole(r);
    }

    selectApp(a: Lookup) {
        this.selectedApp = a;
        this.archiveSrv
            .getRolesFor(a?.descriptionAr)
            .subscribe(list => this.assignedRoles = list);
    }
    selectRight(a: AccessRight) {
        this.selectedRight = a;
        this.roleCtrl.setValue(a?.roleId || 0);
        this.selectedRole = {id: a?.roleId, description: a?.roleDescription};
        this.roleAssigned = true;
    }

    selectRole(role: Lookup) {
        this.selectedRole = role;
        this.roleAssigned = this.assignedRoles.filter(e => e.roleId === role.id).length > 0;
    }
    addRole() {
        const data: Lookup = {id: this.selectedRole?.id || 0, description: this.selectedApp.descriptionAr};
        this.archiveSrv
            .addRole(data)
            .pipe(tap(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            }),
            switchMap(() => this.archiveSrv.getRolesFor(this.selectedApp?.descriptionAr)))
            .subscribe(res => this.assignedRoles = res);
    }

    deleteRole() {
        if (this.selectedRight) {
            this.accessRightSrv
                .remove(this.selectedRight.id)
                .pipe(tap(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                    }
                }),
                switchMap(() => this.archiveSrv.getRolesFor(this.selectedApp?.descriptionAr)))
                .subscribe(res => this.assignedRoles = res);
        }
    }
}
