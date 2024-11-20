import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {LanguageService} from '@ss/common/api-common';
import {MatMenuTrigger} from '@angular/material/menu';
import { ThemeService } from './theme.service';

@Component({
    selector: 'ss-theme-select',
    styleUrls: ['./theme-select.component.scss'],
    templateUrl: './theme-select.component.html',
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatMenu, NgFor, MatMenuItem]
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
