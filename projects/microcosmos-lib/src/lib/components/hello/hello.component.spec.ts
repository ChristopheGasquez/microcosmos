import { expectHostClasses, expectHostClassesAbsent, getClasses } from '../../../testing/utils';
import { createComponent } from '../../../testing/utils/create-component';
import { COLORS, WEIGHT } from '../../constants';
import { HelloComponent } from './hello.component';

describe('HelloComponent (improved tests)', () => {
  let fixture: any;
  let component: HelloComponent;
  let host: HTMLElement;

  // Use the generic createComponent helper
  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(HelloComponent));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template (sanity check)', () => {
    const h2 = host.querySelector('h2');
    expect(h2).withContext('should contain a <h2>').not.toBeNull();
    expect(h2?.textContent?.trim()).toBe('Hello Microcosmos');
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [
      `mcs-color--${ COLORS.BRAND }`,
      `mcs-weight--${ WEIGHT.REGULAR }`,
    ]);
  });

  it('should update host classes when inputs change and remove previous dynamic classes', () => {
    // before change
    expectHostClasses(host, [
      `mcs-color--${ COLORS.BRAND }`,
      `mcs-weight--${ WEIGHT.REGULAR }`,
    ]);

    // change inputs
    component.color = COLORS.CONTRAST;
    component.weight = WEIGHT.BOLD;
    fixture.detectChanges();

    // after change
    expectHostClasses(host, [
      `mcs-color--${ COLORS.CONTRAST }`,
      `mcs-weight--${ WEIGHT.BOLD }`,
    ]);
    expectHostClassesAbsent(host, [
      `mcs-color--${ COLORS.BRAND }`,
      `mcs-weight--${ WEIGHT.REGULAR }`,
    ]);
  });

  it('should keep the static "mcs-hello" class even when inputs change', () => {
    const staticClass = 'mcs-hello';
    expect(getClasses(host).has(staticClass)).toBeTrue();

    component.color = COLORS.CONTRAST;
    component.weight = WEIGHT.BOLD;
    fixture.detectChanges();

    const classes = getClasses(host);
    expect(classes.has(staticClass)).toBeTrue();
    expectHostClasses(host, [
      `mcs-color--${ COLORS.CONTRAST }`,
      `mcs-weight--${ WEIGHT.BOLD }`,
    ]);
  });
});
