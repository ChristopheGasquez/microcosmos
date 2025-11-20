import { createComponent } from '../../../testing/utils/create-component';
import { getClasses, expectHostClasses, expectHostClassesAbsent } from '../../../testing/utils';
import { ContainerComponent } from './container.component';
import { SCREENS } from '../../constants';

describe('ContainerComponent', () => {
  let fixture: any;
  let component: ContainerComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(ContainerComponent));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-container"', () => {
    expect(getClasses(host).has('mcs-container')).toBeTrue();
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [
      `mcs-screen--${SCREENS.FULL}`,
      'mcs-full-height--false',
    ]);
  });

  it('should update host classes when inputs change', () => {
    component.screen = SCREENS.MD;
    component.fullHeight = true;
    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-screen--${SCREENS.MD}`,
      'mcs-full-height--true',
    ]);

    expectHostClassesAbsent(host, [
      `mcs-screen--${SCREENS.FULL}`,
      'mcs-full-height--false',
    ]);
  });

  it('should keep the static "mcs-container" class even when inputs change', () => {
    component.screen = SCREENS.SM;
    component.fullHeight = true;
    fixture.detectChanges();

    expect(getClasses(host).has('mcs-container')).toBeTrue();
  });
});
