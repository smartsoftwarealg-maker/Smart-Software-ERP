import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CartService} from '../cart.service';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatBadge } from '@angular/material/badge';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { LanguageSelectComponent } from '../../../../../common/ui-lang/src/lib/language-select.component';
import { ThemeSelectComponent } from '@ss/common/ui-theme';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-header-page',
    templateUrl: './header-page.component.html',
    styleUrls: ['./header-page.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatIconButton,
        MatTooltip,
        MatBadge,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        LanguageSelectComponent,
        ThemeSelectComponent,
        TranslatePipe,
    ],
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
