import {Component, Input, OnInit} from '@angular/core';

/**
 * Generate command:
 * nx g component doc-info --path=libs/logistics/ui-doc-info/src/lib  --project=ui-doc-info     --module=logistics-ui-doc-info
 */

@Component({
  selector: 'ss-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.scss']
})
export class DocInfoComponent implements OnInit {
  public title = "";
  @Input() documentId = 0;
  @Input() agentId = 0;
  @Input() storeId = 0;
  @Input() reference: string = null;
  @Input() showArticle  = false;
  @Input() showAgent    = true;
  @Input() showDocument = true;

  constructor() { }

  public AGENT_URLS = [];
  public DOCUMENT_URLS = [
      { url: "totals", description: "LOGISTICS_TOTAL" },
  ];
  public ARTICLE_URLS = [
      { url: "circulation", description: "LOGISTICS_CIRCULATION" },
      ];

  ngOnInit(): void {
  }

}
