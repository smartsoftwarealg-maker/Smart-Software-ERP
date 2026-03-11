import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ArchiveService} from '../archive.service';
import {of} from 'rxjs';
import {ShellService} from '@ss/common/ui-shell';
import { LanguageService, MaterialModule } from '@ss/common/api-common';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'ss-archive-viewer',
    templateUrl: './archive-viewer.component.html',
    styleUrls: ['./archive-viewer.component.css'],
    standalone: true,
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class ArchiveViewerComponent implements OnInit {
    private router  = inject(Router);
    private route  = inject(ActivatedRoute);
    private service  = inject(ArchiveService);
    private shellSrv  = inject(ShellService);
    private langSrv  = inject(LanguageService);
    imgSrc: string = null;
    title = 'WAR_ARCHIVE';

    constructor() {
        this.route
            .params
            .pipe(switchMap(params =>
                params['id'] ? this.service.getImage(params['id']) : of(null)
            ))
            .subscribe(data => {
                this.imgSrc = null;
                if (data) {
                    this.imgSrc = 'data:image/jpeg;base64,'  + btoa(
                        new Uint8Array(data)
                            .reduce((res, byte) => res + String.fromCharCode(byte), '')
                    );
                }
            });
    }


    close() {
        this.router.navigate(['../arch'], { relativeTo: this.route }).then();
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle(this.langSrv.translate(this.title));
    }
}
