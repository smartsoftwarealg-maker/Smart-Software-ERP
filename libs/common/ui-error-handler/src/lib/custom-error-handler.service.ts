import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageService } from '@ss/common/ui-lang';


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

        this.message = err == null || err.message == null || (err.status === 0 && err.url != null)
            ? this.langSrv.translate('CONNECTION_FAILED', { backend: this.serverFromUrl(err.url)})
            : err.message;

        this.statusText =
            err == null || err.status == null || err.statusText
                || (err.status < 300 && 199 < err.status) == null
                ? 'ERROR'
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
        return url.protocol + "//" + (url.hostname || url.host) + ':' + url.port;
    }

}
