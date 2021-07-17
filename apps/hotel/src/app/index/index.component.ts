import { Component, OnInit } from '@angular/core';
import { applications } from '../app.module';

@Component({
    selector: 'app-about',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    public apps = applications;

    constructor(public langSrv: LanguageService) {
    }

    ngOnInit(): void {
    }

}
