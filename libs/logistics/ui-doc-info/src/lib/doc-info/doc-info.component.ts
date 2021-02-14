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
    private documentId_ = 0;
    private agentId_ = 0;
    private storeId_ = 0;
    private reference_ : string = null;
    @Input() showArticle = false;
    @Input() showAgent = true;
    @Input() showDocument = true;

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    public AGENT_URLS: Entry[] = [];
    public DOCUMENT_URLS: Entry[] = [
        { url: "totals", description: "LOGISTICS_TOTAL", type: TYPE.DOCUMENT},
    ];
    public ARTICLE_URLS: Entry[] = [
        { url: "circulation", description: "LOGISTICS_CIRCULATION", type: TYPE.ARTICLE},
    ];

    @Input() set documentId(id: number) {
        this.documentId_ = id;
        this.navigate();
    }

    @Input() set agentId(id: number) {
        this.agentId_ = id;
        if (this.selectedEntry && this.selectedEntry.type === TYPE.AGENT) {
            this.navigate();
        }
    }
    @Input() set reference(obj: { reference: string, storeId: number }) {
        const inp = obj || {};
        this.reference_ = inp['reference'];
        this.storeId_ = inp['storeId'];
        if (this.selectedEntry && this.selectedEntry.type === TYPE.ARTICLE) {
            this.navigate();
        }
    }

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
                queryParamsHandling: 'merge',
                queryParams: this.getQueryParams()
            });
        }
    }

    private getQueryParams(): object {
        const types = {
            [TYPE.AGENT]: {id: this.agentId_ || 0 },
            [TYPE.DOCUMENT]: { id: this.documentId_ || 0 },
            [TYPE.ARTICLE]: { find: this.reference_ || '' },
        }
        return types[this.selectedEntry?.type || 0] || {}
    }
}
