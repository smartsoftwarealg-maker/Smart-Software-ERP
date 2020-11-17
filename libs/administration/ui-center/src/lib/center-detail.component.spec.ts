import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpService, MaterialModule, UserContext} from "@ss/common/api-common";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LanguageTestService} from "../test/language-test.service";
import {HttpTestService} from "../test/http-test.service";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {HarnessLoader} from "@angular/cdk/testing";
import {CommonUiLangModule, LanguageService} from "@ss/common/ui-lang";
import {TestUtils} from "../test/test-utils";
import {MatInputHarness} from "@angular/material/input/testing";
import {CenterDetailComponent} from "@ss/administration/ui-center";
import {Center} from "@ss/administration/api-center";
import {ADDED_DELETED_CENTER, DB_CENTER, UPDATED_CENTER} from "../test/data";
import {MatCheckboxHarness} from "@angular/material/checkbox/testing";
import {MatSelectHarness} from "@angular/material/select/testing";

describe("CenterDetailComponent", () => {

    let component: CenterDetailComponent;
    let fixture: ComponentFixture<CenterDetailComponent>;
    let loader: HarnessLoader;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [CenterDetailComponent],
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
                {provide: LanguageService, useClass: LanguageTestService},
            ]
        });

        fixture = TestBed.createComponent(CenterDetailComponent);

        component = fixture.componentInstance;

        loader = TestbedHarnessEnvironment.loader(fixture);


        component.centerService.setParentId(1);
        // override so no initialisation happens when calling harness components
        component.ngOnInit = () => {
        };

    });

    it("should load funds table", done => {
        component.usersService.context = {company: 1} as UserContext;
        component.preload().subscribe(x => {
            expect(component.funds.length).toBeGreaterThan(0);
            done();
        })
    });

    it("should load banks table", done => {
        component.usersService.context = {company: 1} as UserContext;
        component.preload().subscribe(x => {
            expect(component.banks.length).toBeGreaterThan(0);
            done();
        })
    });


    it("should load center with id 1", done => {
        component.loadEntity(1).subscribe(x => {

            expect(x).toBeDefined();

            done();
        });
    });

    it('should setup form', function () {

        component.form = component.setupForm(DB_CENTER as Center);

        expect(component.form).toBeDefined()
    });

    it("should display form view", () => {
        component.form = component.setupForm(DB_CENTER as Center);
        fixture.detectChanges();
        const formTemplate = fixture.nativeElement.querySelector("form");

        expect(formTemplate).not.toBeNull()
    });

    it('should check that description is required', () => {
        component.form = component.setupForm(DB_CENTER as Center);
        TestUtils.shouldBeInvalidWhenEmpty(fixture, component.form, "description")
    });

    it('should check that address is required', () => {
        component.form = component.setupForm(DB_CENTER as Center);
        TestUtils.shouldBeInvalidWhenEmpty(fixture, component.form, "address")
    });


    it('should update all fields in view and save them', async done => {
        component.usersService.context = {company: 1} as UserContext;
        component.preload().subscribe(async x => {
            expect(component.funds.length).toBeGreaterThan(0);
            component.form = component.setupForm(DB_CENTER as Center);
            fixture.detectChanges()

            const inputs = await loader.getAllHarnesses(MatInputHarness)

            for (const input of inputs) {
                const type: string = await input.getType();
                const host = await input.host();

                const name = await host.getAttribute("formControlName");


                if (type === "text") {
                    await input.setValue("upd");
                } else if (type === "email") {
                    await input.setValue("upd@email.com");
                } else {
                    await input.setValue("999");
                }

                if (name === "abbreviation") {
                    await input.setValue("U");
                }

            }

            const checkboxHarnesses = await loader.getAllHarnesses(MatCheckboxHarness)

            for (const input of checkboxHarnesses) {
                const host = await input.host();
                await input.check();
            }


            const selectHarnesses = await loader.getAllHarnesses(MatSelectHarness);
            for (const x of selectHarnesses) {
                await x.open();
                let options = await x.getOptions();
                await options[options.length - 1].click()
                await x.close()
            }


            expect(component.form.value).toStrictEqual(UPDATED_CENTER);

            component.entitySrv.update(component.form.value)
                .subscribe(updated => {

                    component.entitySrv.get(component.form.value.id)
                        .subscribe(loaded => {
                            delete component.form.value["parentId"];
                            expect(loaded).toStrictEqual(component.form.value)
                            component.entitySrv.update(DB_CENTER as Center)
                                .subscribe(d => {
                                    done();
                                })
                        })
                })

        })
    });

    it('should add and delete an center', done => {
        component.entitySrv.add(ADDED_DELETED_CENTER as Center)
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

