import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {LanguageService} from '@ss/common/api-common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ThemeService } from './theme.service';
import { MatIconButton } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'ss-theme-select',
    styleUrls: ['./theme-select.component.scss'],
    templateUrl: './theme-select.component.html',
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatMenu, MatMenuItem]
})
export class ThemeSelectComponent {
    @Output() onTheme = new EventEmitter<string>();

    @ViewChild('trigger', {static: false}) trigger: MatMenuTrigger;

    public themes = [
        'theme-0',
        'theme-1',
        'theme-2',
        'theme-3'
    ];

    constructor(public langSrv: LanguageService, public themeSrv: ThemeService) {
    }

    public setTheme(t: string) {
        this.themeSrv.setTheme(t);
        this.onTheme.emit(t);
    }

    public click(): void {
        this.trigger.toggleMenu();
    }

}
