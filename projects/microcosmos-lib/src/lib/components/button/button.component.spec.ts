import { getClasses, expectHostClasses, expectHostClassesAbsent } from '../../../testing/utils';
import { createComponent } from '../../../testing/utils/create-component';
import { ButtonComponent } from './button.component';
import { COLORS } from '../../constants';
import { VARIANTS } from '../../constants/variants';

describe('ButtonComponent', () => {
  let fixture: any;
  let component: ButtonComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(ButtonComponent));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-button"', () => {
    expect(getClasses(host).has('mcs-button')).toBeTrue();
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [
      `mcs-color--${COLORS.BRAND}`,
      `mcs-variant--${VARIANTS.FILLED}`,
      'mcs-rounded--true',
      'mcs-elevated--false',
      'mcs-disabled--false',
      'mcs-focused--false',
      'mcs-active--false',
    ]);
  });

  it('should update host classes when inputs change', () => {
    component.color = COLORS.INK;
    component.variant = VARIANTS.OUTLINED;
    component.rounded = false;
    component.elevated = true;
    component.disabled = true;
    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-color--${COLORS.INK}`,
      `mcs-variant--${VARIANTS.OUTLINED}`,
      'mcs-rounded--false',
      'mcs-elevated--true',
      'mcs-disabled--true',
    ]);

    expectHostClassesAbsent(host, [
      `mcs-color--${COLORS.BRAND}`,
      `mcs-variant--${VARIANTS.FILLED}`,
      'mcs-rounded--true',
      'mcs-elevated--false',
      'mcs-disabled--false',
    ]);
  });

  it('should keep the static "mcs-button" class even when inputs change', () => {
    expect(getClasses(host).has('mcs-button')).toBeTrue();

    component.color = COLORS.INK;
    component.variant = VARIANTS.OUTLINED;
    component.rounded = false;
    component.elevated = true;
    fixture.detectChanges();

    expect(getClasses(host).has('mcs-button')).toBeTrue();
  });

  it('should add focused class when onFocus is called', () => {
    component.onFocus();
    fixture.detectChanges();

    expectHostClasses(host, ['mcs-focused--true']);
    expectHostClassesAbsent(host, ['mcs-focused--false']);
  });

  it('should remove focused and active classes when onBlur is called', () => {
    component.onFocus();
    component.onBlur();
    fixture.detectChanges();

    expectHostClasses(host, ['mcs-focused--false', 'mcs-active--false']);
    expectHostClassesAbsent(host, ['mcs-focused--true', 'mcs-active--true']);
  });
});
