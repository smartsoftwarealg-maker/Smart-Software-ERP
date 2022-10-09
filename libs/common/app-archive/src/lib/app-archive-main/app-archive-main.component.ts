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
    private _id = 0;
    private _docId = 0;
    private _appId = 0;
    private _agentId = 0;

    constructor(private archiveSrv: AppArchiveService,
                private route: ActivatedRoute,
                private router: Router) { }



    private refresh() {
        if (this.outlet && this.outlet.isActivated && this.outlet.component) {
            const comp: any = this.outlet?.component;
            if (comp && comp['refresh'] != null) {
                comp['refresh']();
            }
        }
    }

    @Input()
    set id(objectId: number) {
        this._id = objectId;
        this.refresh();
    }

    @Input()
    set appId(id: number) {
        this.archiveSrv.appId = id;
    }

    get id() {
        return this._id;
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(param => {
            const docId = +param.get('documentId') | 0;
            const agentId = +param.get('agentId') | 0;
            this._appId = +param.get('appId') | 0;
            this.archiveSrv.appId = this._appId;
            this._id = docId || agentId;
            this.archiveSrv.setParentId(this._id);
        });
    }
}
