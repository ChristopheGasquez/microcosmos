import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TitleComponent } from './title.component';
import { COLORS, WEIGHT, TEXT_ALIGN, TextAlign, Weight, Colors } from '../../constants';
import { getClasses } from '../../../testing/utils/get-classes';

@Component({
  template: `
    <mcs-h1 [color]="color"
            [weight]="weight"
            [align]="align"
            [ellipsis]="ellipsis">
      Hello World
    </mcs-h1>
  `,
  imports: [TitleComponent],
  standalone: true,
})
class TestHostComponent {
  color:Colors = COLORS.INK;
  weight: Weight = WEIGHT.REGULAR;
  align: TextAlign = TEXT_ALIGN.START;
  ellipsis: boolean = true;
}

describe('TitleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let titleInstance: TitleComponent;
  let titleHost: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    const titleDebug = fixture.debugElement.query(By.directive(TitleComponent));
    titleInstance = titleDebug.componentInstance;
    titleHost = titleDebug.nativeElement;
  });

  it('should create the TitleComponent instance', () => {
    expect(titleInstance).toBeTruthy();
  });

  it('should render content inside the correct heading level', () => {
    const heading = titleHost.querySelector('h1');
    expect(heading).withContext('should render h1 by default').not.toBeNull();
    expect(heading?.textContent?.trim()).toBe('Hello World');
  });

  it('should apply default host classes', () => {
    const classes = getClasses(titleHost);
    expect(classes.has('mcs-title--h1')).toBeTrue();
    expect(classes.has(`mcs-color--${COLORS.INK}`)).toBeTrue();
    expect(classes.has(`mcs-weight--${WEIGHT.REGULAR}`)).toBeTrue();
    expect(classes.has(`mcs-ellipsis--true`)).toBeTrue();
    expect(classes.has(`mcs-text-align--${TEXT_ALIGN.START}`)).toBeTrue();
  });

  it('should update classes when inputs change', () => {
    hostComponent.color = COLORS.BRAND;
    hostComponent.weight = WEIGHT.BOLD;
    hostComponent.align = TEXT_ALIGN.CENTER;
    hostComponent.ellipsis = false;
    fixture.detectChanges();

    const classes = getClasses(titleHost);
    expect(classes.has(`mcs-color--${COLORS.BRAND}`)).toBeTrue();
    expect(classes.has(`mcs-weight--${WEIGHT.BOLD}`)).toBeTrue();
    expect(classes.has(`mcs-ellipsis--false`)).toBeTrue();
    expect(classes.has(`mcs-text-align--${TEXT_ALIGN.CENTER}`)).toBeTrue();
  });
});
