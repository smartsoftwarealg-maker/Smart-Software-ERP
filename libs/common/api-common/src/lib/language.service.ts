import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, Subject, zip} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Direction} from '@angular/cdk/bidi';
import {HttpClient} from '@angular/common/http';
import {dateStrToDmy, dateStrToYmd, dateToDmyStr, dateToYmdStr, isString, removeTimeForDateStr} from './utils';
import {AppConfigService} from './app-config.service';
import {LoginService} from './login.service';

function formatFullName(first: string, last: string) {
    return (first == null ? '' : first) + (last == null ? '' : (' ' + last));
}

function formatFullNameWeird(first: string, last: string) {
    return (last == null ? '' : last) + (first == null ? '' : (' ' + first));
}

function formatMediumName(first: string, last: string) {
    return (first == null || first.length < 1 ? '' : first.substring(0, 1)) + (last == null ? '' : (' ' + last));
}

export interface Language {
    code: string;
    dir: string;
    name: string;
    formatDate: (d: Date) => string;
    formatDateStr: (d: string) => string;
    formatFullName: (first: string, family: string) => string;
    formatMediumName: (first: string, family: string) => string;
    decimalPoint: string,
    thousandSeparator: string;
    // todo: add support for datetime
}

export const DEFAULT_SUPPORTED_LANGUAGES: Language[] = [
    {
        code: 'ar',
        dir: 'rtl',
        name: 'العربية',
        formatDate: dateToYmdStr,
        formatDateStr: dateStrToYmd,
        formatFullName: formatFullName,
        formatMediumName: formatMediumName,
        decimalPoint: '.',
        thousandSeparator: ','
    },
    {
        code: 'en',
        dir: 'ltr',
        name: 'English',
        formatDate: dateToYmdStr,
        formatDateStr: dateStrToYmd,
        formatFullName: formatFullName,
        formatMediumName: formatMediumName,
        decimalPoint: '.',
        thousandSeparator: ','
    },
    {
        code: 'fr',
        dir: 'ltr',
        name: 'Français',
        formatDate: dateToDmyStr,
        formatDateStr: dateStrToDmy,
        formatFullName: formatFullNameWeird,
        formatMediumName: formatMediumName,
        decimalPoint: ',',
        thousandSeparator: ' '
    }
];

const DEFAULT_LANGUAGE = DEFAULT_SUPPORTED_LANGUAGES[2].code;

interface Source {
    uri: string;
    prefix: string;
    loaded: { [code: string]: boolean; };
}

interface LanguageConfig {
    code: string;
    dir: 'ltr' | 'rtl';
    name: string;
    dateFormat: 'default' | 'fr';
    personFullNameFormat: 'default' | 'fr';
    useBrowserLanguage: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    private static readonly LOCAL_STORAGE_KEY = 'localeCode';
    private static style: HTMLElement = null;
    private readonly RTL_STYLE =
        '.locale-dir { direction: rtl; } ' +
        '.cdk-overlay-pane { direction: rtl !important; } ' +
        '.float-start { float: right; } ' +
        '.float-end { float: left; } ' +
        '.margin-start-0 { margin-right: 0 !important; } ' +
        '.margin-start-4 { margin-right: 4px !important; } ' +
        '.margin-start-8 { margin-right: 8px !important; } ' +
        '.margin-start-16 { margin-right: 16px !important; } ' +
        '.margin-start-24 { margin-right: 24px !important; } ' +
        '.margin-start-32 { margin-right: 32px !important; } ' +
        '.margin-start-40 { margin-right: 40px !important; } ' +
        '.margin-start-48 { margin-right: 48px !important; } ' +
        '.margin-end-0 { margin-left: 0 !important; } ' +
        '.margin-end-4 { margin-left: 4px !important; } ' +
        '.margin-end-8 { margin-left: 8px !important; } ' +
        '.margin-end-16 { margin-left: 16px !important; } ' +
        '.margin-end-24 { margin-left: 24px !important; } ' +
        '.margin-end-32 { margin-left: 32px !important; } ' +
        '.margin-end-40 { margin-left: 40px !important; } ' +
        '.margin-end-48 { margin-left: 48px !important; } ' +
        //
        '.padding-start-0 { padding-right: 0 !important; } ' +
        '.padding-start-4 { padding-right: 4px !important; } ' +
        '.padding-start-8 { padding-right: 8px !important; } ' +
        '.padding-start-16 { padding-right: 16px !important; } ' +
        '.padding-start-24 { padding-right: 24px !important; } ' +
        '.padding-start-32 { padding-right: 32px !important; } ' +
        '.padding-start-40 { padding-right: 40px !important; } ' +
        '.padding-start-48 { padding-right: 48px !important; } ' +
        '.padding-end-0 { padding-left: 0 !important; } ' +
        '.padding-end-4 { padding-left: 4px !important; } ' +
        '.padding-end-8 { padding-left: 8px !important; } ' +
        '.padding-end-16 { padding-left: 16px !important; } ' +
        '.padding-end-24 { padding-left: 24px !important; } ' +
        '.padding-end-32 { padding-left: 32px !important; } ' +
        '.padding-end-40 { padding-left: 40px !important; } ' +
        '.padding-end-48 { padding-left: 48px !important; } ' +
        //
        '.abs-start-0 { right: 0; }' +
        '.abs-end-0 { left: 0; }' +
        // right only, fixing mat shit
        '.mat-step-icon { margin-left: 12px !important; margin-right: 0 !important; } ' +
        '.mat-stepper-vertical-line::before { left: unset !important; right: 0 !important; } ' +
        '.mat-vertical-content-container { margin-right: 36px !important; margin-left: unset !important; } ' +
        '.mat-option { text-align: start !important; }';

    private readonly LTR_STYLE =
        '.locale-dir { direction: ltr; } ' +
        '.cdk-overlay-pane { direction: ltr !important;} ' +
        '.float-start { float: left; } ' +
        '.float-end { float: right; } ' +
        '.margin-start-0 { margin-left: 0 !important; } ' +
        '.margin-start-4 { margin-left: 4px !important; } ' +
        '.margin-start-8 { margin-left: 8px !important; } ' +
        '.margin-start-16 { margin-left: 16px !important; } ' +
        '.margin-start-24 { margin-left: 24px !important; } ' +
        '.margin-start-32 { margin-left: 32px !important; } ' +
        '.margin-start-40 { margin-left: 40px !important; } ' +
        '.margin-start-48 { margin-left: 48px !important; } ' +
        '.margin-end-0 { margin-right: 0 !important; } ' +
        '.margin-end-4 { margin-right: 4px !important; } ' +
        '.margin-end-8 { margin-right: 8px !important; } ' +
        '.margin-end-16 { margin-right: 16px !important; } ' +
        '.margin-end-24 { margin-right: 24px !important; } ' +
        '.margin-end-32 { margin-right: 32px !important; } ' +
        '.margin-end-40 { margin-right: 40px !important; } ' +
        '.margin-end-48 { margin-right: 48px !important; } ' +
        //
        '.padding-start-0 { padding-left: 0 !important; } ' +
        '.padding-start-4 { padding-left: 4px !important; } ' +
        '.padding-start-8 { padding-left: 8px !important; } ' +
        '.padding-start-16 { padding-left: 16px !important; } ' +
        '.padding-start-24 { padding-left: 24px !important; } ' +
        '.padding-start-32 { padding-left: 32px !important; } ' +
        '.padding-start-40 { padding-left: 40px !important; } ' +
        '.padding-start-48 { padding-left: 48px !important; } ' +
        '.padding-end-0 { padding-right: 0 !important; } ' +
        '.padding-end-4 { padding-right: 4px !important; } ' +
        '.padding-end-8 { padding-right: 8px !important; } ' +
        '.padding-end-16 { padding-right: 16px !important; } ' +
        '.padding-end-24 { padding-right: 24px !important; } ' +
        '.padding-end-32 { padding-right: 32px !important; } ' +
        '.padding-end-40 { padding-right: 40px !important; } ' +
        '.padding-end-48 { padding-right: 48px !important; } ' +
        //
        '.abs-start-0 { left: 0; }' +
        '.abs-end-0 { right: 0; }';

    public rtl = true;
    public languages: Language[];
    public defaultLanguage: string;
    private currentLanguage: Language;
    private sources: Source[] = [];
    private data: { [code: string]: { [key: string]: string; }; } = {};
    private changeSubject = new Subject<string>();

    public get languageChange(): Observable<string> {
        return this.changeSubject;
    }

    public get dir(): Direction {
        return this.rtl ? 'rtl' : 'ltr';
    }

    public get lang(): string {
        return  this.currentLanguage?.code;
    }

    constructor(private appConfigSrv: AppConfigService,
                private httpClient: HttpClient,
                private loginSrv: LoginService) {
        this.languages = DEFAULT_SUPPORTED_LANGUAGES;
        this.defaultLanguage = DEFAULT_LANGUAGE;
    }

    public init(): Observable<void> {
        return this
            .appConfigSrv
            .getConfig()
            .pipe(switchMap(conf => this.setLanguage(this.parseConfig(conf))));
    }

    /**
     * parses the config to read any language related settings
     * @param conf confing set on the server
     * @returns the default language code
     */
    private parseConfig(conf: any): string {
        // reset
        this.languages = DEFAULT_SUPPORTED_LANGUAGES;
        this.defaultLanguage = DEFAULT_LANGUAGE;
        // parse default
        if (conf.defaultLanguage) {
            this.defaultLanguage = conf.defaultLanguage;
        }
        // parse language list
        if (conf.languages != null && conf.languages instanceof Array && conf.languages.length > 0) {
            this.languages = conf.languages.map((l: LanguageConfig) => this.parseLangConfig(l as LanguageConfig));
        }
        if (typeof conf.useBrowserLanguage === 'boolean' && conf.useBrowserLanguage) {
            // update default language to browser default
            let browserLang = navigator.language;
            if (browserLang) {
                if (browserLang.length > 2) {
                    browserLang = browserLang.substring(0, 2);
                }
                browserLang = this.validCodeOrNull(browserLang);
                if (browserLang) {
                    this.defaultLanguage = browserLang;
                }
            }
        }
        // select default language
        let code = this.validCodeOrNull(localStorage.getItem(LanguageService.LOCAL_STORAGE_KEY));
        if (!code) {
            code = this.validCodeOrNull(this.defaultLanguage);
        }
        if (!code) {
            code = this.validCodeOrNull(DEFAULT_LANGUAGE);
        }
        if (!code) {
            code = this.languages[0].code;
        }
        this.addStyleClass(code);
        return code;
    }

    private parseLangConfig(conf: LanguageConfig): Language {
        if (!conf.code) {
            throw new Error('Invalid Config, Language code cannot be null or empty');
        }
        if (!conf.name) {
            throw new Error('Invalid Config, Language name cannot be null or empty');
        }
        if (conf.dir !== 'rtl' && conf.dir !== 'ltr') {
            throw new Error('Invalid Config, Language direction must be \'rtl\' or \'ltr\'');
        }
        const lang: Language = {
            name: conf.name,
            code: conf.code,
            dir: conf.dir,
            formatDate: dateToYmdStr,
            formatDateStr: dateStrToYmd,
            formatFullName: formatFullName,
            formatMediumName: formatMediumName,
            decimalPoint: DEFAULT_SUPPORTED_LANGUAGES.filter(e => e.code === conf.code).map(e => e.decimalPoint)[0] || '.',
            thousandSeparator: DEFAULT_SUPPORTED_LANGUAGES.filter(e => e.code === conf.code).map(e => e.thousandSeparator)[0] || ','
        };
        if (conf.dateFormat === 'fr') {
            lang.formatDate = dateToDmyStr;
            lang.formatDateStr = dateStrToDmy;
        }
        if (conf.personFullNameFormat === 'fr') {
            lang.formatFullName = formatFullNameWeird;
            lang.formatMediumName = formatMediumName;
        }
        return lang;
    }

    private validCodeOrNull(code: string): string {
        if (!code) return null;
        const lang = this.languages.filter(l => l.code === code);
        return lang.length > 0 ? lang[0].code : null;
    }

    private load(src: Source): Observable<boolean> {
        if (this.currentLanguage == null || src.loaded[this.currentLanguage.code]) {
            return of(false);
        }
        this.sources.push(src);
        return this.httpClient
            .get<{ [key: string]: string; }>(src.uri + this.currentLanguage.code + '.json')
            .pipe(
                map((conf: { [key: string]: string; }) => {
                    src.loaded[this.currentLanguage.code] = true;
                    this.pushData(conf, src.prefix);
                    return true;
                }),
                catchError(err => {
                    throw err;
                }),
                catchError(err => {
                    throw err;
                }),
            );
    }

    private loadMissing(): Observable<boolean[]> {
        return this.sources.length
            ? forkJoin(this.sources.map(src => this.load(src)))
            : of([]);
    }

    private pushData(segment: { [key: string]: string; }, prefix: string) {
        let lang = this.data[this.currentLanguage.code];
        if (lang == null) {
            lang = {};
            this.data[this.currentLanguage.code] = lang;
        }
        for (const key in segment) {
            if (segment.hasOwnProperty(key)) {
                lang[prefix + key] = segment[key];
            }
        }
        this.changeSubject.next(this.currentLanguage.code);
    }

    public addSources(sources: string[][]): Observable<boolean[]> {
        const res = sources.filter(s => this.sources.map(e => e.uri).find(uri => s) === undefined);
        return zip(res.map(s => this.load({uri: s[0], loaded: {}, prefix: s[1]})));
    }

    public addSource(uri: string, prefix: string): void {
        if (this.sources.filter(s => s.uri === uri).length === 0) {
            const src: Source = {uri, loaded: {}, prefix};
            this.load(src).subscribe();
        }
        // return this.load(src);
    }

    public setLanguage(code: string): Observable<void> {
        const lang = this.languages.filter(l => l.code === code)[0];
        if (!lang) {
            throw new Error('Unknown language code "' + code + '"');
        }
        this.currentLanguage = lang;
        localStorage.setItem(LanguageService.LOCAL_STORAGE_KEY, code);
        this.updateDirection(code);
        return this.loadMissing()
            .pipe(
                switchMap(_ => this.loginSrv.setLanguage(code)),
                switchMap(() => {
                    this.changeSubject.next(code);
                    return of(null);
                }),
            );
    }

    public translateAll(keys: string[], param?: any) {
        return keys.map(k => this.translate(k, param));
    }

    public translate(key: string, param?: any): string {
        if (key == null || key === '') {
            return '';
        }
        if (this.currentLanguage == null) {
            return key;
        }
        const langData = this.data[this.currentLanguage.code];
        if (langData != null) {
            let val = langData[key];
            if (val != null) {
                if (param != null) {
                    for (const property in param) {
                        if (param.hasOwnProperty(property)) {
                            const propertyValue = param[property];
                            const propertyKey = '$' + property + '$';
                            val = val.replace(propertyKey, propertyValue);
                        }
                    }
                }
                return val;
            }
        }
        return key;
    }

    public formatDate(d: Date | string): string {
        if (d == null || this.currentLanguage == null) {
            return null;
        }
        if (d instanceof Date) {
            return this.currentLanguage.formatDate(d);
        }
        if (isString(d)) {
            return this.currentLanguage.formatDateStr(removeTimeForDateStr(d));
        }
        throw new Error('Can only format Date or string');
    }

    public formatFullName(first: string, last: string): string {
        return this.currentLanguage == null ? null : this.currentLanguage.formatFullName(first, last);
    }

    public formatMediumName(first: string, last: string): string {
        return this.currentLanguage == null ? null : this.currentLanguage.formatMediumName(first, last);
    }

    public formatPaymonth(paymonth: number): string {
        if (!paymonth || paymonth <= 0) {
            return '';
        }
        return this.translate(this.MONTHS[paymonth % 100]) + ' ' + Math.floor(paymonth / 100);
    }

    // privates

    private addStyleClass(code: string): void {
        if (LanguageService.style == null) {
            LanguageService.style = document.createElement('style');
            // LanguageService.style.type = 'text/css';
            this.updateDirection(code);
            document.getElementsByTagName('head')[0].appendChild(LanguageService.style);
        }
    }

    private updateDirection(code: string): void {
        let validCode = this.validCodeOrNull(code);
        if (validCode == null) {
            validCode = this.defaultLanguage;
        }
        const a = this.languages.filter(l => l.code === validCode);
        if (a.length !== 1) {
            throw new Error('Unknown language code "' + code + '"');
        }
        const dir = a[0].dir;
        if (LanguageService.style) {
            if (dir === 'ltr') {
                LanguageService.style.innerHTML = this.LTR_STYLE;
                this.rtl = false;
            } else {
                LanguageService.style.innerHTML = this.RTL_STYLE;
                this.rtl = true;
            }
        }
    }

    parseNumber(input: string): number {
        const str = input || '0';
        return +str.split(this.currentLanguage.thousandSeparator).join('')
            .split(this.currentLanguage.decimalPoint).join('.');
    }


}
