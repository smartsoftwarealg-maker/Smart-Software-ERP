import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Lookup} from '@ss/common/api-lookup';
import {AgentArchiveService, Archive} from '@ss/logistics/api-agent';
import {SnackBarService} from '@ss/common/ui-shell';
import {PaginationModel} from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'ss-agent-archive-list',
    templateUrl: './agent-archive-list.component.html',
    styleUrls: ['./agent-archive-list.component.scss']
})
export class AgentArchiveListComponent implements OnInit {
    @Input() editable = true;
    private _id = 0;
    public selected = 0;
    data: Archive[] = [];
    paginator = PaginationModel.newInstance();

    constructor(private entitySrv: AgentArchiveService,
                private snackBarSrv: SnackBarService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService) {}

    ngOnInit(): void {
        const params = new HttpParams()
            .set("id", this._id)
            .set('collection', 'agents');

        this.entitySrv
            .getList(0, 50, null, null, params)
            .subscribe(res => {
                console.log(res.body);
                this.data = res.body || [];
                this.paginator.elementCount = res.itemCount;
            });
    }

    public showDetail(id: string) {
        this.router.navigate(['archive', {id: id}], {relativeTo: this.route}).then();
    }

    public edit() {
        this.showDetail(this.selected + '');
    }

    @Input()
    set id(agentId: number) {
        this._id = agentId;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selected && this.selected > 0) {
                        const a = this.data.filter(x => x.id === this.selected)[0];
                        if (a && a.id) {
                            this.entitySrv.remove(a.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.refresh();
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
}
