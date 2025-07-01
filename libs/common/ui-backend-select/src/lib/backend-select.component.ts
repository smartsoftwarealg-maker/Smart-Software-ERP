import { Component, inject, output, signal } from '@angular/core';
import { CompanySelectorService, MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-backend-select',
    templateUrl: './backend-select.component.html',
    styleUrl: './backend-select.component.scss',
    standalone: true,
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
        this.onSelectedCompany.emit(this.selectedCompany());
    }

}
