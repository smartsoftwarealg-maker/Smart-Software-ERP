import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

/**
 * Generate command:
 * nx g component doc-info --path=libs/logistics/ui-doc-info/src/lib  --project=ui-doc-info     --module=logistics-ui-doc-info
 * nx g @nrwl/angular:lib api-sales-order  --directory sales --dry-run
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
    private document_ = {id: 0, documentURL: ''};
    private agentId_ = 0;
    private storeId_ = 0;
    private reference_: string = null;
    @Input() showArticle = false;
    @Input() showAgent = true;
    @Input() showDocument = true;

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    public AGENT_URLS: Entry[] = [];
    public DOCUMENT_URLS: Entry[] = [
        {url: "totals", description: "LOGISTICS_TOTAL", type: TYPE.DOCUMENT},
    ];
    public ARTICLE_URLS: Entry[] = [
        {url: "circulation", description: "LOGISTICS_CIRCULATION", type: TYPE.ARTICLE},
    ];

    @Input() set document(doc: { id: number, documentURL: string }) {
        this.document_ = doc;
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
            [TYPE.AGENT]: {DIAgentId: this.agentId_ || 0},
            [TYPE.DOCUMENT]: {DIDocId: this.document_.id || 0},
            [TYPE.ARTICLE]: {DIReference: this.reference_ || ''},
        }
        return types[this.selectedEntry?.type || 0] || {}
    }
}
