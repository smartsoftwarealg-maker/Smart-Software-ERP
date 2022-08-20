import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {
    AccJournalsService,
    Journal,
    JournalTypeService,
    JournalUser,
    JournalUserService
} from '@ss/accounting/accounting-api';
import {CenterService} from '@ss/administration/api-center';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LoginService, PaginationModel, User} from '@ss/common/api-common';
import {MatSelectionListChange} from '@angular/material/list';
import {UserListService} from '@ss/common/api-users';
import {of, switchMap, tap} from 'rxjs';
import {BankService} from '@ss/administration/api-bank';

@Component({
    selector: 'ss-journal-detail',
    templateUrl: './journal-detail.component.html',
    styleUrls: ['./journal-detail.component.scss']
})
export class JournalDetailComponent extends BaseEntityDetailComponent<Journal> {
    centerLookup = new DefaultAutoCompleteModel(this.centerSrv);
    typeLookup = new DefaultAutoCompleteModel(this.journalTypeSrv);
    bankLookup = new DefaultAutoCompleteModel(this.bankSrv);
    users: JournalUser[] = [];
    paginator = PaginationModel.newInstance({page: 1, pageSize: 5, elementCount: 0});
    userId = 0;
    selectedUser = 0;
    userCtrl = new UntypedFormControl();
    userAutoComplete = new DefaultAutoCompleteModel<User>(this.usersSrv, 'id', 'fullName');
    displayedColumns = ['userName'];

    constructor(
        public override entitySrv: AccJournalsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private centerSrv: CenterService,
        private loginSrv: LoginService,
        private journalTypeSrv: JournalTypeService,
        private journalUserSrv: JournalUserService,
        private bankSrv: BankService,
        private usersSrv: UserListService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ACC_JOURNALS');
        this.centerSrv.setParentId(loginSrv.appCtx.company);
    }

    public setupForm(e: Journal): UntypedFormGroup {
        this.journalUserSrv.setParentId(e.id);
        this.loadUsers();

        return this.formBuilder.group({
            id:           [e.id],
            abbreviation: [e.abbreviation, Validators.maxLength(4)],
            description:  [e.description, Validators.required],
            defaultLabel: [e.defaultLabel],
            jType:        [e.jType],
            bankId:       [e.bankId],
            center:       [e.center],
        });
    }

    loadUsers() {
        this.journalUserSrv
            .getList(this.paginator.page - 1, this.paginator.pageSize)
            .subscribe(res => {
                this.users = res.body;
                this.paginator.elementCount = res.itemCount;
                console.log('users', this.users)
            });
    }

    userSelectionChanged(ev: MatSelectionListChange) {
        this.selectedUser = ev.options[0].value;
        console.log('id', this.selectedUser)
    }

    addUser() {
        const id = this.userCtrl.value;
        if (id != null) {
            this.journalUserSrv
                .addUser(id)
                .pipe(switchMap(_ => this.journalUserSrv.getList(this.paginator.page - 1, this.paginator.pageSize))
                ).subscribe(res => {
                    this.users = res.body;
                    this.paginator.elementCount = res.itemCount;
                    this.snackBarSrv.showSuccessMessage()
                });
        }
    }

    deleteUser() {
        if (this.selectedUser) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(res => res? this.journalUserSrv.deleteUser(this.selectedUser): of({count: -1})),
                      switchMap(res => res.count > 0? this.journalUserSrv.getList(this.paginator.page - 1, this.paginator.pageSize): of(null)))
            .subscribe(res => {
                    if (res && res.itemCount != null) {
                        this.users = res.body;
                        this.paginator.elementCount = res.itemCount;
                        this.snackBarSrv.showSuccessMessage();
                        this.selectedUser = 0;
                    }
            });
        }
    }
}
