import { createComponent } from '../../../testing/utils/create-component';
import { getClasses, expectHostClasses, expectHostClassesAbsent } from '../../../testing/utils';
import { FlexComponent } from './flex.component';
import { FLEX_ALIGN, FLEX_DIRECTION, FLEX_JUSTIFY, FLEX_WRAP } from '../../constants/flex';
import { GAPS } from '../../constants';

describe('FlexComponent', () => {
  let fixture: any;
  let component: FlexComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(FlexComponent));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-flex"', () => {
    expect(getClasses(host).has('mcs-flex')).toBeTrue();
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [
      `mcs-flex-align--${FLEX_ALIGN.START}`,
      `mcs-flex-direction--${FLEX_DIRECTION.HORIZONTAL}`,
      `mcs-gap--${GAPS.ZERO}`,
      'mcs-full-height--false',
      `mcs-flex-justify--${FLEX_JUSTIFY.START}`,
      `mcs-flex-wrap--${FLEX_WRAP.WRAP}`,
    ]);
  });

  it('should update host classes when inputs change', () => {
    // change all inputs
    component.align = FLEX_ALIGN.CENTER;
    component.direction = FLEX_DIRECTION.VERTICAL;
    component.gap = GAPS.SM;
    component.fullHeight = true;
    component.justify = FLEX_JUSTIFY.CENTER;
    component.wrap = FLEX_WRAP.NOWRAP;
    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-flex-align--${FLEX_ALIGN.CENTER}`,
      `mcs-flex-direction--${FLEX_DIRECTION.VERTICAL}`,
      `mcs-gap--${GAPS.SM}`,
      'mcs-full-height--true',
      `mcs-flex-justify--${FLEX_JUSTIFY.CENTER}`,
      `mcs-flex-wrap--${FLEX_WRAP.NOWRAP}`,
    ]);

    expectHostClassesAbsent(host, [
      `mcs-flex-align--${FLEX_ALIGN.START}`,
      `mcs-flex-direction--${FLEX_DIRECTION.HORIZONTAL}`,
      `mcs-gap--${GAPS.ZERO}`,
      'mcs-full-height--false',
      `mcs-flex-justify--${FLEX_JUSTIFY.START}`,
      `mcs-flex-wrap--${FLEX_WRAP.WRAP}`,
    ]);
  });

  it('should keep the static "mcs-flex" class even when inputs change', () => {
    const staticClass = 'mcs-flex';

    component.align = FLEX_ALIGN.CENTER;
    component.direction = FLEX_DIRECTION.VERTICAL;
    component.gap = GAPS.SM;
    component.fullHeight = true;
    component.justify = FLEX_JUSTIFY.CENTER;
    component.wrap = FLEX_WRAP.NOWRAP;
    fixture.detectChanges();

    expect(getClasses(host).has(staticClass)).toBeTrue();
  });
});
