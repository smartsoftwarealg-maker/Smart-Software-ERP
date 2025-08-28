import {Component, ChangeDetectorRef} from '@angular/core';
import { CustomErrorHandlerService } from '@ss/common/ui-error-handler';

import { TranslateDirective } from '@ss/common/ui-lang';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'ss-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
    standalone: true,
    imports: [TranslateDirective, MatMiniFabButton]
})
export class MessageComponent {

    constructor(public errorSrv: CustomErrorHandlerService, private cdRef: ChangeDetectorRef) {
        errorSrv.onUpdate = () => cdRef.detectChanges();
    }

    public onCloseClick(): void {
        this.errorSrv.clearError();
    }

}
