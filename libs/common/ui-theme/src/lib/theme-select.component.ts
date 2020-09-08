import {Component, ViewChild} from '@angular/core';
import {LanguageService} from '@ss/common/ui-lang';
import {MatMenuTrigger} from '@angular/material/menu';
import { ThemeService } from './theme.service';

@Component({
    selector: 'ss-theme-select',
    styleUrls: ['./theme-select.component.scss'],
    templateUrl: './theme-select.component.html'
})
export class ThemeSelect {

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
    }

    public click(): void {
        this.trigger.toggleMenu();
    }

}
