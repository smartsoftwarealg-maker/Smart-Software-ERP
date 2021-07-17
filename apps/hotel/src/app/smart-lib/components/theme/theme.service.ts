import { EventEmitter, Injectable } from '@angular/core';

export interface Theme {
    cssClass: string;
    backgroundClass?: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {

    DEFAULT_THEME = 'theme-1';
    THEME_KEY = 'theme';

    current = this.DEFAULT_THEME;
    change: EventEmitter<string> = new EventEmitter();

    constructor() {
        this.current = localStorage.getItem(this.THEME_KEY)
            ? localStorage.getItem(this.THEME_KEY)
            : this.DEFAULT_THEME;
    }

    public getTheme(): string {
        return this.current;
    }

    public setTheme(theme) {
        this.current = theme;
        this.change.emit(theme);
        localStorage.setItem(this.THEME_KEY, theme);
    }

}
