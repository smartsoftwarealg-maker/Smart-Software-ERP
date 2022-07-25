import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {AppArchive} from '@ss/logistics/api-agent';
import {SnackBarService} from '@ss/common/ui-shell';
import {ImageUploaderUtil, PaginationModel} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs/operators';
import {AppArchiveService} from '../app-archive.service';

@Component({
    selector: 'ss-agent-archive-list',
    templateUrl: './app-archive-list.component.html',
    styleUrls: ['./app-archive-list.component.scss']
})
export class AppArchiveListComponent implements OnInit {
    private _id = 0;
    @Input() editable = true;
    imgSrc: string | null = null;
    selectedId = 0;
    data: AppArchive[] = [];
    paginator = PaginationModel.newInstance();

    constructor(private entitySrv: AppArchiveService,
                private snackBarSrv: SnackBarService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService) {}

    ngOnInit(): void {
        this.route
            .parent
            .params
            .pipe(
                tap(params => this.entitySrv.setParentId(+params['id'] || 0)),
                  switchMap(_ => this.entitySrv.getList(0, 50)))
            .subscribe(res => {
                this.data = res.body || [];
                this.paginator.elementCount = res.itemCount;
            });
    }

    public showDetail(id: string) {
        this.router.navigate(['detail', id], {relativeTo: this.route}).then();
    }

    public edit() {
        this.showDetail(this.selectedId + '');
    }

    @Input()
    set id(agentId: number) {
        this._id = agentId;
        this.entitySrv.setParentId(agentId);
    }


    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedId && this.selectedId > 0) {
                        const a = this.data.filter(x => x.id === this.selectedId)[0];
                        if (a && a.id) {
                            this.entitySrv.remove(a.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.data = this.data.filter(e => e.id !== a.id);
                                    },
                                    error: err => {
                                        this.snackBarSrv.showFailureMessage();
                                        throw err;
                                    }
                                });
                        }
                    }
                }
            });
    }

    refresh() {}

    select(a: AppArchive) {
        this.selectedId = a?.id;
        this.entitySrv
            .image(a?.id || 0)
            .subscribe(res => {
                ImageUploaderUtil.toBase64(res, (s: string) => this.imgSrc = s);
//                console.log(res);
            });
    }
}
