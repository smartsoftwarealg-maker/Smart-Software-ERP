import {Component, ElementRef, Input, ViewChild} from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActivatedRoute, Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslateDirective } from '@ss/common/ui-lang';

interface Entry {
    name: string,
    description: string,
    url: string,
    paramsProvided: (x: string[]) => boolean
}

@Component({
    selector: 'ss-exc-doc-info',
    templateUrl: './exc-doc-info.component.html',
    styleUrls: ['./exc-doc-info.component.scss'],
    standalone: true,
    imports: [MatToolbar, RouterLinkActive, RouterLink, TranslateDirective, RouterOutlet]
})

export class ExcDocInfoComponent {
    @ViewChild('history') historyBtn: ElementRef = null;
    private _selectedId = 0;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    @Input() set selectedId(id: number) {
        this._selectedId = id;
        this.router.navigate(['history'], { relativeTo: this.route, queryParams: { id: id }});
    }
    get selectedId(): number {
        return  this._selectedId;
    }
}
