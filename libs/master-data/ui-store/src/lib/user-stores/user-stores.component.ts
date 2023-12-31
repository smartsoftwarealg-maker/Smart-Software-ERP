import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { LoginService, MaterialModule, PaginationModel, User } from "@ss/common/api-common";
import {UserListService} from '@ss/common/api-users';
import {UserStoresService} from './user-stores.service';
import {UserStore} from '@ss/master-data/api-article';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import {LotsService, Store} from '@ss/common/api-lookup';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {of, switchMap} from 'rxjs';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { StockUiArticleStoreModule } from "@ss/stock/article-store";

@Component({
    selector: 'ss-user-stores',
    templateUrl: './user-stores.component.html',
    styleUrls: ['./user-stores.component.scss'],
    standalone: true,
    imports: [
    CommonModule,
    MaterialModule,
    CommonUiLangModule,
    UiPaginationModule,
    RouterModule,
    ReactiveFormsModule,
    LogisticsUiDocInfoModule,
    CommonUiConfirmationDialogModule,
    CommonUiDatepickerModule,
    CommonUiAutoCompleteModule,
    StockUiArticleStoreModule
],})
export class UserStoresComponent implements OnInit, OnDestroy {
    private loginSrv =  inject(LoginService);
    private lotsService =  inject(LotsService);

    readonly isManager = this.loginSrv.appCtx.manager;
    private filter: string = null;
    private refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => {
            this.refreshUsers();
        }
    };

    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.lotsService);
    userPagination = PaginationModel.newInstance();
    storePagination = PaginationModel.newInstance();
    users: User[] = [];
    stores: UserStore[] = [];
    selectedStore: UserStore = null;
    selectedUserId = 0;
    existingStore = false;
    storeForm = new FormGroup({
        id: new FormControl(0, {nonNullable: true}),
    });

    constructor(private userSrv: UserListService,
                private storeSrv: UserStoresService,
                private shellSrv: ShellService,
                private route: ActivatedRoute,
                private snackBarSrv: SnackBarService,
                private confirmationSrv: ConfirmationDialogService) {
        this.shellSrv.setTitle('STOCK_USER_STORES');
        this.shellSrv.setGoBackPath('..', this.route);
        this.userPagination.pageSize = 10;
        this.userPagination.onChange = () => this.refreshUsers();
        this.storePagination.onChange = () => this.refreshStores();
    }

    ngOnInit(): void {
        this.shellSrv.setButtons([this.refreshButton]);
        this.shellSrv.enableSearch('SEARCH_APP', o => o.subscribe((f: string) => this.search(f)));
        this.refreshUsers();
    }

    selectUser(user: User) {
        this.selectedUserId = user?.id | 0;
        this.storeSrv.setParentId(this.selectedUserId);
        this.storeSrv
            .getList(this.storePagination.page - 1, this.storePagination.pageSize)
            .subscribe(res => {
                this.stores = res.body;
                this.storePagination.elementCount = res.itemCount;
            });
    }

    selectStore(s: UserStore) {
        this.selectedStore = s;
        this.storeForm.setValue({ id: s?.storeId || 0 });
        this.existingStore = this.stores.length > 0 && this.stores.filter(e => e.userId === s?.storeId) !== null;
    }

    addStore() {
        const id = this.storeForm.getRawValue().id;
        const entity = { id: 0, userId: this.storeSrv.getParentId(), storeId: id, storeDescription: this.storeAutoCompleteModel.cache.description};
        this.storeSrv
            .save(entity)
            .subscribe(id => {
                entity.id = id;
                this.stores.push(entity);
                this.snackBarSrv.showSuccessMessage();
            });
    }

    removeStore() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res? this.storeSrv.remove(this.selectedStore?.id) : of(false)))
            .subscribe(res => {
                if (typeof res !== 'boolean') {
                    this.stores = this.stores.filter(e => e.id !== this.selectedStore?.id);
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    private refreshUsers() {
        this.userSrv
            .getList(this.userPagination.page - 1, this.userPagination.pageSize, this.filter)
            .subscribe(res => {
                this.users = res.body;
                this.userPagination.elementCount = res.itemCount;
                this.selectedUserId = 0;
                this.stores = [];
                this.existingStore = false;
            });
    }

    private refreshStores() {
        this.storeSrv
            .getList(this.storePagination.page - 1, this.storePagination.pageSize)
            .subscribe(res => {
                this.stores = res.body;
                this.storePagination.elementCount = res.itemCount;
            });
    }

    private search(filter: string) {
        this.filter = filter;
        this.refreshUsers();
    }

    ngOnDestroy() {
        this.shellSrv.reset();
    }
}
