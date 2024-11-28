import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ArchiveService} from '../archive.service';
import {of} from 'rxjs';
import {ShellService} from '@ss/common/ui-shell';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';

@Component({
    selector: 'ss-archive-viewer',
    templateUrl: './archive-viewer.component.html',
    styleUrls: ['./archive-viewer.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        UiStockInfoComponent]
})
export class ArchiveViewerComponent implements OnInit {
    imgSrc: string = null;
    title = 'WAR_ARCHIVE';

    constructor(private router: Router,
              private route: ActivatedRoute,
              private service: ArchiveService,
              private shellSrv: ShellService,
              private langSrv: LanguageService) {
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
        this.router.navigate(['../arch'], { relativeTo: this.route });
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle(this.langSrv.translate(this.title));
    }
}
