import { Component, inject, input, Input, OnInit, ViewChild } from '@angular/core';
import {AppArchiveService} from '../app-archive.service';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'ss-app-archive-main',
    templateUrl: './app-archive-main.component.html',
    styleUrls: ['./app-archive-main.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        ReactiveFormsModule
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

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    set editable(value: boolean) {
        this.archiveSrv.editable = value;
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    set id(objectId: number) {
        this.archiveSrv.setParentId(objectId);
        this.refresh();
    }
    get id() {
        return this.archiveSrv.getParentId();
    }

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input()
    set appId(id: number) {
        this.archiveSrv.appId = id || 0;
    }
}
