import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppArchiveService} from '../app-archive.service';
import {RouterOutlet} from '@angular/router';
import {AppArchiveListComponent} from '../app-archive-list/app-archive-list.component';

@Component({
    selector: 'ss-app-archive-main',
    templateUrl: './app-archive-main.component.html',
    styleUrls: ['./app-archive-main.component.scss']
})
export class AppArchiveMainComponent {
    @ViewChild(RouterOutlet) outlet: RouterOutlet;
    private _id = 0;

    constructor(private entitySrv: AppArchiveService) { }

    @Input()
    set id(objectId: number) {
        this._id = objectId;
        this.entitySrv.objId = objectId;
        const comp: any = this.outlet?.component;
        if (comp && comp['refresh'] != null) {
            comp['refresh']();
        }
        // if (typeof comp === AppArchiveListComponent) {
        //
        // }
    }

    @Input()
    set appId(id: number) {
        this.entitySrv.appId = id;
    }

}
