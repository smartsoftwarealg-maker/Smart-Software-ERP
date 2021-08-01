import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { of } from 'rxjs';

const AUTH_TOKEN = 'auth_token';

@Injectable({ providedIn: 'root' })
export class HttpService {
    public baseUrl: string;

    constructor(public httpClient: HttpClient) {
    }

    static getHeaders() {
        return new HttpHeaders(
            {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: this.getAuthToken() || ''
            });
    }

    static getAuthToken(): string {
        return localStorage.getItem(AUTH_TOKEN);
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

    public isReady(): boolean {
        return this.baseUrl != null;
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public getData<T>(url: string, page: number, size: number,
        filter?: string, sortBy?: string): Observable<{ body: T[], itemCount: number }> {
        let params = new HttpParams().set('page', `${page}-${size}`);
        if (filter) {
            params = params.set('filter', filter);
        }
        if (sortBy) {
            params = params.set('sort', sortBy);
        }
        return this.get0<T>(url, params);
    }

    public get<T>(url: string, httpParams?: HttpParams): Observable<T> {
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL');
        }
        return this
            .httpClient
            .get<T>(this.baseUrl + url,
                {
                    headers: HttpService.getHeaders(),
                    observe: 'response', params: httpParams
                }
            ).pipe(map(ress => ress.body));
    }

    private get0<T>(url: string, httpParams?: HttpParams): Observable<{ body: T[], itemCount: number }> {
        if (this.baseUrl == null || url == null) {
            throw new Error('Invalid URL');
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
                const count = cr ? +cr.split('/')[1] : 0;
                return { body: ress.body, itemCount: count };
            }));
    }

    // public load() {
    //   this.httpClient
    //     .get('./config/config.json')
    //     .subscribe(res => this.baseUrl = res['baseUrl']);
    // }

    //public sget<T>(url: string, selector: string, httpParams?: HttpParams): Observable<T> {
    //    return this
    //        .httpClient
    //        .get<T>(this.baseUrl + url,
    //            { headers: HttpService.getHeaders(), observe: 'response', params: httpParams })
    //        .pipe(map(ress => {
    //            const cr = ress.headers.get('Content-Range');
    //            this.itemCount = cr ? +cr.split('/')[1] : 0;
    //            return ress.body[selector];
    //        }));
    //}

    public post(url: string, data?): Observable<any> {
        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                { headers: HttpService.getHeaders() });
    }

    public put(url: string, data?): Observable<any> {
        return this
            .httpClient
            .put(this.baseUrl + url,
                data,
                { headers: HttpService.getHeaders() });
    }

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
        const httpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
        return this.httpClient.post<string>(this.baseUrl + url, data, { headers: httpHeaders });
    }

    public doLogin2(url, data): Observable<{ jwt: string }> {
        const httpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
        return this.httpClient.post<{ jwt: string }>(this.baseUrl + url, data, { headers: httpHeaders });
    }

    public getBlob(url): Observable<HttpResponse<Blob>> {
        return this.httpClient.get(this.baseUrl + url,
            {
                responseType: 'blob',
                observe: 'response',
                headers: new HttpHeaders()
                    .set('Access-Control-Allow-Origin', '*')
                    .set('Authorization', this.getAuthToken())
            });
    }

    public postBlob(url: string, data?) {
        const httpHeaders = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', this.getAuthToken());

        return this
            .httpClient
            .post(this.baseUrl + url,
                data,
                { responseType: 'arraybuffer', headers: httpHeaders }
            );
    }

    public upload(url: string, fd: FormData): Observable<HttpEvent<any>> {
        const extraHeaders = {
            'Access-Control-Allow-Origin': '*',
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
//        console.log('Backend: ', this.baseUrl);
    }

    public updateAuthToken(token: string): void {
        localStorage.setItem(AUTH_TOKEN, token);
    }

    public getAuthToken(): string {
        return HttpService.getAuthToken();
    }
}

