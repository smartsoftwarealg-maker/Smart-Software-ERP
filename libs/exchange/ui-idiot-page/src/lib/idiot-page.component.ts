import { Component, OnInit } from '@angular/core';
import {ReportParamsService, ReportViewData} from "@ss/common/api-report-param";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'ss-idiot-page',
  templateUrl: './idiot-page.component.html',
  styleUrls: ['./idiot-page.component.scss']
})
export class IdiotPageComponent implements OnInit {
    htmlSrc: SafeHtml = null;

  constructor(private reportService: ReportParamsService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
        this.htmlSrc = null;
        const data: ReportViewData = {
            app:       'exchange',
            rType:     'HTML',
            fileName:  'Historique_Client.jasper',
            paramList: []
        };
        this.reportService
            .viewHTML(data)
            .subscribe(res => this.htmlSrc = this.sanitizer.bypassSecurityTrustHtml(res));
    }
}
