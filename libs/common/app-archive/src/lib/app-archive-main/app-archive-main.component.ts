import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import {AppArchiveService} from '../app-archive.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'ss-app-archive-main',
    templateUrl: './app-archive-main.component.html',
    styleUrls: ['./app-archive-main.component.scss']
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
    }
    get id() {
        return this.archiveSrv.getParentId();
    }

    @Input()
    set appId(id: number) {
        this.archiveSrv.appId = id || 0;
    }
}
