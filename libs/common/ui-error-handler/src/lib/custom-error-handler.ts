import { ErrorHandler, inject, Injectable } from '@angular/core';
import { CustomErrorHandlerService } from '@ss/common/ui-error-handler';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
    public errorSrv = inject(CustomErrorHandlerService);

    // I handle the given error.
    public override handleError(error: any): void {
        this.errorSrv.setError(error?.originalError || error);
    }
}
