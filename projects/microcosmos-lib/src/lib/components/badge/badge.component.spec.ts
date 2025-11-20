import { createComponent } from '../../../testing/utils/create-component';
import { getClasses, expectHostClasses, expectHostClassesAbsent } from '../../../testing/utils';
import { BadgeComponent } from './badge.component';
import { COLORS, POSITIONS, VARIANTS } from '../../constants';

describe('BadgeComponent', () => {
  let fixture: any;
  let component: BadgeComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(BadgeComponent));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-badge"', () => {
    expect(getClasses(host).has('mcs-badge')).toBeTrue();
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [
      `mcs-color--${COLORS.ERROR}`,
      'mcs-elevated--false',
      `mcs-position--${POSITIONS.TOP_RIGHT}`,
      'mcs-rounded--true',
      `mcs-variant--${VARIANTS.FILLED}`,
    ]);
  });

  it('should update host classes when inputs change', () => {
    component.color = COLORS.BRAND;
    component.elevated = true;
    component.position = POSITIONS.BOTTOM_LEFT;
    component.rounded = false;
    component.variant = VARIANTS.OUTLINED;
    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-color--${COLORS.BRAND}`,
      'mcs-elevated--true',
      `mcs-position--${POSITIONS.BOTTOM_LEFT}`,
      'mcs-rounded--false',
      `mcs-variant--${VARIANTS.OUTLINED}`,
    ]);

    expectHostClassesAbsent(host, [
      `mcs-color--${COLORS.ERROR}`,
      'mcs-elevated--false',
      `mcs-position--${POSITIONS.TOP_RIGHT}`,
      'mcs-rounded--true',
      `mcs-variant--${VARIANTS.FILLED}`,
    ]);
  });

  describe('displayValue', () => {
    it('should render value as string when value is set', () => {
      component.value = '10';
      fixture.detectChanges();
      expect(component.displayValue).toBe('10');
    });

    it('should clamp numeric value above max', () => {
      component.value = 99;
      component.max = 50;
      fixture.detectChanges();
      expect(component.displayValue).toBe('50+');
    });

    it('should show actual value when hovered and clamped', () => {
      component.value = 99;
      component.max = 50;
      component.hovered = true;
      fixture.detectChanges();
      expect(component.displayValue).toBe('99');
    });

    it('should handle string numeric values correctly', () => {
      component.value = '75';
      component.max = 50;
      fixture.detectChanges();
      expect(component.displayValue).toBe('50+');
      component.hovered = true;
      fixture.detectChanges();
      expect(component.displayValue).toBe('75');
    });

    it('should return empty string if value is null or undefined', () => {
      component.value = undefined;
      fixture.detectChanges();
      expect(component.displayValue).toBe('');

      component.value = null as any;
      fixture.detectChanges();
      expect(component.displayValue).toBe('');
    });
  });

  describe('hover state', () => {
    it('should set hovered to true on mouseenter and false on mouseleave', () => {
      host.dispatchEvent(new Event('mouseenter'));
      expect(component.hovered).toBeTrue();

      host.dispatchEvent(new Event('mouseleave'));
      expect(component.hovered).toBeFalse();
    });
  });
});
