import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppArchiveService} from '../app-archive.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {AppArchiveListComponent} from '../app-archive-list/app-archive-list.component';

@Component({
    selector: 'ss-app-archive-main',
    templateUrl: './app-archive-main.component.html',
    styleUrls: ['./app-archive-main.component.scss']
})
export class AppArchiveMainComponent implements OnInit {
    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    constructor(private archiveSrv: AppArchiveService,  private route: ActivatedRoute) { }

    private refresh() {
        if (this.outlet && this.outlet.isActivated && this.outlet.component) {
            const comp: any = this.outlet?.component;
            if (comp && comp['refresh'] != null) {
                comp['refresh']();
            }
        }
    }

    @Input()
    set editable(value: boolean) {
        this.archiveSrv.editable = value;
        if (this.outlet && this.outlet.isActivated && this.outlet.component) {
            const comp: any = this.outlet?.component;
            if (comp && comp['setEditable'] != null) {
                comp['setEditable'](value);
            }
        }
    }

    @Input()
    set id(objectId: number) {
        this.archiveSrv.setParentId(objectId);
        this.refresh();
    }

    @Input()
    set appId(id: number) {
        this.archiveSrv.appId = id;
        this.refresh();
    }

    get id() {
        return this.archiveSrv.getParentId();
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(param => {
            const docId = +param.get('documentId') || 0;
            const agentId = +param.get('agentId') || 0;
            const appId = +param.get('appId') || 0;
            this.archiveSrv.appId = this.archiveSrv.appId || appId;
            const id = (docId || agentId) || 0;
            this.archiveSrv.setParentId(id);
        });
    }
}
