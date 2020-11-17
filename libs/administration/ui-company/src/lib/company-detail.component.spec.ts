import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpService, MaterialModule} from "@ss/common/api-common";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LanguageTestService} from "../test/language-test.service";
import {HttpTestService} from "../test/http-test.service";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {HarnessLoader} from "@angular/cdk/testing";
import {CommonUiLangModule, LanguageService} from "@ss/common/ui-lang";
import {TestUtils} from '../test/test-utils';
import {ADDED_DELETED_COMPANY, DB_COMPANY, UPDATED_COMPANY} from "../test/data";
import {MatInputHarness} from "@angular/material/input/testing";
import {CompanyDetailComponent} from "@ss/administration/ui-company";
import {Company} from "@ss/administration/api-company";

describe("CompanyDetailComponent", () => {

    let component: CompanyDetailComponent;
    let fixture: ComponentFixture<CompanyDetailComponent>;
    let loader: HarnessLoader;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [CompanyDetailComponent],
            imports: [
                CommonModule,
                MaterialModule,
                CommonUiLangModule,
                UiPaginationModule,
                ReactiveFormsModule,
                RouterTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: HttpService, useClass: HttpTestService},
                {provide: LanguageService, useClass: LanguageTestService}
            ]
        });

        fixture = TestBed.createComponent(CompanyDetailComponent);

        component = fixture.componentInstance;

        loader = TestbedHarnessEnvironment.loader(fixture);

        // override so no initialisation happens when calling harness components
        component.ngOnInit = () => {
        };

    });


    it("should load company with id 37", done => {
        component.loadEntity(37).subscribe(x => {

            expect(x).toBeDefined();

            done();
        });
    });

    it('should setup form', function () {

        component.form = component.setupForm(DB_COMPANY as Company);

        expect(component.form).toBeDefined()
    });

    it("should display form view", () => {
        component.form = component.setupForm(DB_COMPANY as Company);
        fixture.detectChanges();
        const formTemplate = fixture.nativeElement.querySelector("form");

        expect(formTemplate).not.toBeNull()
    });

    it('should check that description is required', () => {
        component.form = component.setupForm(DB_COMPANY as Company);
        TestUtils.shouldBeInvalidWhenEmpty(fixture, component.form, "description")
    });

    it('should check that address1 is required', () => {
        component.form = component.setupForm(DB_COMPANY as Company);
        TestUtils.shouldBeInvalidWhenEmpty(fixture, component.form, "address1")
    });


    it('should update all fields in view and save them', async done => {
        component.form = component.setupForm(DB_COMPANY as Company);
        fixture.detectChanges()

        const inputs = await loader.getAllHarnesses(MatInputHarness)

        for (const input of inputs) {
            const type: string = await input.getType();
            const host = await input.host();

            if (type === "text") {
                await input.setValue("upd");
            } else {
                await input.setValue("999");
            }

            await input.setValue("updt");
        }

        expect(component.form.value).toStrictEqual(UPDATED_COMPANY);

        component.entitySrv.update(component.form.value)
            .subscribe(updated => {
                component.entitySrv.get(component.form.value.id)
                    .subscribe(loaded => {
                        delete component.form.value["parentId"];
                        expect(loaded).toStrictEqual(component.form.value)
                        component.entitySrv.update(DB_COMPANY as Company)
                            .subscribe(d => {
                                done();
                            })
                    })
            })

    });

    it('should add and delete an company', done => {
        component.entitySrv.add(ADDED_DELETED_COMPANY as Company)
            .subscribe(x => {
                expect(x).not.toBeNaN();
                component.entitySrv.remove(x)
                    .subscribe((d: { count: number }) => {
                        expect(d.count).toEqual(1)
                        done();
                    })
            });
    })
});

