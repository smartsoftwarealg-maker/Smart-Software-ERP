import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'ss-contract-article-main',
    templateUrl: './contract-article-main.component.html',
    styleUrls: ['./contract-article-main.component.scss'],
})
export class ContractArticleMainComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.router.navigate(['articles'], {relativeTo: this.route}).then();
    }
}
