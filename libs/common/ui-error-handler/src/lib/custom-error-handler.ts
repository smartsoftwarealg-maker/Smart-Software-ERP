import { ErrorHandler, Injectable } from '@angular/core';
import { CustomErrorHandlerService } from './custom-error-handler.service';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {

    constructor(public errorSrv: CustomErrorHandlerService) {
        super();
    }

    // I handle the given error.
    public handleError(error: any): void {
        console.log(error);
        const unwrappedError = error.originalError || error;
        this.errorSrv.setError(error);
    }

}
