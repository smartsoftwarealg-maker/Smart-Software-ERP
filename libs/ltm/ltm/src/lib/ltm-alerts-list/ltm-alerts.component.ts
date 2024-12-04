import { Component, DestroyRef, inject } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { LTMAbnormalTest } from '@ltm/ltm-api';
import { LtmAbnormalTestService } from '@ltm/ltm-api';
import { filter, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-alerts-list',
    templateUrl: './ltm-alerts.component.html',
    styleUrls: ['./ltm-alerts.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        DatePickerComponent,
        TranslateDirective
    ],
})
export class LtmAlertsComponent extends BaseEntityListComponent<LTMAbnormalTest> {
    #destroyRef = inject(DestroyRef);

    displayedColumns = ['matter', 'test',  'time', 'value', 'min', 'max', 'pickupPoint'];
    formBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        from: [new Date(new Date().getTime() - 24 * 3600 * 1000 * 30 )],
        to:   [new Date()],
        open: [false]
    })

    constructor(
        public override entitySrv: LtmAbnormalTestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_ALERTS');
        this.pagination.pageSize = 15;
    }

    override refresh(callback?: () => void) {
        const formValue = this.form.value;
        this.data = [];
        this.shellSrv.setLoading(this.canShowProcessingStatus());
        this.select(0);
        this.entitySrv
            .refresh(formValue.from, formValue.to, formValue.open, this.pagination.page - 1, this.pagination.pageSize, this.shellSrv.getSearchText())
            .subscribe({
                    next: data => {
                        this.shellSrv.setLoading(false); // stop the animation
                        this.data = data.body;
                        this.pagination.elementCount = data.itemCount;
                    },
                    error: err => {
                        this.data = []; // clear everything;
                        this.shellSrv.setLoading(false); // stop the animation
                        throw err;
                    }
                }
            );
    }

    // showAlertBadge() {
    //         const TODAY = new Date(new Date().getTime() - 24 * 3600 * 1000);
    //         this.subscription = this.abnormalTestSrv
    //             .refresh(TODAY, new Date(), 0, 49)
    //             .subscribe(res => {
    //                 if (res.itemCount > 0) {
    //                     this.badgeBtn.badgeCount = res.itemCount;
    //                     this.shellSrv.addButton(this.badgeBtn);
    //                 }
    //             });
    // }

    // private showAlerts() {
    //     this.shellSrv.removeButton('LTM_ALERTS');
    //     this.subscription?.unsubscribe();
    //     this.router.navigate(['/app/ltm/ltm-alerts']).then();
    // }

    override ngOnInit() {
        this.addButton.visible = false;
        // this.editButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();

        this.form.controls.from.setValue(this.entitySrv.from);
        this.form.controls.to.setValue(this.entitySrv.to);

        this.form
            .valueChanges
            .pipe(
                takeUntilDestroyed(this.#destroyRef),
                filter(() => this.form.controls.from.value !== null && this.form.controls.to.value !== null),
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => this.refresh());


    }

    override showDetail(id: number) {
        this.router.navigate([id], {relativeTo: this.route}).then()
    }

    override ngOnDestroy() {
        const formValue = this.form.value;
        this.entitySrv.from = formValue.from;
        this.entitySrv.to = formValue.to;
    }
}
