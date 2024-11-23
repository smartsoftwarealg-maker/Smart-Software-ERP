import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {LanguageService} from '@ss/common/api-common';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { ThemeService } from './theme.service';
import { MatIconButton } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'ss-theme-select',
    styleUrls: ['./theme-select.component.scss'],
    templateUrl: './theme-select.component.html',
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatMenu, NgFor, MatMenuItem]
})
export class ThemeSelect {
    @Output() onTheme = new EventEmitter<string>();

    @ViewChild('trigger', {static: false}) trigger: MatMenuTrigger;

    themes: string[] = [
        'theme-1',
        'theme-2',
        'theme-3',
        'theme-4'
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
