import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AttribTempl} from '../attributes';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AttributesService} from '../attributes.service';
import {UntypedFormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'ss-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.scss']
})
export class AttributesListComponent extends BaseEntityListComponent<AttribTempl> implements OnInit, OnDestroy {
    moduleId = new UntypedFormControl(1);
    displayedColumns = [
        'description',
        'attType'
    ];
    subscription: Subscription = null;

    constructor(
        public override entitySrv: AttributesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
            'ADMINISTRATION_ATTRIBUTES');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.subscription =
            this.moduleId
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(id => {
                this.entitySrv.setParentId(id);
                this.refresh();
            });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.subscription?.unsubscribe();
    }
}
