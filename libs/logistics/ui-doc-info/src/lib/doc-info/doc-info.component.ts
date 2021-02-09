import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

/**
 * Generate command:
 * nx g component doc-info --path=libs/logistics/ui-doc-info/src/lib  --project=ui-doc-info     --module=logistics-ui-doc-info
 */
enum TYPE {
    AGENT = 1,
    DOCUMENT,
    ARTICLE
}

interface Entry {
    url: string;
    description: string;
    type: TYPE;
}

@Component({
    selector: 'ss-doc-info',
    templateUrl: './doc-info.component.html',
    styleUrls: ['./doc-info.component.scss']
})
export class DocInfoComponent implements OnInit {
    private selectedEntry: Entry;
    public title = "";
    @Input() documentId = 0;
    @Input() agentId = 0;
    @Input() storeId = 0;
    @Input() reference: string = null;
    @Input() showArticle = false;
    @Input() showAgent = true;
    @Input() showDocument = true;

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    public AGENT_URLS: Entry[] = [];
    public DOCUMENT_URLS: Entry[] = [
        {url: "./totals", description: "LOGISTICS_TOTAL", type: TYPE.DOCUMENT},
    ];
    public ARTICLE_URLS: Entry[] = [
        {url: "./circulation", description: "LOGISTICS_CIRCULATION", type: TYPE.ARTICLE},
    ];

    ngOnInit(): void {
    }

    select(entry: Entry) {
        this.selectedEntry = entry;
        this.title = entry.description;
        this.navigate();
    }

    navigate() {
        if (this.selectedEntry != null) {
            this.router.navigate([this.selectedEntry.url], {
                relativeTo: this.route,
                queryParams: this.getQueryParams(),
                queryParamsHandling: 'preserve'
            });
        }
    }

    private getQueryParams(): object {
        const types = {
            [TYPE.AGENT]: {id: this.agentId},
            [TYPE.ARTICLE]: {find: this.reference},
            [TYPE.DOCUMENT]: {id: this.documentId}
        }
        return types[this.selectedEntry?.type] || {}
    }
}
