import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

interface Entry {
    name: string,
    description: string,
    url: string,
    paramsProvided: (x: string[]) => boolean
}

@Component({
    selector: 'ss-doc-info',
    templateUrl: './doc-info.component.html',
    styleUrls: ['./doc-info.component.scss']
})

export class DocInfoComponent {

    @Input() displayedGroups: string[] = [];

    @Input() set params(params: any) {
        const providedParams = Object.keys(params);
        const notAllRequiredParamsExist = this.entries_
            .filter(x => this.displayedGroups.includes(x.group))
            .map(x => x.entries).reduce((t, x) => t.concat(x), [])
            .map(x => x.paramsProvided(providedParams))
            .some(x => !x);
        if (notAllRequiredParamsExist) {
            // throw Error('Some params are messing !');
        }

        this.params_ = params;
        this.navigate();
    }

    public selectedEntry: any;
    private params_: any;
    private entries_: { group: string, description: string, entries: Entry[] }[] = [
        {
            group: 'document',
            description: 'LOGISTICS_DOCUMENT',
            entries: [
                {
                    name: 'totals',
                    description: 'COMMON_TOTAL',
                    url: 'totals',
                    paramsProvided: (p: string[]) => p.includes('documentId') && p.includes('documentURL')
                },
                // {
                //     name: 'archive',
                //     description: 'COMMON_ARCHIVE',
                //     url: 'archive',
                //     paramsProvided: (p: string[]) => p.includes('documentId')
                // }
            ],
        },
        {
            group: 'agent',
            description: 'LOGISTICS_AGENT',
            entries: [
                {
                    name: 'balance',
                    description: 'LOGISTICS_AGENT_BALANCE',
                    url: 'agent-balance',
                    paramsProvided: (p: string[]) => p.includes('agentId')
                },
                {
                    name: 'debts',
                    description: 'LOGISTICS_AGENT_DEBTS',
                    url: 'agent-debts',
                    paramsProvided: (p: string[]) => p.includes('agentId')
                },
                {
                    name: 'debts_2',
                    description: 'LOGISTICS_RAW_AGENT_DEBTS',
                    url: 'agent-debts',
                    paramsProvided: (p: string[]) => p.includes('agentId')
                }
            ],
        },
        {
            group: 'article',
            description: 'LOGISTICS_ARTICLE',
            entries: [
                {
                    name: 'circulation',
                    description: 'LOGISTICS_CIRCULATION',
                    url: 'circulation',
                    paramsProvided: (p: string[]) => p.includes('articleId') || p.includes('articleReference')
                },
                {
                    name: 'card',
                    description: 'LOGISTICS_CARD',
                    url: 'card',
                    paramsProvided: (p: string[]) =>
                        (p.includes('articleId') || p.includes('articleReference')) &&
                        (p.includes('articleStoreId') || p.includes('articleUseStoreSearch'))
                },
                {
                    name: 'stock',
                    description: 'LOGISTICS_STOCK',
                    url: 'stock',
                    paramsProvided: (p: string[]) => p.includes('articleReference')
                },
            ]
        },
    ];


    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    getDisplayedEntries(): any {
        return this.entries_.filter(x => this.displayedGroups.includes(x.group));
    }

    select(e: any): void {
        this.selectedEntry = e;
        this.navigate();
    }

    navigate(): void {
        if (this.selectedEntry != null) {
            delete this.params_['compensated'];
            this.params_.compensated = this.selectedEntry.name === 'debts_2'? 'false' : 'true';
            this.router.navigate([this.selectedEntry.url], {
                relativeTo: this.route,
                queryParamsHandling: 'merge',
                queryParams: this.params_
            });
        }
    }
}
