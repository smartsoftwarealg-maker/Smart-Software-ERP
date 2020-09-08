import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShellService } from '@ss/common/ui-shell';
// import { INDEX_PAGE_URL } from '@ss/common/api-common';
import { ABS_STOCK_ARTICLES_URL, ABS_STOCK_MARKS_URL } from '../constants';

@Component({
    selector: 'ss-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    // public static DEFAULT_URL = '/' + [
    //     INDEX_PAGE_URL
    // ].join('/');

    readonly allLinks: string[] = [
        ABS_STOCK_MARKS_URL,
        ABS_STOCK_ARTICLES_URL
    ];

    links: string[] = this.allLinks;

    constructor(private shellSrv: ShellService) { }

    ngOnInit(): void {
        this.shellSrv.setTilte('TEST_APP');
        this.shellSrv.enableSearch(
            'Search Urls',
            e => e.subscribe(
                f => {
                    const lowF = f.toLowerCase();
                    this.links = this.allLinks.filter(a => a.toLowerCase().indexOf(lowF) > -1);
                },
                err => console.error(err)
            )
        );
    }

    ngOnDestroy(): void {
        this.shellSrv.reset();
    }

}
