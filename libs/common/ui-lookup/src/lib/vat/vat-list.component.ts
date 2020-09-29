import { Component } from '@angular/core';
import { Vat, VatService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';


@Component({
    selector: 'ss-vat-list',
    styleUrls: ['./vat-list.component.scss'],
    templateUrl: './vat-list.component.html'
})
export class VatListComponent extends BaseEntityListComponent<Vat> {

    displayedColumns = ['value'];

    constructor(
        public vatSrv: VatService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router) {
        super(vatSrv, shellSrv, snackBarSrv, route, router, 'VATS');
    }

}
