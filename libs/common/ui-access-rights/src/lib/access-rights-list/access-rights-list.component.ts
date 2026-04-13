import { Component, inject, signal } from '@angular/core';
import {
    AccessRight, LanguageService,
    LoginService, MaterialModule,
    PaginatorPersistenceService,
    Role
} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AccessRightsService} from '@ss/common/api-access-rights';
import {LookupsService, RoleService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { FormControl, FormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { concatMap, switchMap } from 'rxjs/operators';
import {Observable, tap} from 'rxjs';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { NgClass } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatList, MatListItem } from '@angular/material/list';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';

interface APP {
    key: string;
    description: string;
}
@Component({
    selector: 'ss-access-rights',
    templateUrl: './access-rights-list.component.html',
    styleUrls: ['./access-rights-list.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCheckbox,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatSelect,
        MatOption,
        MatList,
        MatListItem,
        NgClass,
        FormsModule,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        MatSlideToggle,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        TranslatePipe,
        MatCheckbox,
    ],
})
export class AccessRightsListComponent extends BaseEntityListComponent<AccessRight> {
    private langSrv = inject(LanguageService);
    private roleSrv = inject(RoleService);
    public agentAutoCompleteModel = new DefaultAutoCompleteModel(this.roleSrv);

    processing = signal(false);

    apps: string[] = [];
    sortedApps: APP[] = [];
    application = '';
    menuItems: string[] = [];
    roleList: Role[] = [];
    selectedItem = '';
    form = new FormGroup({
        roles: new FormControl(0),
        canRead: new FormControl(false),
        canWrite: new FormControl(false),
        canEdit: new FormControl(false),
        canDelete: new FormControl(false),
    });
    displayedColumns = ['roleId', 'read', 'write', 'edit', 'delete'];
    hasCenterRights = signal(false);

    constructor(
        public loginSrv: LoginService,
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
    ) {
        super(
            rightsSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_ACCESS_RIGHTS',
        );
        this.pagination.pageSize = 15;
        this.hasCenterRights.set(
            (this.loginSrv.appCtx.rightsCenter || 0) !==
                this.loginSrv.appCtx.center,
        );
    }

    // override ngOnInit() {
    //     super.ngOnInit();
    //
    //     this.lookupSrv
    //         .getRoles()
    //         .pipe(
    //             switchMap((res) => {
    //                 this.roleList = res;
    //                 return this.rightsSrv.getApps();
    //             }),
    //         ).subscribe((res) => {
    //             this.apps =
    //                 res['apps'].sort((a, b) => a.localeCompare(b)) || [];
    //             // this.apps.unshift('APPLICATIONS');
    //             this.sortedApps = this.apps
    //                 .map((e) => ({
    //                     key: e,
    //                     description: this.langSrv.translate('COMMON_' + e),
    //                 }))
    //                 .sort((a, b) => a.description.localeCompare(b.description));
    //             this.apps = this.sortedApps.map((e) => e.key);
    //         });
    // }

    protected preInit(): Observable<any> {
        return super.preInit()
            .pipe(
                tap(() => {
                    this.editButton.icon = 'fas fa-save';
                    this.editButton.label = 'COMMON_SAVE';
                    this.editButton.disabled = !this.selectedItem;
                }),
                concatMap(() => this.lookupSrv.getRoles()),
                concatMap((res) => {
                    this.roleList = res;
                    return this.rightsSrv.getApps();
                }),
                tap((res) => {
                    this.apps = res['apps'].sort((a, b) => a.localeCompare(b)) || [];
                    // this.apps.unshift('APPLICATIONS');
                    this.sortedApps = this.apps
                        .map((e) => ({
                            key: e,
                            description: this.langSrv.translate('COMMON_' + e),
                        }))
                        .sort((a, b) => a?.description?.localeCompare(b.description));
                    this.apps = this.sortedApps.map((e) => e.key);
                }),
            );
    }

    protected postInit(): Observable<any> {
        return super.postInit()
            .pipe(tap(() => this.shellSrv.updateShell()));
    }

    override edit() {
        if (this.selectedItem) {
            const r: AccessRight = {
                id: this.selectedRow?.id || 0,
                centerId: this.loginSrv.appCtx.center,
                roleId: this.form.controls['roles'].value || 0,
                document: 0,
                rights:
                    (this.form.controls['canRead'].value === true ? 1 : 0) +
                    (this.form.controls['canWrite'].value === true ? 1 : 0) *
                        2 +
                    (this.form.controls['canEdit'].value === true ? 1 : 0) * 4 +
                    (this.form.controls['canDelete'].value === true ? 1 : 0) *
                        8,
            };
            this.processing.set(true);
            this.editButton.disabled = true;
            this.form.disable();
            this.rightsSrv.saveRights(r, this.selectedItem).subscribe((res) => {
                if (res['count'] || res['id']) {
                    r['read'] = ((r.rights || 0) & 1) === 1;
                    r['write'] = ((r.rights || 0) & 2) === 2;
                    r['edit'] = ((r.rights || 0) & 4) === 4;
                    r['delete'] = ((r.rights || 0) & 1) === 8;
                    this.refresh();
                }
                this.snackBarSrv.showSuccessMessage();
                this.processing.set(false);
                this.editButton.disabled = false;
                this.form.enable();
            });
        } else {
            this.snackBarSrv.showMessage('COMMON_NO_ITEM_SELECTED');
        }
    }

    override showDetail(id: number) {
        if (!id) {
            this.form.controls['roles'].setValue(0);
            this.form.reset();
            this.selectedRow = null;
        }
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
        data.forEach((d) => {
            d.roleName = this.roleList.find(
                (r) => r.id === d.roleId,
            )?.description;
            d.read = ((d.rights || 0) & 1) === 1;
            d.write = ((d.rights || 0) & 2) === 2;
            d.edit = ((d.rights || 0) & 4) === 4;
            d.delete = ((d.rights || 0) & 8) === 8;
        });
        return super.processLoadedData(data);
    }

    setApp(app: { value: string }) {
        this.application = app['value'];
        this.rightsSrv.getEntities(this.application).subscribe((res) => {
            const sorted = res
                .map((e) => ({
                    key: e,
                    description: this.langSrv.translate(e),
                }))
                .sort((a, b) => a?.description?.localeCompare(b.description));
            this.menuItems = sorted.map((e) => e.key);
        });
    }
}
