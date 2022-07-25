import {Component, Input, OnInit} from '@angular/core';
import {AppArchiveService} from '../app-archive.service';

@Component({
    selector: 'ss-app-archive-main',
    templateUrl: './app-archive-main.component.html',
    styleUrls: ['./app-archive-main.component.scss']
})
export class AppArchiveMainComponent implements OnInit {
    private _id = 0;

    constructor(private entitySrv: AppArchiveService) { }

    ngOnInit(): void {
    }

    @Input()
    set id(agentId: number) {
        this._id = agentId;
    }

    @Input()
    set appId(id: number) {
        this.entitySrv.appId = id;
    }
}
