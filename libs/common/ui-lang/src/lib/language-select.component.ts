import { Component, inject, input, output, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { CompanySelectorService, LanguageService, MaterialModule } from '@ss/common/api-common';
import { MatIconButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from './translate.pipe';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'ss-language-select',
    templateUrl: './language-select.component.html',
    styleUrls: ['./language-select.component.scss'],
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatMenu, MatMenuItem, MaterialModule, ReactiveFormsModule, TranslatePipe]
})
export class LanguageSelectComponent {
    #DEFAULT_COMPANY = 'DEFAULT_COMPANY';
    deviceSrv = inject(DeviceDetectorService);
    companySelectorSrv = inject(CompanySelectorService);
    langSrv = inject(LanguageService);

    @ViewChild('trigger', { static: false }) trigger: MatMenuTrigger;
    showCenterSelection = input(false);
    onSelectedCompany = output<string>();

    selectLocale(language: string): void {
        this.langSrv.setLanguage(language).subscribe();
    }

    public click(): void {
        this.trigger.toggleMenu();
    }

    public selectCompany(company: string) {
        this.onSelectedCompany.emit(company);
        this.companySelectorSrv.select(company);
        if (this.deviceSrv.isDesktop()) {
            localStorage.setItem(this.#DEFAULT_COMPANY, company);
        } else {
            // async setObject() {
            //     await Preferences.set({
            //         key: 'user',
            //         value: JSON.stringify({
            //             id: 1,
            //             name: 'Max'
            //         })
            //     });
            // }
        }
    }
}
