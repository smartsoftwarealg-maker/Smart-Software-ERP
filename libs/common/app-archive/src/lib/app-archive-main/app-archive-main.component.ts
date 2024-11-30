import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import {AppArchiveService} from '../app-archive.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-app-archive-main',
    templateUrl: './app-archive-main.component.html',
    styleUrls: ['./app-archive-main.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ],

})
export class AppArchiveMainComponent {
    @ViewChild(RouterOutlet) outlet: RouterOutlet;
    public archiveSrv = inject(AppArchiveService);

    protected refresh() {
        if (this.outlet && this.outlet.isActivated && this.outlet.component) {
            const comp: any = this.outlet?.component || null;
            if (comp && comp['refresh'] != null) {
                comp['refresh']();
            }
        }
    }

    @Input()
    set editable(value: boolean) {
        this.archiveSrv.editable = value;
    }

    @Input()
    set id(objectId: number) {
        this.archiveSrv.setParentId(objectId);
        this.refresh();
    }
    get id() {
        return this.archiveSrv.getParentId();
    }

    @Input()
    set appId(id: number) {
        this.archiveSrv.appId = id || 0;
    }
}
