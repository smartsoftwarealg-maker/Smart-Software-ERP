import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl} from '@angular/forms';
import {CartService} from '../cart.service';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'ss-header-page',
    templateUrl: './header-page.component.html',
    styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent implements OnInit, OnDestroy {
    @Output() refresh   = new EventEmitter<string>();
    @Output() showCart  = new EventEmitter<string>();
    @Input() showSearch = true;
    private subscriptions: Subscription[] = [];

    cartSrv = inject(CartService);

    searchControl = new FormControl('');
    logo = './asset/img/logo.png';
    constructor() {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.searchControl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                )
                .subscribe(_ => this.refreshEvent()));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    refreshEvent() {
        this.refresh.next(this.searchControl.value);
    }

    cartEvent(event: string) {
        this.showCart.next(event);
    }
}
