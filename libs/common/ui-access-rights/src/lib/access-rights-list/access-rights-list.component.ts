import {Component} from '@angular/core';
import {
    AccessRight,
    LanguageService,
    LoginService,
    PaginatorPersistenceService,
    Role
} from "@ss/common/api-common";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {AccessRightsService} from "@ss/common/api-access-rights";
import {LookupsService, RoleService} from "@ss/common/api-lookup";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BaseEntityListComponent} from "@ss/common/ui-base-entity";

@Component({
  selector: 'ss-access-rights',
  templateUrl: './access-rights-list.component.html',
  styleUrls: ['./access-rights-list.component.scss']
})
export class AccessRightsListComponent extends BaseEntityListComponent<AccessRight> {
    public agentAutoCompleteModel = new DefaultAutoCompleteModel(this.roleSrv);

    apps: string[] = [];
    sortedApps: string[] = [];
    application = '';
    menuItems: string[] = [];
    roleList: Role[] = [];
    selectedItem = '';
    form: UntypedFormGroup = null;
    displayedColumns = ['roleId', 'read', 'write', 'edit', 'delete'];

    constructor(
        private loginSrv: LoginService,
        public rightsSrv: AccessRightsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        private lookupSrv: LookupsService,
        public formBuilder: UntypedFormBuilder,
        public override pagPersistSrv: PaginatorPersistenceService,
        private roleSrv: RoleService) {
        super(rightsSrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
            'COMMON_ACCESS_RIGHTS');
        this.pagination.pageSize = 20;
        this.form = new UntypedFormGroup({
            roles: new UntypedFormControl(),
            canRead: new UntypedFormControl(false),
            canWrite: new UntypedFormControl(false),
            canEdit: new UntypedFormControl(false),
            canDelete: new UntypedFormControl(false)
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.editButton.icon = 'fas fa-save';
        this.editButton.label = 'COMMON_SAVE';
        this.editButton.disabled = !this.selectedItem;
        this.shellSrv.updateShell();
        this.lookupSrv.getRoles()
            .pipe(
                switchMap(res => {
                    this.roleList = res;
                    return this.rightsSrv.getApps();
                }))
            .subscribe(res => {
                this.apps = (res['apps'].sort((a, b) => a.localeCompare(b)) || []);
                this.apps.unshift('APPLICATIONS');
                this.sortedApps = this.apps
                    .map(e => 'COMMON_' + e)
                    .sort((a, b) => a.localeCompare(b));
            });
    }

    override edit() {
        if (this.selectedItem) {
            const r: AccessRight = {
                id: this.selectedRow?.id || 0,
                centerId: this.loginSrv.appCtx.center,
                roleId: this.form.controls['roles'].value || 0,
                document: 0,
                rights: (this.form.controls['canRead'].value || 0) +
                        (this.form.controls['canWrite'].value || 0) * 2 +
                        (this.form.controls['canEdit'].value || 0) * 4 +
                        (this.form.controls['canDelete'].value || 0) * 8,
            };
            this.rightsSrv
                .saveRights(r, this.selectedItem)
                .subscribe(res => {
                    if (res['count'] || res['id']) {
                        r['read'] = ((r.rights || 0) & 1) === 1;
                        r['write'] = ((r.rights || 0) & 2) === 2;
                        r['edit'] = ((r.rights || 0) & 4) === 4;
                        r['delete'] = ((r.rights || 0) & 1) === 8;
                        this.refresh();
                    }
                    this.snackBarSrv.showSuccessMessage();
                });
        } else {
            this.snackBarSrv.showMessage('COMMON_NO_ITEM_SELECTED');
        }
    }

    override showDetail(id: number) {
        this.editButton.disabled = false;
    }

    selectItem(item: string) {
        this.selectedItem = item;
        super.setFilter(item);
        this.editButton.disabled = !item;
        super.selectRow(null);
        this.form.reset();
    }

    override selectRow(row: AccessRight) {
        super.selectRow(row);
        this.form.controls['roles']?.setValue(row?.roleId || 0);
        this.form.controls['canRead']?.setValue(this.canRead());
        this.form.controls['canWrite']?.setValue(this.canWrite());
        this.form.controls['canEdit']?.setValue(this.canEdit());
        this.form.controls['canDelete']?.setValue(this.canDelete());
        this.editButton.disabled = row == null;
    }

    canRead() {
        return this.selectedRow && (this.selectedRow.rights & 1) === 1;
    }

    canWrite() {
        return this.selectedRow && (this.selectedRow.rights & 2) === 2;
    }

    canEdit() {
        return this.selectedRow && (this.selectedRow.rights & 4) === 4;
    }

    canDelete() {
        return this.selectedRow && (this.selectedRow.rights & 8) === 8;
    }


    override processLoadedData(data: AccessRight[]): Observable<AccessRight[]> {
        data.forEach(d => {
            d.roleName = this.roleList.find(r => r.id === d.roleId)?.description;
            d.read = ((d.rights || 0) & 1) === 1;
            d.write = ((d.rights || 0) & 2) === 2;
            d.edit = ((d.rights || 0) & 4) === 4;
            d.delete = ((d.rights || 0) & 8) === 8;
        });
        return super.processLoadedData(data);
    }

    setApp(app: { value: string }) {
        this.application = app['value'];
        this.rightsSrv
            .getEntities(this.application)
            .subscribe(res => this.menuItems = res);
    }
}
