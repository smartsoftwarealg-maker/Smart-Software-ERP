import { ErrorHandler, Injectable } from '@angular/core';
import { CustomErrorHandlerService } from '@ss/common/ui-error-handler';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {

    constructor(public errorSrv: CustomErrorHandlerService) {
        super();
    }

    // I handle the given error.
    public override handleError(error: any): void {
        console.log(error);
        this.errorSrv.setError(error?.originalError || error);
    }

}
