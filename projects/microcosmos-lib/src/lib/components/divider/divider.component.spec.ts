import { expectHostClasses, expectHostClassesAbsent, getClasses } from '../../../testing/utils';
import { createComponent } from '../../../testing/utils/create-component';
import { COLORS, GAPS, THICKNESS } from '../../constants';
import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let fixture: any;
  let component: DividerComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(DividerComponent));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have the role "separator"', () => {
    expect(host.getAttribute('role')).toBe('separator');
  });

  it('should apply default dynamic host classes for color, gap, rounded, and thickness', () => {
    expectHostClasses(host, [
      `mcs-color--${ COLORS.NEUTRAL }`,
      `mcs-gap--${ GAPS.XL }`,
      'mcs-rounded--false',
      `mcs-thickness--${ THICKNESS.XS }`,
    ]);
  });

  it('should update host classes when inputs change and remove previous dynamic classes', () => {
    // before change
    expectHostClasses(host, [
      `mcs-color--${ COLORS.NEUTRAL }`,
      `mcs-gap--${ GAPS.XL }`,
      'mcs-rounded--false',
      `mcs-thickness--${ THICKNESS.XS }`,
    ]);

    // change inputs
    component.color = COLORS.BRAND;
    component.gap = GAPS.SM;
    component.rounded = true;
    component.thickness = THICKNESS.LG;
    fixture.detectChanges();

    // after change
    expectHostClasses(host, [
      `mcs-color--${ COLORS.BRAND }`,
      `mcs-gap--${ GAPS.SM }`,
      'mcs-rounded--true',
      `mcs-thickness--${ THICKNESS.LG }`,
    ]);

    expectHostClassesAbsent(host, [
      `mcs-color--${ COLORS.NEUTRAL }`,
      `mcs-gap--${ GAPS.XL }`,
      'mcs-rounded--false',
      `mcs-thickness--${ THICKNESS.XS }`,
    ]);
  });

  it('should keep the static "mcs-divider" class even when inputs change', () => {
    const staticClass = 'mcs-divider';
    expect(getClasses(host).has(staticClass)).toBeTrue();

    // change inputs
    component.color = COLORS.BRAND;
    component.gap = GAPS.SM;
    component.rounded = true;
    component.thickness = THICKNESS.LG;
    fixture.detectChanges();

    expect(getClasses(host).has(staticClass)).toBeTrue();
  });
});
