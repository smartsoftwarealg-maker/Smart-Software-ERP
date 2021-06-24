import {Component, ViewChild} from '@angular/core';
import {LanguageService} from '../../../api-common/src/lib/language.service';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
    selector: 'ss-language-select',
    templateUrl: './language-select.component.html',
    styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent {

    @ViewChild('trigger', {static: false}) trigger: MatMenuTrigger;

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
