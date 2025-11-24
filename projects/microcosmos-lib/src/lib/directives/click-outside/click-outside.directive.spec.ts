import { Component } from '@angular/core';
import { createComponent } from '../../../testing/utils/create-component';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  template: `
    <div id="inside"
         mcsClickOutside
         [mcsClickOutsideDisabled]="disabled"
         [mcsClickOutsideStopPropagation]="stopPropagation"
         (mcsClickOutside)="onOutside()"
         (mcsEscape)="onEscape()">
      Inside
    </div>
    <div id="outside">Outside</div>
  `,
  standalone: true,
  imports: [ ClickOutsideDirective ],
})
class HostComponent {
  disabled = false;
  stopPropagation = false;
  outsideTriggered = false;
  escapeTriggered = false;

  onOutside() {
    this.outsideTriggered = true;
  }

  onEscape() {
    this.escapeTriggered = true;
  }
}

describe('ClickOutsideDirective', () => {
  let hostComponent: HostComponent;
  let host: HTMLElement;
  let insideElement: HTMLElement;
  let outsideElement: HTMLElement;

  beforeEach(async () => {
    ({ component: hostComponent, host } = await createComponent(HostComponent));
    insideElement = host.querySelector('#inside') as HTMLElement;
    outsideElement = host.querySelector('#outside') as HTMLElement;
  });

  it('should emit mcsClickOutside when clicking outside', () => {
    hostComponent.outsideTriggered = false;
    document.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(hostComponent.outsideTriggered).toBeTrue();
  });

  it('should NOT emit mcsClickOutside when clicking inside', () => {
    hostComponent.outsideTriggered = false;
    insideElement.click();
    expect(hostComponent.outsideTriggered).toBeFalse();
  });

  it('should emit mcsEscape when Escape key is pressed', () => {
    hostComponent.escapeTriggered = false;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(hostComponent.escapeTriggered).toBeTrue();
  });
});

