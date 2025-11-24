import { CardComponent } from './card.component';
import { createComponent } from '../../../testing/utils/create-component';
import { getClasses, expectHostClasses, expectHostClassesAbsent } from '../../../testing/utils';
import { COLORS } from '../../constants/colors';
import { VARIANTS } from '../../constants/variants';
import { PADDINGS } from '../../constants/paddings';
import { MARGINS } from '../../constants/margins';

describe('CardComponent', () => {

  it('should create the component instance', async () => {
    const { component } = await createComponent(CardComponent);
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-card"', async () => {
    const { host } = await createComponent(CardComponent);
    expect(getClasses(host).has('mcs-card')).toBeTrue();
  });

  it('should apply default dynamic host classes', async () => {
    const { host } = await createComponent(CardComponent);

    expectHostClasses(host, [
      `mcs-color--${COLORS.NEUTRAL}`,
      'mcs-elevated--false',
      'mcs-full-height--false',
      'mcs-full-width--false',
      `mcs-m--${MARGINS.ZERO}`,
      `mcs-p--${PADDINGS.XL}`,
      'mcs-rounded--true',
      'mcs-selectable--false',
      `mcs-variant--${VARIANTS.OUTLINED}`,
    ]);
  });

  it('should update host classes when inputs change', async () => {
    const { component, fixture, host } = await createComponent(CardComponent);

    component.color = COLORS.BRAND;
    component.elevated = true;
    component.fullHeight = true;
    component.fullWidth = true;
    component.margin = MARGINS.MD;
    component.padding = PADDINGS.SM;
    component.rounded = false;
    component.selectable = true;
    component.variant = VARIANTS.FILLED;

    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-color--${COLORS.BRAND}`,
      'mcs-elevated--true',
      'mcs-full-height--true',
      'mcs-full-width--true',
      `mcs-m--${MARGINS.MD}`,
      `mcs-p--${PADDINGS.SM}`,
      'mcs-rounded--false',
      'mcs-selectable--true',
      `mcs-variant--${VARIANTS.FILLED}`,
    ]);

    expectHostClassesAbsent(host, [
      `mcs-color--${COLORS.NEUTRAL}`,
      'mcs-elevated--false',
      'mcs-full-height--false',
      'mcs-full-width--false',
      `mcs-m--${MARGINS.ZERO}`,
      `mcs-p--${PADDINGS.XL}`,
      'mcs-rounded--true',
      'mcs-selectable--false',
      `mcs-variant--${VARIANTS.OUTLINED}`,
    ]);
  });

  it('should keep static "mcs-card" class after updates', async () => {
    const { component, fixture, host } = await createComponent(CardComponent);

    expect(getClasses(host).has('mcs-card')).toBeTrue();

    component.color = COLORS.BRAND;
    component.elevated = true;
    fixture.detectChanges();

    expect(getClasses(host).has('mcs-card')).toBeTrue();
  });

});
