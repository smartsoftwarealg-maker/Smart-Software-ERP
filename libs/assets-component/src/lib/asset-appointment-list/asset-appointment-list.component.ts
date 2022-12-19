import {Component, Input, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetAppointmentService} from '../asset-appointment.service';
import {of, switchMap} from 'rxjs';
import {ASSAppointment} from '../assets-api';

@Component({
    selector: 'ss-asset-appointment-list',
    templateUrl: './asset-appointment-list.component.html',
    styleUrls: ['./asset-appointment-list.component.scss']
})
export class AssetAppointmentListComponent implements OnInit {
    displayedColumns = [
        'date',
        'number',
        'location',
        'beneficiary',
        'key'
    ];

    @Input() editable = true;
    selected = 0;
    data: ASSAppointment[] = [];
    public readonly pagination = PaginationModel.newInstance();

    constructor(
        public entitySrv: AssetAppointmentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
    }


    ngOnInit() {
        this.pagination.onChange = () => this.refresh();
        this.refresh();
    }

    @Input()
    set assetId(id: number) {
        this.entitySrv.setParentId(id);
    }

    public select(id: number): void {
        this.selected = id;
    }

    public deleteSelected(): void {
        if (this.selected && this.selected > 0) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(answer => {
                    const a = this.data.filter(x => x.id === this.selected)[0];
                    return answer && a && a.id ? this.entitySrv.remove(a.id) : of({count: 0});
                }))
                .subscribe({
                    next: res => {
                        this.snackBarSrv.showSuccessMessage();
                        this.refresh();
                    },
                    error: err => {
                        this.snackBarSrv.showFailureMessage();
                        //this.shellSrv.setLoading(false);
                        throw err;
                    }
                });
        } else {
            this.snackBarSrv.showMessage('COMMON_NO_SELECTION');
        }
    }

    public edit() {
        this.showDetail(this.selected);
    }

    public showDetail(id: number) {
        this.router.navigate(['appointments', id], { relativeTo: this.route })
            .then();
    }

    ngOnDestroy() {
    }

    public refresh() {
        this.selected = 0;
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
    }

    openAppointment(id: number) {
        if (id > 0) {
            console.log('id: ', id);
            this.router.navigate(['../../asset-appointments', id], { relativeTo: this.route });
        }
    }
}
