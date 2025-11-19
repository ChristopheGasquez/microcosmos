import { getClasses, expectHostClasses, expectHostClassesAbsent } from '../../../testing/utils';
import { createComponent } from '../../../testing/utils/create-component';
import { TagComponent } from './tag.component';
import { COLORS } from '../../constants';
import { VARIANTS } from '../../constants/variants';

describe('TagComponent', () => {
  let fixture: any;
  let component: TagComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(TagComponent));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-tag"', () => {
    expect(getClasses(host).has('mcs-tag')).toBeTrue();
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [
      `mcs-color--${COLORS.NEUTRAL}`,
      `mcs-variant--${VARIANTS.TONED}`,
      'mcs-rounded--true',
      'mcs-elevated--false',
    ]);
  });

  it('should update host classes when inputs change', () => {
    component.color = COLORS.BRAND;
    component.variant = VARIANTS.OUTLINED;
    component.rounded = false;
    component.elevated = true;
    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-color--${COLORS.BRAND}`,
      `mcs-variant--${VARIANTS.OUTLINED}`,
      'mcs-rounded--false',
      'mcs-elevated--true',
    ]);

    expectHostClassesAbsent(host, [
      `mcs-color--${COLORS.NEUTRAL}`,
      `mcs-variant--${VARIANTS.TONED}`,
      'mcs-rounded--true',
      'mcs-elevated--false',
    ]);
  });

  it('should keep the static "mcs-tag" class even when inputs change', () => {
    const staticClass = 'mcs-tag';
    expect(getClasses(host).has(staticClass)).toBeTrue();

    component.color = COLORS.BRAND;
    component.variant = VARIANTS.OUTLINED;
    component.rounded = false;
    component.elevated = true;
    fixture.detectChanges();

    expect(getClasses(host).has(staticClass)).toBeTrue();
  });
});
