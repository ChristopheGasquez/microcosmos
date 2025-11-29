import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThrottleClickDirective } from './throttle-click.directive';

@Component({
  template: `
    <button [mcsThrottleClickDelay]="delay"
            (mcsThrottleClick)="onThrottled($event)">
      Test Button
    </button>
  `,
  standalone: true,
  imports: [ ThrottleClickDirective ],
})
class TestHostComponent {
  delay = 500;
  throttledEvents: Event[] = [];

  onThrottled(event: Event) {
    this.throttledEvents.push(event);
  }
}

describe('ThrottleClickDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestHostComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    button = fixture.nativeElement.querySelector('button');

    fixture.detectChanges();
  });

  it('should create the host component and directive', () => {
    expect(component).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should emit only one event when multiple clicks happen within throttle delay', fakeAsync(() => {
    button.click();
    button.click();
    button.click();

    tick(10);

    expect(component.throttledEvents.length).toBe(1);
  }));

  it('should emit a second event after throttle delay has passed', fakeAsync(() => {
    button.click();
    tick(10);

    button.click();
    tick(400);

    expect(component.throttledEvents.length).toBe(1);

    tick(100);
    button.click();
    tick(1);

    expect(component.throttledEvents.length).toBe(2);
  }));

  it('should update throttle delay when input changes', fakeAsync(() => {
    component.delay = 1000;
    fixture.detectChanges();

    button.click();
    tick(10);

    button.click();
    tick(500);

    expect(component.throttledEvents.length).toBe(1);

    tick(500);
    button.click();
    tick(1);

    expect(component.throttledEvents.length).toBe(2);
  }));
});

