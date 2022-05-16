import { ErrorHandler, Injectable } from '@angular/core';
import { CustomErrorHandlerService } from './custom-error-handler.service';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {

    constructor(public errorSrv: CustomErrorHandlerService) {
        super();
    }

    // I handle the given error.
    public handleError(error: any): void {
        this.errorSrv.setError(error.originalError || error);
    }

}
