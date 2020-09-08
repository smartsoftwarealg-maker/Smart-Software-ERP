import {Component, ChangeDetectorRef} from '@angular/core';
import { CustomErrorHandlerService } from './custom-error-handler.service';

@Component({
    selector: 'ss-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss']
})
export class MessageComponent {

    constructor(public errorSrv: CustomErrorHandlerService, private cdRef: ChangeDetectorRef) {
        errorSrv.onUpdate = () => cdRef.detectChanges();
    }

    public onCloseClick(): void {
        this.errorSrv.clearError();
    }

}
