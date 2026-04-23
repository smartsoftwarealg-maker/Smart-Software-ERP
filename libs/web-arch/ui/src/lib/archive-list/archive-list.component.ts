import {Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { HttpService, LanguageService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ArchiveDocument} from '../archive-document';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {LookupsService} from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ArchiveService} from '../archive.service';
import {Observable, of} from 'rxjs';
import { CommonModule } from '@angular/common';


import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ss-archive-list',
    templateUrl: './archive-list.component.html',
    styleUrls: ['./archive-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
        PaginationComponent
    ]
})
export class ArchiveListComponent extends BaseEntityListComponent<ArchiveDocument> implements OnInit {
    rights = {create: true, del: true, edit: true};


    constructor(
        public service: ArchiveService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(service, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'WAR_ARCHIVE');
    }

    onAdd() {
        this.router.navigate(['detail'], {relativeTo: this.route}).then();
    }

    // onEdit(id: string) {
    //     this.router.navigate(['detail', {id: id}], {relativeTo: this.route}).then();
    // }

    public override edit() {
        if (this.selectedRow._id) {
            this.router.navigate(['detail', {id: this.selectedRow._id}], {relativeTo: this.route}).then();
        }
    }


    onDelete(id: string) {
        this.confirmationSrv
            .confirmDelete()
            .subscribe(res => {
                if (res) {
                    this
                        .service
                        .deleteById(id)
                        .subscribe(res => {
                            this.data = this.data.filter(e => e._id !== id);
                            this.snackBarSrv.showSuccessMessage();
                        });
                }
            });
    }


    protected override postInit(): Observable<any> {
        return super.postInit()
            .pipe(tap(() => {
                const downloadButton: ToolbarButton = {
                    icon: 'fas fa-download',
                    label: 'WAR_DOWNLOAD',
                    disabled: false,
                    visible: true,
                    keepOnToolbar: KeepOnToolbar.DYNAMIC,
                    click: () => {
                        this.download(this.selectedRow?._id);
                    },
                };
                this.shellSrv.addButton(downloadButton);
            }));
    }

    download(id: string) {
        this.data
            .filter(e => e.filename && e._id === id)
            .forEach(e => this.viewDocument(e));
    }

    override processLoadedData(data: ArchiveDocument[]): Observable<ArchiveDocument[]> {
        data.forEach(d => {
            if (d.thumbnail && d.thumbnail.length > 100) {
                d.imgSrc = 'data:image/jpeg;base64,' + btoa(
                    new Uint8Array(<any>d.thumbnail)
                        .reduce((acc, byte) => acc + String.fromCharCode(byte), '')
                );
                d.thumbnail = null;
            } else {
                d.imgSrc = this.service.toBase64FromDoc(d);
            }
        });
        return of(data);
    }

    public override deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selected && this.selected > 0) {
                        const a = this.data.filter(x => x.id === this.selected)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.service.deleteById(a._id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.refresh();
                                    },
                                    error: err => {
                                        this.snackBarSrv.showFailureMessage();
                                        this.shellSrv.setLoading(false);
                                        throw err;
                                    }
                                });
                        }
                    }
                }
            })
    }

    private getBlob(blob: number[], doc: ArchiveDocument): Blob {
       const docType = doc?.metadata['docType'];
        if (docType.indexOf('pdf') >= 0) {
            return this.service.asPDFBlob(blob);
        }
        if (docType.indexOf('odt') >= 0) {
            return this.service.asODTBlob(blob);
        }
        if (docType.indexOf('ods') >= 0) {
            return this.service.asODSBlob(blob);
        }
        if (docType.indexOf('xlsx') >= 0) {
            return this.service.asXLSXBlob(blob);
        }
        if (docType.indexOf('xls') >= 0) {
            return this.service.asXLSBlob(blob);
        }
        if (docType.indexOf('docx') >= 0) {
            return this.service.asDOCXBlob(blob);
        }
        if (docType.indexOf('doc') >= 0) {
            return this.service.asDOCBlob(blob);
        }
        if (docType.indexOf('mp4') >= 0) {
            return this.service.asMP4Blob(blob);
        }
        if (docType.indexOf('mp3') >= 0) {
            return this.service.asMP3Blob(blob);
        }
        if (docType.indexOf('mov') >= 0) {
            return this.service.asMOVBlob(blob);
        }
        return this.service.asOctetBlob(blob);
    }

    private viewDocument(doc: ArchiveDocument) {
        const docType = doc.metadata['docType'];
        if (docType.indexOf('jp') >= 0 || docType.indexOf('png') >= 0) {
            this.router.navigate(['viewer', {id: doc._id}], {relativeTo: this.route}).then();
        } else {
            this.service
                .getImage(doc._id)
                .subscribe(blob => {
                    if (blob) {
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(this.getBlob(blob, doc));
                        link.download = this.getFileName(doc);
                        link.click();
                        setTimeout(() => window.URL.revokeObjectURL(link.href), 5000);
                    }
                });
        }
    }

    private getFileName(doc: ArchiveDocument): string {
        const docType = doc.metadata['docType'];

        if (docType.indexOf('pdf') >= 0) {
            return 'pdf.pdf';
        }
        if (docType.indexOf('odt') >= 0) {
            return 'odt.odt';
        }
        if (docType.indexOf('ods') >= 0) {
            return 'ods.ods';
        }
        if (docType.indexOf('xlsx') >= 0) {
            return 'xlsx.xlsx';
        }
        if (docType.indexOf('xls') >= 0) {
            return 'xls.xls';
        }
        if (docType.indexOf('docx') >= 0) {
            return 'docx.docx';
        }
        if (docType.indexOf('doc') >= 0) {
            return 'doc.doc';
        }
        if (docType.indexOf('mp4') >= 0) {
            return 'mp4.mp4';
        }
        if (docType.indexOf('mp3') >= 0) {
            return 'mp3.mp3';
        }
        if (docType.indexOf('mov') >= 0) {
            return 'mov.mov';
        }
        return docType + '.' + docType;
    }
}
