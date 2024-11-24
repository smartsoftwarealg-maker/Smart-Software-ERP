import { Component, OnDestroy, OnInit } from '@angular/core';
import { DisplayableService, FullService } from '../hotel-api';
import { BackendDataSource } from '../../common/base-classes/backend-data-source';
import { AbstractEntityList } from '../../common/base-classes/abstract-entity-list';
import { SnackBarService } from '../../common/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FullServiceDataSource } from './gym-api';
import { GymService } from './gym-service';
import { ymdToDmy } from '../../common/util';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';
import { deepCopy } from '../../smart-lib/common/util';
import { LanguageService } from '@ss/common/api-common';
import { ListToolbarComponent } from '../../common/list-toolbar/list-toolbar.component';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../../smart-lib/components/loading-spinner/loading-spinner.component';
import { FatalErrorComponent } from '../../smart-lib/components/fatal-error/fatal-error.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../common/pagination/pagination.component';
import { TranslatePipe } from '../../../../../../libs/common/ui-lang/src/lib/translate.pipe';

const payModeCash = 66;

function calculateStampFromAmount(amount: number, payMethod: number) {
    if (payModeCash === payMethod) {
        return Math.min(2500.0, Math.ceil(0.01 * amount));
    }
    return 0.0;
}

function calculateTotal(inv: FullService) {
    return inv.details.map(item =>
        item.price * item.qty
    ).reduce((a, b) => a + b, 0);
}

function calculateVAT(inv: FullService) {
    return inv.details.map(item => {
        return (item.vat * item.price * item.qty) / 100;
    }
    ).reduce((a, b) => a + b, 0);
}

function calculateStamp(inv: FullService) {
    if (payModeCash === inv.service.payMethod) { // redundancy to avoid calling this.calculateVAT(inv) + this.calculateTotal(inv)
        return calculateStampFromAmount(calculateVAT(inv) + calculateTotal(inv), inv.service.payMethod);
    }
    return 0.0;
}

function calculateGeneralTotal(inv: FullService) {
    return calculateStamp(inv) + calculateVAT(inv) + calculateTotal(inv);
}

@Component({
    selector: 'app-gym-list',
    templateUrl: './gym-list.component.html',
    styleUrls: ['./gym-list.component.scss'],
    standalone: true,
    imports: [ListToolbarComponent, MatIconButton, MatTooltip, NgIf, LoadingSpinnerComponent, FatalErrorComponent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, TranslatePipe]
})
// tslint:disable-next-line:max-line-length
export class GymListComponent extends AbstractEntityList<DisplayableService, BackendDataSource<DisplayableService>> implements OnInit, OnDestroy {

    public displayedColumns = ['invoiceNumber', 'date', 'client', 'total'];

    constructor(public httpSrv: HttpService,
        public userSrv: UserService,
        public langSrv: LanguageService,
        public override snackBarSrv: SnackBarService,
        public gymSrv: GymService,
        public router: Router,
        public activatedRoute: ActivatedRoute) {
        // entity: null
        super(new FullServiceDataSource(httpSrv), userSrv.getRights(null), snackBarSrv, gymSrv.listPagination);
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected afterLoading() {
        this.data.forEach(s => {
            s.time = ymdToDmy(s.service.time);
            if (s.time.length > 16) {
                s.time = s.time.substring(0, 16);
            }
            s.total = calculateGeneralTotal(s);
            this.gymSrv.getAgentName(s.service.agent)
                .subscribe(n => s.agentName = n);
        });
    }

    showAdd(): void {
        if (this.accessRight.create) {
            this.edit(null);
        }
    }

    showEdit(): void {
        if (this.selectedId && this.accessRight.edit) {
            this.edit(deepCopy(this.data.filter(v => v.service.id === this.selectedId)[0]));
        }
    }

    edit(v: FullService): void {
        this.router.navigate(
            ['../' + (v || { service: { id: 0 } }).service.id],
            { relativeTo: this.activatedRoute, queryParams: { referer: '/hotel/gym/list' } }
        ).then();
    }

    goToLiveView(): void {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
}

