import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ss-header-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header-page.component.html',
    styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent implements OnInit {
    logo = './asset/img/logo.png';
    constructor() {}

    ngOnInit(): void {}
}
