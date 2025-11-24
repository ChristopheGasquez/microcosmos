import { ParagraphComponent } from './paragraph.component';
import { createComponent } from '../../../testing/utils/create-component';
import { getClasses, expectHostClasses, expectHostClassesAbsent } from '../../../testing/utils';

import { TEXT_ALIGN } from '../../constants';
import { COLORS } from '../../constants';
import { FONT_SIZE, FONT_STYLE } from '../../constants/fonts';
import { MARGINS } from '../../constants/margins';
import { WEIGHT } from '../../constants//weights';

describe('ParagraphComponent', () => {

  it('should create the component instance', async () => {
    const { component } = await createComponent(ParagraphComponent);
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-p"', async () => {
    const { host } = await createComponent(ParagraphComponent);
    expect(getClasses(host).has('mcs-p')).toBeTrue();
  });

  it('should apply default dynamic host classes', async () => {
    const { host } = await createComponent(ParagraphComponent);

    expectHostClasses(host, [
      `mcs-color--${COLORS.INK}`,
      `mcs-f-size--${FONT_SIZE.MD}`,
      `mcs-f-style--${FONT_STYLE.NORMAL}`,
      `mcs-text-align--${TEXT_ALIGN.START}`,
      `mcs-margin-bottom--${MARGINS.ZERO}`,
      `mcs-f-weight--${WEIGHT.REGULAR}`,
    ]);
  });

  it('should update host classes when inputs change', async () => {
    const { component, fixture, host } = await createComponent(ParagraphComponent);

    component.align = TEXT_ALIGN.CENTER;
    component.color = COLORS.BRAND;
    component.fontSize = FONT_SIZE.XL;
    component.fontStyle = FONT_STYLE.ITALIC;
    component.marginBottom = MARGINS.LG;
    component.weight = WEIGHT.BOLD;

    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-color--${COLORS.BRAND}`,
      `mcs-f-size--${FONT_SIZE.XL}`,
      `mcs-f-style--${FONT_STYLE.ITALIC}`,
      `mcs-text-align--${TEXT_ALIGN.CENTER}`,
      `mcs-margin-bottom--${MARGINS.LG}`,
      `mcs-f-weight--${WEIGHT.BOLD}`,
    ]);

    expectHostClassesAbsent(host, [
      `mcs-color--${COLORS.INK}`,
      `mcs-f-size--${FONT_SIZE.MD}`,
      `mcs-f-style--${FONT_STYLE.NORMAL}`,
      `mcs-text-align--${TEXT_ALIGN.START}`,
      `mcs-margin-bottom--${MARGINS.ZERO}`,
      `mcs-f-weight--${WEIGHT.REGULAR}`,
    ]);
  });

  it('should keep static class "mcs-p" after updates', async () => {
    const { component, fixture, host } = await createComponent(ParagraphComponent);

    expect(getClasses(host).has('mcs-p')).toBeTrue();

    component.color = COLORS.ERROR;
    component.fontSize = FONT_SIZE.SM;
    fixture.detectChanges();

    expect(getClasses(host).has('mcs-p')).toBeTrue();
  });
});
