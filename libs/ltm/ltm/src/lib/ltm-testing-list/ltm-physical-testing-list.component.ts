import { Component, DestroyRef, inject } from '@angular/core';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmBaseTestingListComponent } from '../ltm-testing-common/ltm-base-testing-list.component';
import { LtmPhysicalTestingService } from '@ltm/ltm-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: "ss-physical-ltm-testing-list",
    templateUrl: "../ltm-testing-common/ltm-testing-list.component.html",
    styleUrls: ["../ltm-testing-common/ltm-testing-list.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ]
})

export class LtmPhysicalTestingListComponent extends LtmBaseTestingListComponent {
    #_destroyRef = inject(DestroyRef);

    displayedColumns = ['sampleNo', 'matterDescription',  'timeStamp', 'equipmentDescription', 'pickupDescription', 'siloDescription'];
    constructor(
        public override entitySrv: LtmPhysicalTestingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            confirmationSrv,
            defReportSrv,
            router,
            pagPersistSrv,
            'LTM_PHYSICAL_TESTINGS');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.openOnly
            .valueChanges
            .pipe(takeUntilDestroyed(this.#_destroyRef),
                  debounceTime(300),
                 distinctUntilChanged()
            ).subscribe(res => {
                this.entitySrv.open = res;
                this.refresh();
        });
        this.openOnly.setValue(this.entitySrv.open||false, {onlySelf: true, emitEvent: false});
    }
}
