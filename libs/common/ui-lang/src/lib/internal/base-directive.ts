import {
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy, OnInit, Injectable, Directive,
  input
} from '@angular/core';
import { Subject } from 'rxjs';

import { BFS } from './bfs';

@Directive()
export abstract class BaseDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    // tslint:disable-next-line:no-input-rename
    public readonly valueAttribute = input<string>(undefined, { alias: "value" });

    // tslint:disable-next-line:no-input-rename
    public readonly innerHTMLProperty = input<string>(undefined, { alias: "innerHTML" });

    protected key: string;
    protected attributes: any[] = [];

    protected destroy: Subject<boolean> = new Subject<boolean>();

    private element: any;
    private renderNode: any;
    private nodeValue: string;

    private textObserver: MutationObserver;

    private readonly TEXT_MUTATION_CONFIG: any = { subtree: true, characterData: true };

    private readonly SELECTOR: RegExp = /^l10n-/;

    constructor(protected el: ElementRef, protected renderer: Renderer2) { }

    ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        if (this.el && this.el.nativeElement) {
            this.element = this.el.nativeElement;
            this.renderNode = BFS.getTargetNode(this.element);
            this.getKey();
            this.getAttributes();
            this.addTextListener();
            this.setup();
            this.replace();
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!!this.key) {
            if (this.nodeValue == null || this.nodeValue === '') {
                const valueAttribute = this.valueAttribute();
                const innerHTMLProperty = this.innerHTMLProperty();
                if (!!valueAttribute) {
                    this.key = valueAttribute;
                } else if (!!innerHTMLProperty) {
                    this.key = innerHTMLProperty;
                }
            }
            this.replaceText();
        }
        if (this.attributes.length > 0) {
            this.replaceAttributes();
        }
    }

    public ngOnDestroy(): void {
        this.destroy.next(true);
        this.removeTextListener();
    }

    protected abstract setup(): void;

    protected abstract replace(): void;

    protected abstract replaceText(): void;

    protected abstract replaceAttributes(): void;

    protected getAttributesData(): any {
        const keys: string[] = this.getAttributesKeys();
        const data: any = {};
        for (const key of keys) {
            data[key] = this.getValue(key);
        }
        return data;
    }

    protected getAttributesKeys(): string[] {
        return this.attributes.map((attr: any) => attr.key);
    }

    protected abstract getValue(key: string): string;

    protected setText(value: string): void {
        if (!!value) {
            if (!!this.nodeValue && !!this.key) {
                this.removeTextListener();
                this.renderer.setValue(this.renderNode, this.nodeValue.replace(this.key, value));
                this.addTextListener();
            } else if (!!this.valueAttribute()) {
                this.renderer.setAttribute(this.element, 'value', value);
            } else if (!!this.innerHTMLProperty()) {
                this.renderer.setProperty(this.element, 'innerHTML', value);
            }
        }
    }

    protected setAttributes(data: any): void {
        for (const attr of this.attributes) {
            this.renderer.setAttribute(this.element, attr.name, data[attr.key]);
        }
    }

    private addTextListener(): void {
        if (typeof MutationObserver !== 'undefined') {
            this.textObserver = new MutationObserver((mutations: MutationRecord[]) => {
                this.renderNode = BFS.getTargetNode(this.element);
                this.getKey();
                this.replaceText();
            });
            this.textObserver.observe(this.renderNode, this.TEXT_MUTATION_CONFIG);
        }
    }

    private removeTextListener(): void {
        if (typeof this.textObserver !== 'undefined') {
            this.textObserver.disconnect();
        }
    }

    private getText(): string {
        this.nodeValue = this.renderNode != null ? this.renderNode.nodeValue as string : '';
        return !!this.nodeValue ? this.nodeValue.trim() : '';
    }

    private getKey(): void {
        const valueAttribute = this.valueAttribute();
        const innerHTMLProperty = this.innerHTMLProperty();
        if (this.element.childNodes.length > 0) {
            this.key = this.getText();
        } else if (!!valueAttribute) {
            this.key = valueAttribute;
        } else if (!!innerHTMLProperty) {
            this.key = innerHTMLProperty;
        }
    }

    private getAttributes(): void {
        if (this.element.attributes) {
            for (const attr of this.element.attributes) {
                if (attr && this.SELECTOR.test(attr.name)) {
                    const name: string = attr.name.substr(5);
                    for (const targetAttr of this.element.attributes) {
                        if (new RegExp('^' + name + '$').test(targetAttr.name)) {
                            this.attributes.push({ name, key: targetAttr.value });
                        }
                    }
                }
            }
        }
    }

}
