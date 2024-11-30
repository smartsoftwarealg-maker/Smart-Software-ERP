import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ArchiveService } from '../archive.service';
import { switchMap, tap } from 'rxjs/operators';
import { ArchiveDocument, Lookup, UPDocInfo } from '../archive-document';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '@ss/common/api-lookup';
import { LanguageService, LoginService, MaterialModule } from '@ss/common/api-common';
import { AgentLookupModel, AgentService } from '@ss/logistics/api-agent';
import { ShellService } from '@ss/common/ui-shell';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Tag } from '../tags/tag';
import { MatSelectionList } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-archive-detail',
    templateUrl: './archive-detail.component.html',
    styleUrls: ['./archive-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ]
})
export class ArchiveDetailComponent implements OnInit {
    private service = inject( ArchiveService);
    private router = inject( Router);
    private route = inject( ActivatedRoute);
    private serviceSrv = inject( ServiceService);
    private agentSrv = inject( AgentService);
    private loginSrv = inject( LoginService);
    private trans = inject( LanguageService);
    private shellSrv = inject( ShellService);
    private fb = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);

    @ViewChild('tags', { static: false }) selectionList: MatSelectionList;
    form: UntypedFormGroup = null;
    private id: string = null;
    public selectedService: number = null;
    private DUMMY = './assets/img/Dummy.png';
    imgSrc: ArrayBuffer | string = this.DUMMY;
    imgBuff: Uint8Array = null;
    public selectedFile: File = null;
    loadingRate = 100;
    agentAutoCompleteModel = new AgentLookupModel(this.agentSrv);
    serviceAutoCompleteModel = new DefaultAutoCompleteModel(this.serviceSrv);
    tagList: Tag[] = [];
    curTags: Set<string> = new Set<string>();


    constructor() {
        this.shellSrv.setGoBackPath('..', this.route);
    }

    ngOnInit() {
        this
            .route
            .paramMap
            .pipe(
                tap(res => this.id = res.get('id')),
                switchMap(_ => this.service.getTagList()),
                tap(res => this.tagList = this.tagList = res),
                switchMap(res => this.service.getArchiveById(this.id)))
            .subscribe(next => {
                this.curTags.clear();
                const res = next && next.length > 0 ? next[0] : { id: 0, metadata: {} } as ArchiveDocument;
                const docTags: string[] = res.metadata['tags']?.split(',') || [];
                docTags.forEach(e => this.curTags.add(e));

                this.imgSrc = res['imgSrc'] || this.service.toBase64FromDoc(res);
                const date = res.uploadDate ? new Date(Date.parse(res.uploadDate)) : new Date();
                // const data = res.thumbnail;
                this.form = this.fb.group({
                    id: [res.id],
                    _id: [res._id],
                    user: [this.loginSrv.appCtx.id],
                    service: [res.metadata['service']],
                    center: [this.loginSrv.appCtx.center],
                    docType: [res.metadata['docType']],
                    docDate: [date, Validators.required],
                    thumbnail: [res.thumbnail],
                    lastEditTime: [date],
                    agentId: [res.metadata['agentId']],
                    receiver: [res.metadata['receiver']],
                    length: [res.length],
                    file: [res.filename],
                    tags: [docTags],
                    description: [res.metadata['description'], Validators.required]
                });
            });
    }

    private formatDate(date: Date | string): string {
        return typeof date === 'string' ?
            date :
            this.formatNumber(date.getFullYear()) +
            '-' +
            this.formatNumber(date.getMonth() + 1) +
            '-' +
            this.formatNumber(date.getDate());
    }

    private formatNumber(num: number) {
        return (num + '').padStart(2, '0');
    }

    openSnackBar(message: string) {
        this.snackBar.open(this.trans.translate(message), null, {
            duration: 2000
        });
    }

    private put() {
        const data: UPDocInfo = {
            _id: this.id,
            description: this.form.value.description,
            user: this.loginSrv.appCtx.id,
            agentId: this.form.value.agentId,
            serviceId: this.form.value.service,
            tags: this.selectionList.selectedOptions.selected.map(e => e.value).join(',')
        };
        this.service
            .updateMetadata(data)
            .subscribe(_ => {
                this.openSnackBar('WAR_RECORD_SAVED');
                this.onCancel();
            });
    }

    private post() {
        const formData = new FormData();
        if (this.id && this.id.length > 3) {
            formData.append('id', this.id);
        }
        formData.append('file', this.selectedFile);
        formData.append('description', this.form.value.description);
        formData.append('filename', 'file');
        formData.append('agentId', this.form.value.agentId);
        formData.append('service', this.form.value.service);
        this.loadingRate = 0;
        const date = this.form.value.docDate || new Date();
        this.form.value.docDate = this.formatDate(date);
        this.service
            .upload(formData)
            .subscribe(res => {
                this.openSnackBar('WAR_RECORD_SAVED');
                this.onCancel();
                // this.onCancel(this.id);
                // if (event instanceof HttpResponse || !event) {
                //     if (this.toolBar) {
                //         this.toolBar.showSuccessfulMessage();
                //     }
                //     if (event) {
                //         this.imgSrc.subscribe(str => this.onCancel(str));
                //     } else {
                //         this.onCancel();
                //     }
                //     this.loadingRate = 100;
                // } else {
                //     if (event && event.type === HttpEventType.UploadProgress) {
                //         // This is an upload progress event. Compute and show the % done:
                //         // this.loadingRate = Math.round(100 * event.loaded / event.total);
                //         // console.log(`File is ${this.loadingRate}% uploaded.`);
                //     }
                // }
            });
    }

    onSave() {
        if (this.selectedFile) {
            this.post();
        } else {
            if (this.id) {
                this.put();
            }
        }
    }

    onCancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (ev: any) => {
            this.imgBuff = new Uint8Array(<ArrayBuffer>(ev.target.result));

            const name = this.selectedFile.name;
            const idx = name.lastIndexOf('.');
            const docType = idx > 0 ? name.substring(idx + 1) : null;
            if (docType) {
                if (docType.indexOf('pdf') >= 0) {
                    this.imgSrc = ('./assets/img/Dummy.png');
                } else {
                    if (docType.indexOf('doc') >= 0) {
                        this.imgSrc = ('./assets/img/word.png');
                    } else {
                        if (docType.indexOf('xls') >= 0) {
                            this.imgSrc = ('./assets/img/excel.png');
                        } else {
                            if (docType.indexOf('mp4') >= 0) {
                                this.imgSrc = ('./assets/img/mp4.png');
                            } else {
                                if (docType.indexOf('mov') >= 0) {
                                    this.imgSrc = ('./assets/img/mov.png');
                                } else {
                                    if (docType.indexOf('mp3') >= 0) {
                                        this.imgSrc = ('./assets/img/mp3.png');
                                    } else {
                                        this.imgSrc = reader.result;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        reader.readAsDataURL(this.selectedFile);
    }

    onSelect(event: any) {
    }
}

