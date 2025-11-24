import { GridItemComponent } from './grid-item.component';
import { createComponent } from '../../../testing/utils/create-component';

describe('GridItemComponent', () => {

  it('should create the component', async () => {
    const { component } = await createComponent(GridItemComponent);
    expect(component).toBeTruthy();
  });

  it('should have the static class "mcs-grid-item"', async () => {
    const { host } = await createComponent(GridItemComponent);
    expect(host.classList.contains('mcs-grid-item')).toBeTrue();
  });

  it('should not set grid-column style when span is undefined', async () => {
    const { host } = await createComponent(GridItemComponent);
    expect(host.style.gridColumn).toBe('');
  });

  it('should set grid-column style when span is provided', async () => {
    const { component, fixture, host } = await createComponent(GridItemComponent);

    component.span = 3;
    fixture.detectChanges();

    expect(host.style.gridColumn).toBe('span 3');
  });

  it('should update grid-column style after span changes', async () => {
    const { component, fixture, host } = await createComponent(GridItemComponent);

    component.span = 2;
    fixture.detectChanges();
    expect(host.style.gridColumn).toBe('span 2');

    component.span = 5;
    fixture.detectChanges();
    expect(host.style.gridColumn).toBe('span 5');
  });
});
