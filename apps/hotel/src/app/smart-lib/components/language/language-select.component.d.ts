import { LanguageService } from '../../common/language/language.service';
import { MatMenuTrigger } from '@angular/material';
export declare class LanguageSelectComponent {
    langSrv: LanguageService;
    languages: import("../../common/language/language.service").Language[];
    trigger: MatMenuTrigger;
    constructor(langSrv: LanguageService);
    selectLocale(language: string): void;
    click(): void;
}
