import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CENTRAL_POSITIONS, CentralPositions } from '../../constants';
import { McsTooltipDirective } from './tooltip.directive';

@Component({
  template: `
    <button [mcsTooltip]="content"
            [mcsTooltipPosition]="position"
            [mcsTooltipDelay]="delay">Hover me</button>`,
  standalone: true,
  imports: [ McsTooltipDirective ],
})
class TestHostComponent {
  content: string = 'Tooltip text';
  position: CentralPositions = CENTRAL_POSITIONS.TOP;
  delay: number = 0;
}

describe('McsTooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let buttonEl: HTMLButtonElement;
  let directiveInstance: McsTooltipDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestHostComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(By.directive(McsTooltipDirective));
    directiveInstance = debugEl.injector.get(McsTooltipDirective);
    buttonEl = debugEl.nativeElement;
  });

  it('should create the directive instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should not create tooltip if content is empty', fakeAsync(() => {
    hostComponent.content = '';
    fixture.detectChanges();

    buttonEl.dispatchEvent(new Event('mouseenter'));
    tick(1000);
    expect(document.body.querySelector('.mcs-tooltip')).toBeNull();
  }));

  it('should create tooltip on mouseenter/focus', fakeAsync(() => {
    buttonEl.dispatchEvent(new Event('mouseenter'));
    tick();
    let tooltip = document.body.querySelector('.mcs-tooltip') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toContain('Tooltip text');

    // Blur/mouseleave removes tooltip
    buttonEl.dispatchEvent(new Event('mouseleave'));
    tick();
    expect(document.body.querySelector('.mcs-tooltip')).toBeNull();
  }));

  it('should apply position class correctly', fakeAsync(() => {
    hostComponent.position = CENTRAL_POSITIONS.BOTTOM;
    fixture.detectChanges();

    buttonEl.dispatchEvent(new Event('mouseenter'));
    tick();

    const tooltip = document.body.querySelector('.mcs-tooltip') as HTMLElement;
    expect(tooltip.classList.contains('mcs-position--bottom')).toBeTrue();

    buttonEl.dispatchEvent(new Event('mouseleave'));
    tick();
  }));

  it('should respect tooltip delay', fakeAsync(() => {
    hostComponent.delay = 500;
    fixture.detectChanges();

    buttonEl.dispatchEvent(new Event('mouseenter'));
    tick(400);
    expect(document.body.querySelector('.mcs-tooltip')).toBeNull();

    tick(200);
    const tooltip = document.body.querySelector('.mcs-tooltip') as HTMLElement;
    expect(tooltip).toBeTruthy();

    buttonEl.dispatchEvent(new Event('mouseleave'));
    tick(500);
  }));

  afterEach(() => {
    // Nettoyage du DOM
    const tooltip = document.body.querySelector('.mcs-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });
});
