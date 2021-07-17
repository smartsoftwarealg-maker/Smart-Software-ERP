import { Component, Input } from '@angular/core';
import { LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'app-basic-shell',
    templateUrl: './basic-shell.component.html'
})
export class BasicShellComponent {
    @Input()
    public hasContent = false;

    constructor(public langSrv: LanguageService) {
    }
}
