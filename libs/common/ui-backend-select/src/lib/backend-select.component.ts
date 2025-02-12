import { Component, inject, input, output, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { CompanySelectorService, LanguageService, MaterialModule } from '@ss/common/api-common';
import { MatIconButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-backend-select',
    templateUrl: './backend-select.component.html',
    styleUrl: './backend-select.component.scss',
    imports: [MatIconButton, MatMenuTrigger, MatMenu, MatMenuItem, MaterialModule, ReactiveFormsModule, TranslatePipe]
})
export class BackendSelectComponent {
    #DEFAULT_COMPANY = 'DEFAULT_COMPANY';
    deviceSrv = inject(DeviceDetectorService);
    companySelectorSrv = inject(CompanySelectorService);
    langSrv = inject(LanguageService);
    @ViewChild('trigger', { static: false }) trigger: MatMenuTrigger;

    onSelectedCompany = output<string>();
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
