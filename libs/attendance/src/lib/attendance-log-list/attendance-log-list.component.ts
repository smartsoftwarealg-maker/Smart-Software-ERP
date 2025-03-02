import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ATTSignature} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {SignatureService} from '../signature.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ss-attendance-log-list',
    templateUrl: './attendance-log-list.component.html',
    styleUrls: ['./attendance-log-list.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        DatePipe,
        DatePickerComponent
    ]
})
export class AttendanceLogListComponent extends BaseEntityListComponent<ATTSignature> implements OnInit {
    #destroyRef = inject(DestroyRef);
    #lastMonth = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);

    dateCtrl = new FormControl<Date>(this.#lastMonth);

    displayedColumns = [
        'personId',
        'firstName',
        'lastName',
        'dateTime',
        'typeDescription',
        'updaterName',
    ];

    constructor(
        public override entitySrv: SignatureService,
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
            'ATT_MANUAL_SIGNATURES');
        this.pagination.pageSize = 15;
        this.dateCtrl.setValue(this.entitySrv.date, {emitEvent: false});
    }

    override refresh(callback?: () => void) {
        this.entitySrv.date = this.dateCtrl.value;
        super.refresh(callback);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.dateCtrl
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.#destroyRef)
            )
            .subscribe(res => this.entitySrv.date = res);
    }
}
