import {
    Component,
    effect,
    inject,
    input,
    OnInit,
    signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ImageUploaderUtil, MaterialModule, PaginationModel } from '@ss/common/api-common';
import {AppArchiveService} from '../app-archive.service';
import {AppArchive, GENERIC_ARCHIVES} from '../app-archive-api';
import { tap } from 'rxjs';



import { ReactiveFormsModule } from '@angular/forms';

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ActivePersonnelService } from '@ss/payroll/ui-employee';

@Component({
    selector: 'ss-app-archive-list',
    templateUrl: './app-archive-list.component.html',
    styleUrls: ['./app-archive-list.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe
    ]
})
export class AppArchiveListComponent implements OnInit {
    private shellSrv = inject(ShellService);
    public activePersonnelSrv = inject(ActivePersonnelService);
    public showBackButton = signal(false);

    selectedArchive: AppArchive | null = null;
    selectedId = 0;
    imgSrc = signal<string | null>(null);
    filename= signal<string|null>(null);
    data =signal<AppArchive[]> ([]);
    paginator = PaginationModel.newInstance();
    displayedColumns = ['docDescription', 'filename'];
    isEditable = true;
    id = input<number>(0);
    onIdChange = effect(() => {
        this.entitySrv.setParentId(this.id() || this.entitySrv.id);
        this.entitySrv.getList(0, 50).subscribe((res) => {
            this.data.set(res.body || []);
            this.paginator.elementCount = res.itemCount;
        });
    });

    constructor(public entitySrv: AppArchiveService,
                private snackBarSrv: SnackBarService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(res => {
            const showBackButton = res['showBackButton']||'false';
            this.showBackButton.set(showBackButton.toLowerCase() === 'true');
        });

        this.route
            .queryParamMap
            .subscribe(param => {
                const appId = +param.get('appId') || 0;
                if (appId > 0) {
                    this.entitySrv.appId = appId;
                    const id = +param.get('documentId') || 0;
                    if (id > 0) {
                        this.entitySrv.setParentId(id);
                    }
                    const editable = param.get('editable');
                    this.entitySrv.editable = editable !== null && editable.toLowerCase() === 'true';
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
                    .subscribe(() => {
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

    public goBack() {
        this.router.navigate(['../../'], {relativeTo: this.route}).then();
    }


    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedId && this.selectedId > 0) {
                        const a = this.data().filter(x => x.id === this.selectedId)[0];
                        if (a && a.id) {
                            this.entitySrv.remove(a.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.data.set(this.data().filter(e => e.id !== a.id));
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
                    this.data.set(res.body || []);
                    this.paginator.elementCount = res.itemCount;
                });
        } else {
            this.data.set([]);
            this.paginator.elementCount = 0;
        }
    }

    select(a: AppArchive) {
        this.imgSrc = null;
        this.selectedArchive = a;
        if (a) {
            this.selectedId = a.id || 0;
            if (a.filename?.indexOf('.pdf') > 1) {
                this.filename.set(a.filename);
                this.imgSrc.set('./assets/img/pdf.png');
            } else if (a.filename?.indexOf('.doc') > 1) {
                this.filename.set(a.filename);
                this.imgSrc.set('./assets/img/word.png');
            } else {
                this.entitySrv
                    .thumbNail(this.selectedId)
                    .subscribe(res => ImageUploaderUtil.toBase64(res, (s: string) => {
                        this.imgSrc.set(s);
                        this.filename.set(a.filename);
                    }));
            }
        }
    }

    onClick(e: MouseEvent) {
        this.entitySrv
            .image(this.selectedId)
            .subscribe(res => {
                // Use globalThis to be safe in different environments and
                // handle legacy webkitURL as fallback.
                const urlCtor: any = (globalThis as any).URL ?? (globalThis as any).webkitURL;

                const openWithSrc = (src: string) => {
                    const w = window.open(src);
                    if (w) {
                        setTimeout(() => (w.document.title = `${this.selectedArchive?.filename || ''}${this.selectedId}`), 200);
                    }
                };

                if (!urlCtor || typeof urlCtor.createObjectURL !== 'function') {
                    // Fallback: convert blob to data URL using FileReader
                    const reader = new FileReader();
                    reader.onload = () => {
                        const dataUrl = reader.result as string;
                        openWithSrc(dataUrl);
                    };
                    reader.readAsDataURL(res);
                } else {
                    const pdfSrc = urlCtor.createObjectURL(res);
                    openWithSrc(pdfSrc);
                    // Revoke after a small delay so the opened window can load the blob URL
                    setTimeout(() => {
                        try { urlCtor.revokeObjectURL(pdfSrc); } catch (err) { /* ignore */ }
                    }, 2000);
                }
            });
    }

    protected readonly GENERIC_ARCHIVES = GENERIC_ARCHIVES;
}
