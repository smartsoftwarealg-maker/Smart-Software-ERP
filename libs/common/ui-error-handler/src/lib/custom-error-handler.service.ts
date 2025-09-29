import {inject, Injectable, signal} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {isString, LanguageService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CustomErrorHandlerService {
    private langSrv = inject(LanguageService);
    public onUpdate: () => void = null;
    public message = signal<string[]>([]);
    public statusText = signal<string|null>('');
    public errorSet = signal(false);


    // todo: Push error into a queue instead of keeping the last one only
    public setError(err: HttpErrorResponse | any) {
        // Business logic exception has this type: { code: string, params: string[] }
        if (err?.error && isString(err.error.code)) {
            this.message.set([ this.langSrv.translate('BL_' + err.error.code)]);
            this.errorSet.set(true);
        } else if (err?.error && isString(err.error.exception)) {
            this.message.set([ err.error.exception]);
            this.errorSet.set(true);
        } else if (err.error) {
            if (err.error instanceof ArrayBuffer) {
                const decoder = new TextDecoder('utf-8');
                const str = decoder.decode(err.error.toString());
                const exception = JSON.parse(str);
                if (exception?.exception) {
                    this.message.set([exception['exception']]);
                } else {
                    if (str.length > 10) {
                        this.message.set(str.replace(`"exception":`, '').split(`\n`));
                    }
                }
                this.errorSet.set(true);
            } else if (err.error instanceof Blob) {
                // Extract the error message from the Blob
                (<Blob>err.error).text().then(text => {
                    const msg = text.replace(`"exception":`, '')
                        .replace(`{"`, '')
                        .replace(`"}`, '')
                        .split('\\n');
                    console.log(msg);
                    this.message.set(msg);
                    this.errorSet.set(true);
                    if (this.onUpdate) {
                        this.onUpdate();
                    }
                });
            } else if (err.error['exception']) {
                const msg = err.error['exception']
                    .replace(`"exception":`, '')
                    .replace(`{"`, '')
                    .replace(`"}`, '')
                    .replace(`\\t`, '||')
                    .split('\\n');
                this.message.set(msg);
                this.errorSet.set(true);
            }
        } else if (err['message']) {
            this.message.set([err['message']]);
            this.errorSet.set(true);
        }

        this.statusText.set(err?.error['params'] || '');

        if (this.onUpdate) {
            this.onUpdate();
        }
    }

    public clearError() {
        this.message.set(null);
        this.statusText.set(null);
        this.errorSet.set(false);
        if (this.onUpdate) {
            this.onUpdate();
        }
    }

    private serverFromUrl(urlStr: string) {
        const url = new URL(urlStr);
        return url.protocol + '//' + (url.hostname || url.host) + ':' + url.port;
    }
}
