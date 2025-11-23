import { createComponent } from '../../../testing/utils/create-component';
import { getClasses, expectHostClasses } from '../../../testing/utils';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from '../button/button.component';
import { Colors, COLORS, Variants } from '../../constants';
import { VARIANTS } from '../../constants/variants';
import { Component } from '@angular/core';

@Component({
  template: `
    <mcs-button-group [color]="color"
                      [variant]="variant"
                      [rounded]="rounded"
                      [elevated]="elevated"
                      [disabled]="disabled">
      <mcs-button>One</mcs-button>
      <mcs-button>Two</mcs-button>
      <mcs-button>Three</mcs-button>
    </mcs-button-group>
  `,
  imports: [ButtonGroupComponent, ButtonComponent],
  standalone: true,
})
class TestHostComponent {
  color: Colors = COLORS.BRAND;
  variant: Variants = VARIANTS.FILLED;
  rounded: boolean = true;
  elevated: boolean = false;
  disabled: boolean = false;
}

describe('ButtonGroupComponent', () => {
  let fixture: any;
  let hostComponent: TestHostComponent;
  let host: HTMLElement;
  let groupInstance: ButtonGroupComponent;

  beforeEach(async () => {
    ({ fixture, component: hostComponent, host } = await createComponent(TestHostComponent));

    groupInstance = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create the ButtonGroupComponent instance', () => {
    expect(groupInstance).toBeTruthy();
  });

  it('should have static class "mcs-button-group"', () => {
    expect(getClasses(host.querySelector('mcs-button-group')!).has('mcs-button-group')).toBeTrue();
  });

  it('should detect projected mcs-button children', () => {
    expect(groupInstance.buttons.length).toBe(3);
  });

  it('should assign position classes to child buttons', () => {
    const buttons = host.querySelectorAll('mcs-button');

    expect(getClasses(buttons[0]).has('mcs-button--first')).toBeTrue();
    expect(getClasses(buttons[1]).has('mcs-button--middle')).toBeTrue();
    expect(getClasses(buttons[2]).has('mcs-button--last')).toBeTrue();
  });

  it('should inherit values to children according to rules', () => {
    const [one, two, three] = groupInstance.buttons.toArray();

    expect(one.color).toBe(hostComponent.color);
    expect(two.variant).toBe(hostComponent.variant);
    expect(three.rounded).toBe(hostComponent.rounded);
  });

  it('should update host classes when inputs change', () => {
    hostComponent.color = COLORS.CONTRAST;
    hostComponent.variant = VARIANTS.OUTLINED;
    hostComponent.rounded = false;
    hostComponent.elevated = true;
    hostComponent.disabled = true;
    fixture.detectChanges();

    expectHostClasses(host.querySelector('mcs-button-group')!, [
      `mcs-color--${COLORS.CONTRAST}`,
      `mcs-variant--${VARIANTS.OUTLINED}`,
      'mcs-rounded--false',
      'mcs-elevated--true',
      'mcs-disabled--true',
    ]);
  });
});
