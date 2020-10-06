import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShellService } from '@ss/common/ui-shell';
import {
    ABS_STOCK_ARTICLES_URL,
    ABS_STOCK_CLASSES_URL,
    ABS_STOCK_MARKS_URL,
    ABS_STOCK_SUBCLASSES_URL,
    ABS_STOCK_VAT_URL
} from '../constants';

@Component({
    selector: 'ss-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    readonly allLinks: string[] = [
        ABS_STOCK_VAT_URL,
        ABS_STOCK_MARKS_URL,
        ABS_STOCK_CLASSES_URL,
        ABS_STOCK_SUBCLASSES_URL,
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
