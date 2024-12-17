import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    DEFAULT_THEME = 'theme-2';
    THEME_KEY = 'theme';

    constructor() {}

    load() {
        const savedTheme =
            localStorage.getItem(this.THEME_KEY) || this.DEFAULT_THEME;
        this.selectTheme(savedTheme);
    }

    save(theme: string) {
        localStorage.setItem(this.THEME_KEY, theme);
    }

    setTheme(theme: string) {
        this.save(theme);
        this.selectTheme(theme);
    }

    private isThemeLink(element: Element) {
        if (!element) { return false; }
        if (!(element instanceof HTMLLinkElement)) { return false; }

        const link = element as HTMLLinkElement;
        if ('stylesheet' !== link.rel || !link.href) { return false; }

        return link.href.indexOf('/theme-') > -1;

    }

    private getThemeLink(): HTMLLinkElement | null {
        const head = document.getElementsByTagName('head')[0];
        for (let i = 0; i < head.children.length; i++) {
            const element = head.children.item(i);
            if (this.isThemeLink(element)) { return element as HTMLLinkElement; }
        }
        return null;
    }

    private removeOtherLinks(notThis: string): void {
        const head = document.getElementsByTagName('head')[0];
        for (let i = 0; i < head.children.length; i++) {
            const element = head.children.item(i);
            if (this.isThemeLink(element)) {
                const l = element as HTMLLinkElement;
                if (l.href !== notThis) {
                    head.removeChild(element);
                }
            }
        }
        return null;
    }

    private selectTheme(newTheme: string) {
        const link = this.getThemeLink() as HTMLLinkElement;
        const idx = link.href.indexOf('/theme-');
        const href = link.href.substring(0, idx + 1) + newTheme + '.css';
        if (href !== link.href) {
            this.loadTheme(href);
        }
    }

    loadTheme(href: string): void {
        const head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', href);
        link.onload = () => {
            this.removeOtherLinks(href);
        };
        head.appendChild(link);
    }
}
