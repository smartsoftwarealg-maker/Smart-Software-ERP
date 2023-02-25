import {Component, OnInit} from '@angular/core';
import {LTMLineMatter} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {of, switchMap} from 'rxjs';

@Component({
    selector: 'ss-line-matter-list',
    templateUrl: './line-matter-list.component.html',
    styleUrls: ['./line-matter-list.component.scss'],
})
export class LineMatterListComponent implements OnInit {
    selected: LTMLineMatter = null;
    data: LTMLineMatter[] = [];
    pagination = PaginationModel.newInstance({ pageSize: 10, page: 1, elementCount: 0});

    displayedColumns = [
        'description',
    ];

    constructor(
        private entitySrv: LtmLineMatterService,
        private shellSrv: ShellService,
        private snackBarSrv: SnackBarService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationSrv: ConfirmationDialogService) {
    }

    showDetail(id: number) {
        this.router.navigate(['detail', id], {relativeTo: this.route}).then();
    }

    edit() {
        if (this.selected?.id > 0) {
            this.showDetail(this.selected?.id || 0);
        }
    }

    deleteSelected() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.entitySrv.remove(this.selected?.id) : of({count: -1})),
                switchMap(res => res.count > 0 ? this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize) : of(null)))
            .subscribe(res => {
                if (res && res.itemCount != null) {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.snackBarSrv.showSuccessMessage();
                    this.selected = null;
                }
            });
    }

    select(matter: LTMLineMatter) {
        this.selected = this.entitySrv.getParentId() > 0? matter : null;
    }

    ngOnInit(): void {
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            })
    }
}
