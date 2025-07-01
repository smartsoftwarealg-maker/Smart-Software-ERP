import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DOCUMENT_ARCHIVES } from '@ss/common/app-archive';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';


import { TranslateDirective } from '@ss/common/ui-lang';

interface Entry {
    name: string,
    description: string,
    url: string,
    paramsProvided: (x: string[]) => boolean
}
interface GroupEntry {
    group: string,
    description: string,
    entries: Entry[]
}

@Component({
    selector: 'ss-doc-info',
    templateUrl: './doc-info.component.html',
    styleUrls: ['./doc-info.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        ReactiveFormsModule
    ],
})

export class DocInfoComponent {
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    private params_: any;
    private AGENT_ASSETS = 'agent_assets';
    private readonly ASSET = {
        name: this.AGENT_ASSETS,
        description: 'ASSET_ASSIGNED_ASSETS',
        url: 'agent-assets',
        paramsProvided: (p: string[]) => p.includes('agentId')
    };

    private readonly ARCHIVE = {
        name: 'archive',
        description: 'COMMON_ARCHIVE',
        url: 'archive',
        paramsProvided: (p: string[]) => p.includes('id') && p.includes('appId')
    };

    private entries_: GroupEntry[] = [
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
                {
                    name: 'archive',
                    description: 'COMMON_ARCHIVE',
                    url: 'archive',
                    paramsProvided: (p: string[]) => p.includes('id') && p.includes('appId')
                },
                {
                    name: 'mrp',
                    description: 'PROD_MRP_REPORT',
                    url: 'mrp',
                    paramsProvided: (p: string[]) => {return p.includes('prodId');}
                }
            ]
        },
        {
            group: 'agent',
            description: 'COMMON_AGENT',
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
                },
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
                {
                    name: 'sources',
                    description: 'LOGISTICS_SOURCES',
                    url: 'sources',
                    paramsProvided: (p: string[]) => p.includes('detailId')
                },
                {
                    name: 'quantities',
                    description: 'LOGISTICS_QUANTITIES',
                    url: 'quantities',
                    paramsProvided: (p: string[]) => p.includes('detailId')
                },
                {
                    name: 'mrp',
                    description: 'PROD_MRP_REPORT',
                    url: 'mrp',
                    paramsProvided: (p: string[]) => p.includes('prodDetail')
                },
                {
                    name: 'consumptions',
                    description: 'STOCK_CONSUMPTION',
                    url: 'consumptions',
                    paramsProvided: (p: string[]) => p.includes('prodDetail')
                }
            ]
        },
    ];
    public selectedEntry: Entry = null;
    @Input() displayedGroups: string[] = [];

    @Input() set params(params: any) {
        this.params_ = { ...params, appId: DOCUMENT_ARCHIVES, editable: true };
        this.navigate();
    }

    get params(): any {
        return this.params_;
    }


    @Input() set showAssets(show: boolean) {
        if (show) {
            if (this.entries_[1].entries.filter(e => e.name === this.AGENT_ASSETS).length < 1) {
                this.entries_[1].entries.push(this.ASSET);
            }
        } else {
            this.entries_[1].entries = this.entries_[1].entries.filter(e => e.name !== this.AGENT_ASSETS);
        }
    }


    getDisplayedEntries(): GroupEntry[] {
        return this.entries_
            .filter(x => this.displayedGroups.includes(x.group))
            .map(e => {
                e.entries = e.entries.filter(ee => ee.paramsProvided(Object.keys(this.params_)));
                return e;
            });
    }

    select(e: any): void {
        this.selectedEntry = e;
        this.navigate();
    }

    navigate(): void {
        if (this.selectedEntry != null) {
            delete this.params_['compensated'];
            console.log(this.params_);
            this.router.navigate([this.selectedEntry.url],
                {
                    relativeTo: this.route,
                    queryParamsHandling: 'merge',
                    queryParams: this.params_
                }).then();
        }
    }
}
