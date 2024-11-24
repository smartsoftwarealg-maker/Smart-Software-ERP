import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ReportParamsService, ReportViewData} from "@ss/common/api-reports";
import {ShellService} from "@ss/common/ui-shell";
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'ss-idiot-page',
    templateUrl: './idiot-page.component.html',
    styleUrls: ['./idiot-page.component.scss'],
    standalone: true,
    imports: [NgIf, MatProgressSpinner]
})
export class IdiotPageComponent implements OnInit {
    htmlSrc: SafeHtml = null;

  constructor(private reportService: ReportParamsService,
              private shellSrv: ShellService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
        this.htmlSrc = null;
        const data: ReportViewData = {
            app:       'exchange',
            rType:     'HTML',
            fileName:  'Historique_Client.jasper',
            paramList: []
        };
      this.shellSrv.setGoBackPathByRelativeUrl('..');
        this.reportService
            .viewHTML(data)
            .subscribe(res => this.htmlSrc = this.sanitizer.bypassSecurityTrustHtml(res));
    }
}
