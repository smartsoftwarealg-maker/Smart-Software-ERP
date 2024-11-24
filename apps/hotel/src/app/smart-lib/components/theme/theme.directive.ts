import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from './theme.service';

@Directive({
    selector: '[ssTheme]',
    standalone: true
})
export class ThemeDirective implements OnInit {

    public previousClass = null;

    constructor(public _el: ElementRef,
        public _render: Renderer2,
        public _themeService: ThemeService) {
    }

    ngOnInit(): void {
        this._themeService.change.subscribe(res => {
            this.updateTheme(res);
        });
        const theme = this._themeService.getTheme();
        this.previousClass = theme; // to avoid null pointer exception
        this.updateTheme(theme);
    }

    updateTheme(theme: string) {
        this._render.removeClass(this._el.nativeElement.parentElement.parentElement, this.previousClass);
        this.previousClass = theme;
        this._render.addClass(this._el.nativeElement.parentElement.parentElement, theme);
    }

}
