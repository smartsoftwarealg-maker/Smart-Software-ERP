import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Directive({
    selector: '[ssTheme]'
})
export class ThemeDirective implements OnInit {

    public previousClass: string = null;

    constructor(
        public element: ElementRef,
        public render: Renderer2,
        public themeSrv: ThemeService
    ) { }

    ngOnInit(): void {
        this.listenToThemeChange();
        this.setThemeFirstTime();
    }

    setThemeFirstTime() {
        this.themeSrv.getThemeFirstTime();
    }

    listenToThemeChange() {
        this.themeSrv.currentTheme.subscribe(res => {
            if (this.previousClass) {
                this.render.removeClass(this.element.nativeElement.parentElement.parentElement, this.previousClass);
            }
            this.previousClass = res;
            this.render.addClass(this.element.nativeElement.parentElement.parentElement, res);
        });

    }

}
