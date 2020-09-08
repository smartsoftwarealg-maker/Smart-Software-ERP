import { Injectable, ElementRef, Renderer2, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    DEFAULT_THEME = 'theme-1';
    THEME_KEY = 'theme';
  
    currentTheme: EventEmitter<string> = new EventEmitter();

    getThemeFirstTime() {
        this.currentTheme.emit(localStorage.getItem(this.THEME_KEY) ? localStorage.getItem(this.THEME_KEY) : this.DEFAULT_THEME);
    }
    
    setTheme(theme: string) {
        this.currentTheme.emit(theme);
        localStorage.setItem(this.THEME_KEY, theme);
    }
    
    getCurrentThemeName(): string {
        return localStorage.getItem(this.THEME_KEY) ? localStorage.getItem(this.THEME_KEY) : this.DEFAULT_THEME;
    }

}
