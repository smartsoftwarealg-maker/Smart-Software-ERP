import {AgentDetailComponent} from "@ss/logistics/ui-agent";
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
import {TestUtilsSpec} from "../test/test-utils.spec";
import {MatCheckboxHarness} from "@angular/material/checkbox/testing";
import {MatSelectHarness} from "@angular/material/select/testing";
import {ADDED_DELETED_AGENT, DB_AGENT, UPDATED_AGENT} from "../test/data";
import {MatExpansionPanelHarness} from "@angular/material/expansion/testing";
import {MatInputHarness} from "@angular/material/input/testing";

describe("AgentDetailComponent", () => {

    let component: AgentDetailComponent;
    let fixture: ComponentFixture<AgentDetailComponent>;
    let loader: HarnessLoader;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [AgentDetailComponent],
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

        fixture = TestBed.createComponent(AgentDetailComponent);

        component = fixture.componentInstance;

        loader = TestbedHarnessEnvironment.loader(fixture);

        // override so no initialisation happens when calling harness components
        component.ngOnInit = () => {
        };

    });


    it("should load agentType table", done => {
        component.preload().subscribe(x => {
            expect(component.agentTypes.length).toBeGreaterThan(0)
            done();
        })
    });

    it("should load payMode table", done => {
        component.preload().subscribe(x => {
            expect(component.payModes.length).toBeGreaterThan(0)
            done();
        })
    });

    it("should load activity table", done => {
        component.preload().subscribe(x => {
            expect(component.activities.length).toBeGreaterThan(0)
            done();
        })
    });

    it("should load companyType table", done => {
        component.preload().subscribe(x => {
            expect(component.companyTypes.length).toBeGreaterThan(0)
            done();
        })
    });

    it("should load city table", done => {
        component.preload().subscribe(x => {
            expect(component.cities.length).toBeGreaterThan(0)
            done();
        })
    });

    it("should load country table", done => {
        component.preload().subscribe(x => {
            expect(component.countries.length).toBeGreaterThan(0)
            done();
        })
    });

    it("should load currency table", done => {
        component.preload().subscribe(x => {
            expect(component.currencies.length).toBeGreaterThan(0)
            done();
        })
    });

    it('should load price table', done => {
        component.preload().subscribe(x => {
            expect(component.prices.length).toBeGreaterThan(0)
            done();
        })
    });

    it('should load bank table', done => {
        component.preload().subscribe(x => {
            expect(component.banks.length).toBeGreaterThan(0)
            done();
        })
    });

    it("should load agent with id 1", done => {
        component.loadEntity(1).subscribe(x => {

            expect(x).toBeDefined();

            done();
        });
    });

    it('should setup form', function () {

        component.form = component.setupForm(DB_AGENT);

        expect(component.form).toBeDefined()
    });

    it("should display form view", () => {
        component.form = component.setupForm(DB_AGENT);
        fixture.detectChanges();
        const formTemplate = fixture.nativeElement.querySelector("form");

        expect(formTemplate).not.toBeNull()
    });

    it('should check that customerCode is required', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldBeInvalidWhenEmpty(fixture, component.form, "customerCode")
    });

    it('should check that customerCode is less than maxLength', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldBeInvalidWhenPassMaxLength(fixture, component.form, "customerCode", 14)
    });

    it('should check that denomination is required', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldBeInvalidWhenEmpty(fixture, component.form, "denomination")
    });

    it('should check that price is required', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldBeInvalidWhenEmpty(fixture, component.form, "price")
    });

    it('should check that agentType is required', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldBeInvalidWhenEmpty(fixture, component.form, "agentType")
    });

    it('should check that currency is required', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldBeInvalidWhenEmpty(fixture, component.form, "currency")
    });

    it('should check that email is valid', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldCheckInvalidValues(fixture, component.form, "email", "invalidEmail", "test@test.com")
    });

    it('should check that checkDueDays is valid', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldCheckInvalidValues(fixture, component.form, "checkDueDays", 1.36, 5)
    });

    it('should check that debtTerm is valid', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldCheckInvalidValues(fixture, component.form, "debtTerm", 13.36, 10)
    });

    it('should check that website is valid', () => {
        component.form = component.setupForm(DB_AGENT);
        TestUtilsSpec.shouldCheckInvalidValues(fixture, component.form, "website", "invalidwebsite", "valid.org")
    });

    it("should add primary color to expanded panel", async () => {
        let panels = await loader.getAllHarnesses(MatExpansionPanelHarness);
        for (const panel of panels) {
            await panel.expand();
            const host = await panel.host();
            const hasClass = await host.hasClass("b-primary-expansion-panel");
            expect(hasClass).toBeTruthy();
        }
    })


    it('should update all fields in view and save them', async done => {
        component.preload().subscribe(async () => {
            component.form = component.setupForm(DB_AGENT);
            fixture.detectChanges()

            const inputs = await loader.getAllHarnesses(MatInputHarness)

            for (const input of inputs) {
                const type: string = await input.getType();
                const disabled = await input.isDisabled();
                const host = await input.host();
                const name = await host.getAttribute("formControlName");

                if (!disabled && (type === "text" || type === "email")) {
                    await input.setValue("updated");
                } else if (type === "number") {
                    await input.setValue("999")
                } else {
                    await input.setValue(UPDATED_AGENT[name])
                }

            }

            const checkboxHarnesses = await loader.getAllHarnesses(MatCheckboxHarness);
            for (const x of checkboxHarnesses) {
                await x.uncheck()
            }

            const selectHarnesses = await loader.getAllHarnesses(MatSelectHarness);
            for (const x of selectHarnesses) {
                await x.open();
                let options = await x.getOptions();
                await options[options.length - 1].click()
                await x.close()
            }

            expect(component.form.value).toStrictEqual(UPDATED_AGENT);

            component.entitySrv.update(component.form.value)
                .subscribe(updated => {
                    component.entitySrv.get(component.form.value.id)
                        .subscribe(loaded => {
                            delete loaded["creationTime"];
                            expect(loaded).toStrictEqual(component.form.value)
                            component.entitySrv.update(DB_AGENT)
                                .subscribe(d => {
                                    done();
                                })
                        })
                })

        });
    });


    it('should add and delete an agent', done => {
        component.entitySrv.add(ADDED_DELETED_AGENT)
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

