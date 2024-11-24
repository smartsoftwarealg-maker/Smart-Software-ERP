import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { LanguageService, DEFAULT_SUPPORTED_LANGUAGES } from '@ss/common/api-common';
import { MatIconButton } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'ss-language-select-old',
    templateUrl: './language-select.component.html',
    styleUrls: ['./language-select.component.scss'],
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatMenu, NgFor, MatMenuItem]
})
export class LanguageSelectComponent {

    public languages = DEFAULT_SUPPORTED_LANGUAGES;

    @ViewChild('trigger', { static: false }) trigger: MatMenuTrigger;

    constructor(public langSrv: LanguageService) {
    }

    selectLocale(language: string): void {
        this.langSrv.setLanguage(language)
            .subscribe();
    }

    public click(): void {
        this.trigger.toggleMenu();
    }
}
