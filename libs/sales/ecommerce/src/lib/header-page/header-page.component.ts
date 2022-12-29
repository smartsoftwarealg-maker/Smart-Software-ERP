import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl} from '@angular/forms';
import {CartService} from '../cart.service';

@Component({
    selector: 'ss-header-page',
    templateUrl: './header-page.component.html',
    styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent implements OnInit {
    @Output() refresh   = new EventEmitter<string>();
    @Output() showCart  = new EventEmitter<string>();
    @Input() showSearch = true;

    cartSrv = inject(CartService);

    searchControl = new FormControl('');
    logo = './asset/img/logo.png';
    constructor() {}

    ngOnInit(): void {}

    refreshEvent(event: string) {
        this.refresh.next(event);
    }
    cartEvent(event: string) {
        this.showCart.next(event);
    }
}
