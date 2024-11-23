import { Theme, ThemeService } from './theme.service';
import { Component, ViewChild } from '@angular/core';
import { ColorSelectComponent } from '../color-select/color-select.component';

@Component({
    selector: 'ss-theme-select',
    templateUrl: './theme-select.component.html',
    styleUrls: ['./theme-select.component.scss'],
    standalone: true,
    imports: [ColorSelectComponent]
})
export class ThemeSelectComponent {

    @ViewChild('colorPicker', { static: false }) colorPicker: ColorSelectComponent;
    selectedColor = -1;

    public themes: Theme[] = [
        { cssClass: 'theme-1', backgroundClass: 'theme-1-pri-bg' },
        { cssClass: 'theme-2', backgroundClass: 'theme-2-pri-bg' },
        { cssClass: 'theme-3', backgroundClass: 'theme-3-pri-bg' },
        { cssClass: 'theme-4', backgroundClass: 'theme-4-pri-bg' }
    ];

    constructor(public themeSrv: ThemeService) {
        const name = this.themeSrv.getTheme();
        for (let i = 0; i < this.themes.length; i++) {
            if (this.themes[i].cssClass === name) {
                this.selectedColor = i;
                break;
            }
        }
    }

    selectTheme(i: number) {
        this.selectedColor = i;
        this.themeSrv.setTheme(this.themes[i].cssClass);
    }

    public click(): void {
        this.colorPicker.click();
    }
}
