import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpProgressEvent } from '@angular/common/http';
import { catchError, filter, last, map, share, tap, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfigService } from './app-config.service';

const AUTH_TOKEN = 'auth_token';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    public baseUrl: string;

    constructor(public appConfigSrv: AppConfigService, public httpClient: HttpClient) {}

    static getHeaders() {
        return new HttpHeaders(
            {
                Authorization: this.getAuthToken() || ''
            }
        );
    }

    static getAuthToken(): string {
        return localStorage.getItem(AUTH_TOKEN);
    }

    static setAuthToken(token: string) {
        return localStorage.setItem(AUTH_TOKEN, token);
    }

    public init(): Observable<any> {
        if (this.baseUrl) {
            return of(false);
        }
        // return this.httpClient.get('./config/config.json')
        return this.appConfigSrv.getConfig()
            .pipe(
                // removed share(), as it was a resource leak.
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
                    headers: HttpService.getHeaders(),
                    observe: 'response', params: httpParams
                }
            ).pipe(map(ress => {
                const cr = ress.headers.get('Content-Range');
                const cnt = cr ? +cr.split('/')[1] : 0;
                return { itemCount: cnt, body: ress.body };
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
                    headers: HttpService.getHeaders(),
                    observe: 'response',
                    responseType: 'blob',
                    params: httpParams
                }
            ).pipe(map(ress => ress.body));
    }

    public get<T>(url: string, httpParams?: HttpParams): Observable<T> {
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL: ' + this.baseUrl + url);
        }
        const fullURL = this.baseUrl + url;
        if (fullURL.endsWith('NaN')) {
            throw new Error('Invalid URI: ' + url);
        }
        return this
            .httpClient
            .get<T>(fullURL,
                {
                    headers: HttpService.getHeaders(),
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
                { headers: HttpService.getHeaders() });
    }

    public postHTML(url: string, data?): Observable<any> {
        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                {responseType: 'text', headers: HttpService.getHeaders() });
    }

    public put(url: string, data?): Observable<any> {
        return this
            .httpClient
            .put(this.baseUrl + url,
                data,
                { headers: HttpService.getHeaders() });
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
                { headers: HttpService.getHeaders() });
    }

    public doLogin(url, data): Observable<string> {
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<string>(this.baseUrl + url, data, { headers: httpHeaders });
    }

    public doLogin2(url, data): Observable<{ jwt: string }> {
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<{ jwt: string }>(this.baseUrl + url, data, { headers: httpHeaders });
    }

    // noinspection JSUnusedGlobalSymbols
    public postBlob(url: string, data?): Observable<ArrayBuffer> {
        const httpHeaders = new HttpHeaders()
            .set('Authorization', this.getAuthToken());

        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                { responseType: 'arraybuffer', headers: httpHeaders }
            );
    }


    public uploadBlob(url: string, formName: string, blob: Blob): Observable<any> {
        const fd: FormData = new FormData();
        fd.append(formName, blob);
        const extraHeaders = {
            Authorization: this.getAuthToken()
        };
        return this
            .httpClient
            .post(this.baseUrl + url, fd, {
                reportProgress: true,
                headers: extraHeaders,
                observe: 'events'
            })
            .pipe(
                catchError(e => { throw e; }),
                filter((e: HttpEvent<any>) => e.type === HttpEventType.UploadProgress),
                tap((e: HttpProgressEvent) => {
                    // todo: show some ui bullshit instead of this
                    console.log('upload ' + (e.loaded * 100 / e.total) + '%');
                }),
                last()
            );
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
        console.log('Backend: ', this.baseUrl);
    }

    // noinspection JSUnusedGlobalSymbols
    // noinspection JSMethodCanBeStatic
    public updateAuthToken(token: string): void {
        localStorage.setItem(AUTH_TOKEN, token);
    }

    // noinspection JSUnusedGlobalSymbols
    // noinspection JSMethodCanBeStatic
    public getAuthToken(): string {
        return HttpService.getAuthToken();
    }
}

