import { EventEmitter } from '@angular/core';
import { LanguageService } from '../../common/language/language.service';
import { MatMenuTrigger } from '@angular/material';
export declare class ColorSelectComponent {
    langSrv: LanguageService;
    trigger: MatMenuTrigger;
    useIconOnly: boolean;
    selectedColor: number;
    colorKey: string;
    classKey: string;
    change: EventEmitter<number>;
    mColors: any[];
    mColumnsCount: number;
    mRowCount: number;
    constructor(langSrv: LanguageService);
    colors: any[];
    columnsCount: number;
    updateRowCount(): void;
    selectedColorObject: any;
    selectColor(i: number): void;
    click(): void;
}
