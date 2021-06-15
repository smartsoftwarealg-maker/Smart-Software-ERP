import { EventEmitter } from '@angular/core';
export interface Theme {
    cssClass: string;
    backgroundClass?: string;
}
export declare class ThemeService {
    DEFAULT_THEME: string;
    THEME_KEY: string;
    current: string;
    change: EventEmitter<string>;
    constructor();
    getTheme(): string;
    setTheme(theme: any): void;
}
