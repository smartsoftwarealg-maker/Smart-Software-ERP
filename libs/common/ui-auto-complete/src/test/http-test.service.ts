import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, share} from 'rxjs/operators';

const AUTH_TOKEN = 'auth_token';

@Injectable({
    providedIn: 'root'
})
export class HttpTestService {
    public baseUrl: string;

    constructor(public httpClient: HttpClient) {
        this.baseUrl = 'http://localhost:8080';
    }

    static getHeaders() {
        return new HttpHeaders(
            {
                Authorization: this.getAuthToken() || ''
            }
        );
    }

    static getAuthToken(): string {
        return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NQZXJpb2QiOjEsImNlbnRlciI6MCwicGF5TW9udGgiOjAsInNldmVyZSI6ZmFsc2UsImlkIjoxLCJtYW5hZ2VyIjpmYWxzZSwiYWNjWWVhciI6MCwiYWNjRmlsZSI6MCwidXNlck5hbWUiOiJtYW5hZ2VyIiwibG9nZ2luZ1RpbWUiOjE1OTc0ODA2OTcyOTR9.0wOhL4r97oxNzR_SnOFnQp6Lf4geYsPpQM_AxyXCBsk';
    }

    public init(): Observable<any> {
        if (this.baseUrl) {
            return of(false);
        }
        return this.httpClient.get('./config/config.json')
            .pipe(
                share(),
                map(conf => {
                    this.load(conf);
                    return true;
                })
            );
    }

    // noinspection JSUnusedGlobalSymbols
    public isReady(): boolean {
        return this.baseUrl != null;
    }

    // noinspection JSUnusedGlobalSymbols
    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public getData<T>(url: string, page: number, size: number, filter?: string, sortBy?: string, params?: HttpParams): Observable<{ itemCount: number, body: T[] }> {
        let httpParams = (params == null ? new HttpParams() : params)
            .set('page', `${page}-${size}`);
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL');
        }
        if (filter) {
            httpParams = httpParams.set('filter', filter);
        }
        if (sortBy) {
            httpParams = httpParams.set('sort', sortBy);
        }
        return this
            .httpClient
            .get<T[]>(this.baseUrl + url,
                {
                    headers: HttpTestService.getHeaders(),
                    observe: 'response', params: httpParams
                }
            ).pipe(map(ress => {
                const cr = ress.headers.get('Content-Range');
                const cnt = cr ? +cr.split('/')[1] : 0;
                return {itemCount: cnt, body: ress.body};
            }));
    }

    public getBlob(url: string, httpParams?: HttpParams): Observable<Blob> {
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL');
        }
        return this
            .httpClient
            .get(this.baseUrl + url,
                {
                    headers: HttpTestService.getHeaders(),
                    observe: 'response',
                    responseType: 'blob',
                    params: httpParams
                }
            ).pipe(map(ress => ress.body));
    }

    public get<T>(url: string, httpParams?: HttpParams): Observable<T> {
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL');
        }
        return this
            .httpClient
            .get<T>(this.baseUrl + url,
                {
                    headers: HttpTestService.getHeaders(),
                    observe: 'response',
                    params: httpParams
                }
            ).pipe(map(ress => ress.body));
    }

    public post(url: string, data?): Observable<any> {
        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                {headers: HttpTestService.getHeaders()});
    }

    public put(url: string, data?): Observable<any> {
        return this
            .httpClient
            .put(this.baseUrl + url,
                data,
                {headers: HttpTestService.getHeaders()});
    }

    // noinspection JSUnusedGlobalSymbols
    public removeById(url: string, id: number) {
        const slash = url.endsWith('/') ? '' : '/';
        return this.remove(url + slash + id);
    }

    public remove(url: string): Observable<any> {
        return this
            .httpClient
            .delete(this.baseUrl + url,
                {headers: HttpTestService.getHeaders()});
    }

    public doLogin(url, data): Observable<string> {
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<string>(this.baseUrl + url, data, {headers: httpHeaders});
    }

    public doLogin2(url, data): Observable<{ jwt: string }> {
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<{ jwt: string }>(this.baseUrl + url, data, {headers: httpHeaders});
    }

    // noinspection JSUnusedGlobalSymbols
    public postBlob(url: string, data?) {
        const httpHeaders = new HttpHeaders()
            .set('Authorization', this.getAuthToken());

        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                {responseType: 'arraybuffer', headers: httpHeaders}
            );
    }

    public uploadBlob(url: string, formName: string, blob: Blob): Observable<HttpEvent<any>> {
        const fd: FormData = new FormData();
        fd.append('', blob);
        const extraHeaders = {
            Authorization: this.getAuthToken()
        };
        return this
            .httpClient
            .post(this.baseUrl + url, fd, {
                reportProgress: true,
                headers: extraHeaders,
                observe: 'events'
            });
    }

    // noinspection JSMethodCanBeStatic
    private replaceQMark(str: string, replacement: string): string {
        const l = str ? str.length : 0;
        for (let i = 0; i < l; i++) {
            if (str[i] === '?') {
                return str.substring(0, i) + replacement + str.substring(i + 1, l);
            }
        }
        return str;
    }

    private load(conf: any): void {
        const host = window.location.hostname;
        const port = window.location.port ? window.location.port : 80;
        const hostUrl = host + ':' + port;
        let ruleFound = false;
        const rules = conf.urlRules;
        if (rules) {
            const ruleCount = rules.length;
            for (let i = 0; i < ruleCount; i++) {
                rules[i].frontend = this.replaceQMark(rules[i].frontend, host);
                if (rules[i].frontend === hostUrl || rules[i].frontend === host) {
                    rules[i].backend = this.replaceQMark(rules[i].backend, host);
                    this.baseUrl = conf.protocol + rules[i].backend;
                    ruleFound = true;
                    break;
                }
            }
        }
        // if no rule is set
        if (!ruleFound) {
            if (conf.protocol != null && conf.defaultUrl != null) {
                this.baseUrl = conf.protocol + conf.defaultUrl;
            } else {
                // old file format is still valid && supported
                this.baseUrl = conf.baseUrl; // backward compatibility shit (microsoft is shit)
            }
        }
    }


    // noinspection JSUnusedGlobalSymbols
    // noinspection JSMethodCanBeStatic
    public getAuthToken(): string {
        return HttpTestService.getAuthToken();
    }
}

