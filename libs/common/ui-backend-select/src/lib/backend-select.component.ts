import { Component, inject, input, output, signal, ViewChild } from '@angular/core';
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
    imports: [MaterialModule, ReactiveFormsModule, TranslatePipe]
})
export class BackendSelectComponent {
    companySelectorSrv = inject(CompanySelectorService);


    selectedCompany = signal<string|null>(null);

    onSelectedCompany = output<string>();

    selectCompany(c: string) {
        this.selectedCompany.set(c);
    }

    select() {
        console.log(this.selectedCompany());
        this.onSelectedCompany.emit(this.selectedCompany());
    }

}
