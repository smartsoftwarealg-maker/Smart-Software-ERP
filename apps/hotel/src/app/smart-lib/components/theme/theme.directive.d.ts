import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from './theme.service';
export declare class ThemeDirective implements OnInit {
    _el: ElementRef;
    _render: Renderer2;
    _themeService: ThemeService;
    previousClass: any;
    constructor(_el: ElementRef, _render: Renderer2, _themeService: ThemeService);
    ngOnInit(): void;
    updateTheme(theme: string): void;
}
