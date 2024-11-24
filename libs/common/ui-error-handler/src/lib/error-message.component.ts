import {Component, ChangeDetectorRef} from '@angular/core';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { NgIf } from '@angular/common';
import { TranslateDirective } from '../../../ui-lang/src/lib/translate.directive';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
    selector: 'ss-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
    standalone: true,
    imports: [NgIf, TranslateDirective, MatMiniFabButton]
})
export class MessageComponent {

    constructor(public errorSrv: CustomErrorHandlerService, private cdRef: ChangeDetectorRef) {
        errorSrv.onUpdate = () => cdRef.detectChanges();
    }

    public onCloseClick(): void {
        this.errorSrv.clearError();
    }

}
