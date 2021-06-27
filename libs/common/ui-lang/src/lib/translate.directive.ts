import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {takeUntil } from 'rxjs/operators';
import {BaseDirective} from './internal/base-directive';
import {LanguageService} from '@ss/common/api-common';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[l10nTranslate],[translate]'
})
export class TranslateDirective extends BaseDirective implements OnInit {

    @Input() set l10nTranslate(params: any) {
        this.params = params;
    }

    @Input() set translate(params: any) {
        this.params = params;
    }

    @Input() public params: any;

    constructor(protected languageService: LanguageService, protected el: ElementRef, protected renderer: Renderer2) {
        super(el, renderer);
    }

    ngOnInit(): void {
        super.ngOnInit();
        // this.replace();
    }

    protected setup(): void {
        this.languageService.languageChange.pipe(takeUntil(this.destroy)).subscribe(
            () => { this.replace(); }
        );
    }

    protected replace(): void {
        this.replaceText();
        this.replaceAttributes();
    }

    protected replaceText(): void {
        if (!!this.key) {
            this.setText(this.getValue(this.key));
        }
    }

    protected replaceAttributes(): void {
        if (this.attributes.length > 0) {
            const keys: string[] = this.getAttributesKeys();
            const data: any = this.languageService.translateAll(keys, this.params);
            this.setAttributes(data);
        }
    }

    protected getValue(key: string): string {
        return this.languageService.translate(key, this.params);
    }

}
