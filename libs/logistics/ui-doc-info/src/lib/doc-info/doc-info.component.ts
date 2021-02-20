import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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

    @Input() displayedGroups;

    @Input() set params(params: any) {
        const providedParams = Object.keys(params);
        const notAllRequiredParamsExist = this.entries_
            .filter(x => this.displayedGroups.includes(x.group))
            .map(x => x.entries).reduce((t, x) => t.concat(x), [])
            .map(x => x.paramsProvided(providedParams))
            .some(x => !x);
        if (notAllRequiredParamsExist) {
            throw Error('Some params are messing !');
        }

        this.params_ = params;
    }

    public selectedEntry: any;
    private params_: any;
    private entries_: { group: string, description: string, entries: Entry[] }[] = [
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
                }
            ]
        },
        {
            group: 'document',
            description: 'LOGISTICS_DOCUMENT',
            entries: [
                {
                    name: 'totals',
                    description: 'LOGISTICS_TOTAL',
                    url: 'totals',
                    paramsProvided: (p: string[]) => p.includes('documentId') && p.includes('documentURL')
                }
            ],
        }
    ];


    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    getDisplayedEntries(): any {
        return this.entries_.filter(x => this.displayedGroups.includes(x.group));
    }

    select(e): void {
        this.selectedEntry = e;
        this.navigate();
    }

    navigate(): void {
        if (this.selectedEntry != null) {
            this.router.navigate([this.selectedEntry.url], {
                relativeTo: this.route,
                queryParamsHandling: 'merge',
                queryParams: this.params_
            });
        }
    }


}
