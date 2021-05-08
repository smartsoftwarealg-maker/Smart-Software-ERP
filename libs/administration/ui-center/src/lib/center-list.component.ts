import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Center, CenterService} from '@ss/administration/api-center';
import {AppContextService, UserService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'ss-center-list',
    styleUrls: ['./center-list.component.scss'],
    templateUrl: './center-list.component.html'
})
export class CenterListComponent extends BaseEntityListComponent<Center> {


    displayedColumns = [
        'description',
        'address'
    ];


    constructor(
        public centerSrv: CenterService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public confirmationSrv: ConfirmationDialogService,
        private contextSrv: AppContextService) {
        super(centerSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'ADMINISTRATION_CENTER');
    }


    preload(): Observable<any> {
        this.centerSrv.setParentId(this.contextSrv.context.company)
        return of(true);
    }
}
