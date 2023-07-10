import { Directive, inject, OnInit } from "@angular/core";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { BaseEntityService } from "@ss/common/api-base-entity";
import { PaginationModel } from "@ss/common/api-common";
import { map, Observable, of } from "rxjs";

@Directive()
export class BaseChildEntityListComponent<T extends { id: number }> implements OnInit {
    private shellSrv  = inject(ShellService);
    private route  = inject(ActivatedRoute);
    private router  = inject(Router);
    private snackBarSrv  = inject(SnackBarService);
    private confirmationSrv  = inject(ConfirmationDialogService);

    constructor(protected detailSrv: BaseEntityService<T>) {}
    paginator = PaginationModel.newInstance();
    selectedId = 0;
    data$: Observable<T[]> = of([]);
    displayedColumns = ['id'];


    ngOnInit(): void {
        this.refresh();
    }

    showDetail(id: number) {
        this.router.navigate(
            [id || 0],
            { relativeTo: this.route}).then();
    }

    edit() {
        if (this.selectedId) {
            this.showDetail(this.selectedId);
        }
    }

    public deleteSelected(): void {
        if (this.selectedId > 0) {
            this.confirmationSrv.confirmDelete()
                .subscribe(b => {
                    if (b) {
                        this.shellSrv.setLoading(true);
                        this.detailSrv
                            .remove(this.selectedId)
                            .subscribe({
                                next: () => {
                                    this.data$ = this.data$.pipe(map(res => res.filter(e => e.id !== this.selectedId)));
                                    this.shellSrv.setLoading(false);
                                    this.snackBarSrv.showSuccessMessage();
                                    this.selectedId = 0;
                                },
                                error: err => {
                                    this.snackBarSrv.showFailureMessage();
                                    this.shellSrv.setLoading(false);
                                    throw err;
                                }
                            });
                    }
                });
        }
    }

    private refresh() {
        this.data$ = this.detailSrv.getPage(this.paginator);
        // .subscribe(res => this.data = res);
    }

    select(id: number) {
        this.selectedId = id;
    }
}
