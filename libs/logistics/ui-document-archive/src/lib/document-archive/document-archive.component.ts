import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppArchiveListComponent, AppArchiveMainComponent} from '@ss/common/app-archive';

@Component({
    selector: 'ss-document-archive',
    templateUrl: './document-archive.component.html',
    styleUrls: ['./document-archive.component.scss'],
})
export class DocumentArchiveComponent implements OnInit {
    @ViewChild(AppArchiveMainComponent) archiveDoc: AppArchiveListComponent = null;
    documentId = 0;
    isEditable = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.queryParams.subscribe(param => {
            this.documentId = +param['documentId'];
            if (this.archiveDoc) {
                this.archiveDoc.id = +param['documentId'] || 0;
            }
        });
    }

    @Input()
    set editable(value: boolean) {
        this.isEditable = value;
    }
}
