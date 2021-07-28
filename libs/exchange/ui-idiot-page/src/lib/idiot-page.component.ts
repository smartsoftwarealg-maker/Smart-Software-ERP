import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ReportParamsService, ReportViewData} from "@ss/common/api-reports";
import {ShellService} from "@ss/common/ui-shell";
import {AdmobClass} from '@ss/common/api-admob';
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'ss-idiot-page',
  templateUrl: './idiot-page.component.html',
  styleUrls: ['./idiot-page.component.scss']
})
export class IdiotPageComponent implements OnInit {
    htmlSrc: SafeHtml = null;

  constructor(private reportService: ReportParamsService,
              private shellSrv: ShellService,
              private deviceSrv: DeviceDetectorService,
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
