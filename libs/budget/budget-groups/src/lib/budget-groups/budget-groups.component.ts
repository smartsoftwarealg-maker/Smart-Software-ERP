import {Component, OnDestroy, OnInit} from '@angular/core';
import {BudgetGroupsService} from '../budget-groups.service';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {BudgetAccount, BudgetGroupTree} from '../budget-groups-api';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MatRadioChange} from '@angular/material/radio';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BudgetGroupsAddDlgComponent} from '../budget-groups-add-dlg/budget-groups-add-dlg.component';
import {of, Subscription, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Account, AccountService} from '@ss/accounting/api-accounts';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {BudgetAccountService} from '../budget-account.service';
import {LanguageService} from '@ss/common/api-common';

@Component({
    selector: 'ss-budget-groups',
    templateUrl: './budget-groups.component.html',
    styleUrls: ['./budget-groups.component.scss'],
})
export class BudgetGroupsComponent implements OnInit, OnDestroy {
    private subscription: Subscription = null;
    private currentType = 1;
    private INCOME: BudgetGroupTree = {
        id: 0,
        description: this.langSrv.translate('BUD_INCOME'),
        accountType: 1,
        disabled: false
    }
    private EXPENSE: BudgetGroupTree = {
        id: 0,
        description: this.langSrv.translate('BUD_EXPENSE'),
        accountType: -1,
        disabled: false
    }

    private addButton: ToolbarButton = {
        disabled: true,
        icon: 'fa-solid fa-plus',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'BUD_ADD_GROUP',
        visible: true,
        click: () => this.addGroup({id: 0, description: '', parentId: this.selectedGroup?.id, accountType: this.currentType, code: '', disabled: false}),
    }

    private editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.addGroup(this.selectedGroup)
    };

    private deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.deleteSelected()
    };

    searchText = new FormControl<string>('');
    selectedAccount: Account = null;
    selectedGroup: BudgetGroupTree = null;
    selectedBudgetAccount: BudgetAccount = null;
    treeControl = new NestedTreeControl<BudgetGroupTree>(node => node.children);
    dataSource  = new MatTreeNestedDataSource<BudgetGroupTree>();
    accountData: Account[] = [];
    budgetAccountData: BudgetAccount[] = [];

    constructor(private entitySrv: BudgetGroupsService,
                private accountSrv: AccountService,
                private budgetAccountSrv: BudgetAccountService,
                private shellSrv: ShellService,
                private dialog: MatDialog,
                private confirmationSrv: ConfirmationDialogService,
                private snackBarSrv: SnackBarService,
                private langSrv: LanguageService,
                private route: ActivatedRoute) {}

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.shellSrv.setTitle('BUD_BUDGET_GROUPS');
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.addButton(this.editButton);
        this.shellSrv.addButton(this.addButton);
        this.shellSrv.addButton(this.deleteButton);
        this.subscription = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() =>  this.refreshAccounts());

        this.refresh(1);
    }

    hasChild = (_: number, node: BudgetGroupTree) => !!node.children && node.children.length > 0;

    onChange(e: MatRadioChange) {
        this.currentType = +e.value === 1? 1 : -1;
        this.refresh(e.value);
    }

    private refresh(mode: number) {
        this.dataSource.data = [];
        if (mode == 1) {
            this.entitySrv
                .income()
                .subscribe(res => {
                    this.INCOME.children = res;
                    this.dataSource.data = [this.INCOME];
                });
        } else {
            this.entitySrv
                .expense()
                .subscribe(res => {
                    this.EXPENSE.children = res;
                    this.dataSource.data = [this.EXPENSE];
                });
        }
    }

    select(bg: BudgetGroupTree) {
        this.selectedGroup = bg;
        this.editButton.disabled = this.deleteButton.disabled = this.addButton.disabled = !bg.id;
        if (!bg || bg?.children?.length > 0) {
            this.budgetAccountData = [];
        } else {
            this.budgetAccountSrv.setParentId(bg.id);
            this.budgetAccountSrv
                .getList(0, 50)
                .subscribe(res => this.budgetAccountData = res.body);
        }
    }

    private addGroup(group: BudgetGroupTree) {
        if (!this.addButton.disabled && this.selectedGroup?.id) {
            const dialogRef = this.dialog.open(BudgetGroupsAddDlgComponent, {
                width: '600px',
                height: '360px',
                disableClose: true,
                data: group
            });

            dialogRef
                .afterClosed()
                .pipe(switchMap(res => res? this.entitySrv.save(res) : of(null)))
                .subscribe(res => {
                    if (res) {
                        this.snackBarSrv.showSuccessMessage();
                        this.refresh(this.selectedGroup.accountType);
                    }
                });
        }
    }


    private deleteSelected(): void {
        if (this.selectedGroup?.id) {
            this.confirmationSrv.confirmDelete()
                .subscribe((b: boolean) => {
                    if (b) {
                        this.entitySrv.remove(this.selectedGroup.id)
                            .subscribe({
                                next: () => {
                                    this.snackBarSrv.showSuccessMessage();
                                    this.refresh(this.selectedGroup.accountType);
                                },
                                error: (err: HttpErrorResponse) => {
                                    this.snackBarSrv.showFailureMessage();
                                    this.shellSrv.setLoading(false);
                                    throw err;
                                }
                            });
                    }
                });
        }
    }

    private refreshAccounts() {
        this.accountSrv
            .budgetAccounts(this.searchText.value)
            .subscribe(res => this.accountData = res.body);
    }

    onOver(event: DragEvent) {
        event.preventDefault();
    }

    selectAccount(a: Account) {
        this.selectedAccount = a;
    }

    onStart(event: DragEvent, id: string) {
        event.dataTransfer.setData("text", id);
    }

    onAccountDrop(event: DragEvent) {
        event.preventDefault();
        const id = +event.dataTransfer.getData("text");
        console.log('id', id, event.target);
        // this.selectedPayment = this.treeControl.dataNodes.find(n => n.id === id);
        // this.cancelPayments();
        // console.log('drop payment: ', id);
    }

    onGroupDrop(event: DragEvent, groupId: number) {
        event.preventDefault();
        const accId = +event.dataTransfer.getData("text");
        const account = this.accountData.filter(acc => acc.id === accId);
        if (account.length > 0) {
            const budgetAccount: BudgetAccount = {
                id: 0,
                groupId: groupId,
                accountNo: account[0].accountNo,
                balanceType: 3,
                balanceSign: 1,
                description: account[0].description
            }
            this.budgetAccountSrv
                .save(budgetAccount)
                .subscribe(res => {
                    budgetAccount.id = res;
                    this.budgetAccountData.push(budgetAccount);
                });
        }
    }

    findNodeById(tree: BudgetGroupTree[], id: number): BudgetGroupTree {
        if (tree === null || tree.length == 0) {
            return null;
        }
        const tmp = tree.filter(t => t.id === id);
        return tmp.length === 1?
            tmp[0] :
            this.findNodeById(
                tree.filter(c => c.children && c.children.length>0)
                .map(c => c.children)
                .reduce((acc, a) => acc?.concat(a)), id);
    }

    onOverChild(event: DragEvent, id: number) {
        const group = this.findNodeById(this.dataSource.data, id);
         if (group && (!group.children || group.children?.length === 0)) {
            event.preventDefault();
         }
    }

    selectBudgetAccount(ba: BudgetAccount) {
        this.selectedBudgetAccount = ba;
    }

    deleteBudgetAccount(id: number) {
        if (id) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(ans => ans ? this.budgetAccountSrv.remove(id) : of(null)))
                .subscribe(res => {
                    if (res && res['count']) {
                        this.budgetAccountData = this.budgetAccountData.filter(e => e.id !== id);
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    addSelectedAccount() {
        const accId = this.selectedAccount?.id || 0;
        const account = this.accountData.filter(acc => acc.id === accId);
        if (account.length > 0 && this.selectedGroup?.id) {
            const budgetAccount: BudgetAccount = {
                id: 0,
                groupId: this.selectedGroup.id,
                accountNo: account[0].accountNo,
                balanceType: 3,
                balanceSign: 1,
                description: account[0].description
            }
            this.budgetAccountSrv
                .save(budgetAccount)
                .subscribe(res => {
                    budgetAccount.id = res;
                    this.budgetAccountData.push(budgetAccount);
                });
        }
    }
}
