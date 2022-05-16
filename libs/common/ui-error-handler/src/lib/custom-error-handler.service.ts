import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {isString, LanguageService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CustomErrorHandlerService {

    public onUpdate: () => void = null;
    public message: string;
    public status: number;
    public statusText: string;

    private errorSet = false;

    constructor(private langSrv: LanguageService) {
    }

    public get showMessage() {
        return this.errorSet;
    }

    // todo: Push error into a queue instead of keeping the last one only
    public setError(err: HttpErrorResponse | any) {
        this.status = err == null || err.status == null
            ? 0
            : err.status;

        // Business logic exception has this type: { code: string, params: string[] }
        if (err && err.error) {
            this.message = isString(err.error.code) ? this.langSrv.translate('BL_' +  err.error.code) :
                    isString(err.error) ? err.error : err.error.exception;
        }
        if (!this.message) {
                this.message = err.message
                    ? err.message
                    : this.langSrv.translate('COMMON_CONNECTION_FAILED', { backend: this.serverFromUrl(err.url)});
        }

        this.statusText =
            err == null || err.status == null || err.statusText
                || (err.status < 300 && 199 < err.status) == null
                ? 'COMMON_ERROR'
                : err.statusText;

        this.errorSet = true;

        if (this.onUpdate) {
            this.onUpdate();
        }
    }

    public clearError() {
        this.message = null;
        this.status = null;
        this.statusText = null;
        this.errorSet = false;
        if (this.onUpdate) {
            this.onUpdate();
        }
    }

    private serverFromUrl(urlStr: string) {
        const url = new URL(urlStr);
        return url.protocol + '//' + (url.hostname || url.host) + ':' + url.port;
    }

}
