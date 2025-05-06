import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { infraRootProvider } from "../../infra/infra.provider";
import { InMemoryRandom } from "../../infra/random/in-memory-random.infra";
import { usecasesProviders } from "../../usecases/usecases.provider";
import { HomeComponent } from "./home.component";
describe("Home", () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let loader: HarnessLoader;

  let userInput: HTMLInputElement;

  let validateInput: HTMLButtonElement;

  let restartButton: HTMLButtonElement;

  it("Example : Submit 2 guesses and win", fakeAsync(async () => {
    // GIVEN
    givenConfiguration();

    // WHEN
    whenComponentInit();
    whenUserSubmitGuess(2);
    whenUserSubmitGuess(3);
    
    // THEN
    expectDisplayOfGuesses(2);
    expectInputToBeEmpty();
    expectInputToBeDisabled(true);
  }));

  it("Example : Restart game after game over", fakeAsync(async () => {
    // GIVEN
    givenConfiguration();

    // WHEN
    whenComponentInit();
    whenUserSubmitGuess(3);
    whenUserHitsRestart();

    // THEN
    expectInputToBeDisabled(false);
    expectDisplayOfGuesses(0);
    
  }));
  
  
  function whenUserSubmitGuess(guess: any) {
    userInput.value = guess;
    userInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    validateInput.click();
    waitForLoading();
  }
  
  function expectInputToBeEmpty() {
    expect(userInput.value).toBe('');
  }

  function expectInputToBeDisabled(expected: boolean) {
    expect(validateInput.disabled).toBe(expected);
    expect(userInput.disabled).toBe(expected);
  }

  function whenComponentInit() {
    component.ngOnInit();
    waitForLoading();
    linkToUI();
  }

  function waitForLoading() {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  function givenConfiguration() {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        infraRootProvider(new InMemoryRandom(0.15)),
        usecasesProviders(),
        provideAnimationsAsync('noop')
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  }

  function linkToUI() {
    userInput = fixture.debugElement.query(By.css('[aria-label="your guess"]')).nativeElement as HTMLInputElement;
    validateInput = fixture.debugElement.query(By.css('[aria-label="send"]')).nativeElement as HTMLButtonElement;
  }
  
  function expectDisplayOfGuesses(guessCount: number) {
    const guessEntries = fixture.debugElement.queryAll(By.css('.guess-entry'));
    expect(guessEntries.length).toBe(guessCount);
  }
  
  function whenUserHitsRestart() {
    restartButton = fixture.debugElement.query(By.css('[aria-label="restart"]')).nativeElement as HTMLButtonElement;
    restartButton.click();
    waitForLoading();
  }

});  

