import { Theme, ThemeService } from './theme.service';
import { ColorSelectComponent } from '../color-select/color-select.component';
export declare class ThemeSelectComponent {
    themeSrv: ThemeService;
    colorPicker: ColorSelectComponent;
    selectedColor: number;
    themes: Theme[];
    constructor(themeSrv: ThemeService);
    selectTheme(i: number): void;
    click(): void;
}
