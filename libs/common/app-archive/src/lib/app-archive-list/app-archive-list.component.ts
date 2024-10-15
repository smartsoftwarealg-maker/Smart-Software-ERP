import { Component, inject, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ImageUploaderUtil, MaterialModule, PaginationModel } from '@ss/common/api-common';
import {AppArchiveService} from '../app-archive.service';
import {AppArchive} from '../app-archive-api';
import { of, switchMap, tap } from "rxjs";
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-app-archive-list',
    templateUrl: './app-archive-list.component.html',
    styleUrls: ['./app-archive-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ],
})
export class AppArchiveListComponent implements OnInit {
    private _id = 0;
    private shellSrv = inject(ShellService);

    imgSrc: string | null = null;
    selectedId = 0;
    filename: string = null;
    data: AppArchive[] = [];
    paginator = PaginationModel.newInstance();
    pdfSrc: string = null;
    displayedColumns = ['docDescription', 'filename'];
    isEditable = true;

    constructor(public entitySrv: AppArchiveService,
                private snackBarSrv: SnackBarService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService) {
    }

    ngOnInit(): void {
        this.route
            .queryParamMap
            .subscribe(param => {
                const appId = +param.get("appId") || 0;
                if (appId > 0) {
                    this.entitySrv.appId = appId;
                    const id = +param.get("documentId") || 0;
                    if (id > 0) {
                        this.entitySrv.setParentId(id);
                    }
                    const editable = param.get("editable");
                    this.entitySrv.editable = editable && editable.toLowerCase() === "true";
                }

            this.route
                .parent
                .parent
                .paramMap
                .pipe(
                    tap(params => {
                        const id = +params.get('id');
                        if (id > 0) {
                            this.entitySrv.setParentId(id);
                        }
                    }))
                .subscribe(res => {
                });
            this.refresh();
        });
        const rights = this.shellSrv.getCurrentNodeRights();
        this.isEditable = rights.edit;
    }

    public showDetail(id: string) {
        this.router.navigate([id], {relativeTo: this.route}).then();
    }

    public edit() {
        this.showDetail(this.selectedId + '');
    }

    @Input()
    set id(id: number) {
        this._id = id || 0;
        this.entitySrv.setParentId(this._id);
        this.entitySrv
            .getList(0, 50)
            .subscribe(res => {
                this.data = res.body || [];
                this.paginator.elementCount = res.itemCount;
            });
    }

    get id() {
        return this._id;
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
                                        this.imgSrc = null;
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

    refresh() {
        this.imgSrc = null;
        if (this.entitySrv.getParentId() > 0) {
            this.entitySrv.getList(0, 50)
                .subscribe(res => {
                    this.data = res.body || [];
                    this.paginator.elementCount = res.itemCount;
                });
        } else {
            this.data = [];
            this.paginator.elementCount = 0;
        }
    }

    select(a: AppArchive) {
        if (a) {
            this.selectedId = a.id || 0;
            if (a.filename?.indexOf('.pdf') > 1) {
                this.filename = a.filename;
                this.imgSrc = './assets/img/pdf.png';
            } else if (a.filename?.indexOf('.doc') > 1) {
                this.filename = a.filename;
                this.imgSrc = ('./assets/img/word.png');
            } else {
                this.filename = null;
                this.entitySrv
                    .image(this.selectedId)
                    .subscribe(res => {
                        ImageUploaderUtil.toBase64(res, (s: string) => this.imgSrc = s);
                    });
            }
        }
    }

    onClick(e: MouseEvent) {
        this.entitySrv
            .image(this.selectedId)
            .subscribe(res => {
                const pdfSrc = window.URL.createObjectURL(res);
                window.open(pdfSrc);
                window.URL.revokeObjectURL(pdfSrc);
            });
    }
}
