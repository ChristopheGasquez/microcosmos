import { GridComponent } from './grid.component';
import { createComponent } from '../../../testing/utils/create-component';
import { GAPS } from '../../constants';

describe('GridComponent', () => {
  it('should create the component', async () => {
    const { component } = await createComponent(GridComponent);
    expect(component).toBeTruthy();
  });

  it('should apply the default gap', async () => {
    const { host } = await createComponent(GridComponent);
    expect(host.classList.contains(`mcs-gap--${GAPS.ZERO}`)).toBeTrue();
  });

  it('should apply the class corresponding to the provided gap', async () => {
    const { component, fixture, host } = await createComponent(GridComponent);

    component.gap = GAPS.LG;
    fixture.detectChanges();

    expect(host.classList.contains(`mcs-gap--${GAPS.LG}`)).toBeTrue();
  });

  it('should not set grid-template-columns when cols is undefined', async () => {
    const { host } = await createComponent(GridComponent);
    expect(host.style.gridTemplateColumns).toBe('');
  });

  it('should set grid-template-columns when cols is provided', async () => {
    const { component, fixture, host } = await createComponent(GridComponent);

    component.cols = 3;
    fixture.detectChanges();

    expect(host.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  it('should update classes and styles after input changes', async () => {
    const { component, fixture, host } = await createComponent(GridComponent);

    component.gap = GAPS.MD;
    component.cols = 4;
    fixture.detectChanges();

    expect(host.classList.contains(`mcs-gap--${GAPS.MD}`)).toBeTrue();
    expect(host.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });
});
