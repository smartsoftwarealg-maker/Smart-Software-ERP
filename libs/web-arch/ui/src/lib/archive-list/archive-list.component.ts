import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {HttpService, LanguageService, PaginatorPersistenceService} from '@ss/common/api-common';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ArchiveDocument} from '../archive-document';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ArchiveService} from '../archive.service';
import {Observable, of} from 'rxjs';
import {saveAs} from 'file-saver';

@Component({
  selector: 'ss-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent extends BaseEntityListComponent<ArchiveDocument> {
    public searchFld = new FormControl();
    rights = {create: true, del: true, edit: true};

    constructor(
        public service: ArchiveService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(service, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'WAR_ARCHIVE');
    }

    onAdd() {
        this.router.navigate(['detail'], {relativeTo: this.route}).then();
    }

    onEdit(id: string) {
        this.router.navigate(['detail', {id: id}], {relativeTo: this.route}).then();
    }
    public edit() {
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

    download(id: string) {
        this.data
            .filter(e => e.filename && e._id === id)
            .forEach(e => this.viewDocument(e));
    }

    private getBlob(blob: number[], doc: ArchiveDocument): Blob {
        const docType = doc.metadata.get('docType')
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
        if (doc.filename.indexOf('jpg') >= 0 ||
            doc.filename.indexOf('jpeg') >= 0 ||
            doc.filename.indexOf('png') >= 0) {
            this.router.navigate(['../viewer', {id: doc.id}], {relativeTo: this.route});
        } else {
            // const blob = this.getBlob(doc);
            // window.open option
            // const url = window.URL.createObjectURL(blob);
            // window.open(url);
            // File save option
            // if (blob) {
            //     saveAs(blob, this.getFileName(doc));
            // }
            this.service.getImage(doc._id).subscribe(blob => {
                if (blob) {
                    saveAs(this.getBlob(blob, doc), this.getFileName(doc));
                }
            });
        }
    }

    private getFileName(doc: ArchiveDocument): string {
        const docType = doc.metadata.get('docType')
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

    processLoadedData(data: ArchiveDocument[]): Observable<ArchiveDocument[]> {
        data.forEach(d => {
            if (d.thumbnail) {
                d.imgSrc = 'data:image/jpeg;base64,' + btoa(
                    new Uint8Array(<any>d.thumbnail)
                        .reduce((acc, byte) => acc + String.fromCharCode(byte), '')
                );
                d.thumbnail = null;
            } else {
                d.imgSrc = 'assets/img/Dummy.png';
            }
        });
        return of(data);
    }

    public deleteSelected(): void {
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
}
