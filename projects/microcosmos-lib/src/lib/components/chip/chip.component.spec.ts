import { expectHostClasses, getClasses } from '../../../testing/utils';
import { createComponent } from '../../../testing/utils/create-component';
import { COLORS, VARIANTS } from '../../constants';
import { IconComponent } from '../icon/icon.component';
import { TagComponent } from '../tag/tag.component';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let fixture: any;
  let component: ChipComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    ({ fixture, component, host } = await createComponent(ChipComponent, {
      imports: [ TagComponent, IconComponent ],
    }));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-chip"', () => {
    expect(getClasses(host).has('mcs-chip')).toBeTrue();
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [
      `mcs-color--${ COLORS.BRAND }`,
      `mcs-variant--${ VARIANTS.OUTLINED }`,
      'mcs-rounded--true',
      'mcs-elevated--false',
      'mcs-selectable--true',
      'mcs-removable--false',
      'mcs-selected--false',
      'mcs-focused--false',
    ]);
  });

  it('should update host classes when inputs change', () => {
    component.color = COLORS.NEUTRAL;
    component.variant = VARIANTS.TONED;
    component.rounded = false;
    component.elevated = true;
    component.isSelectable = false;
    component.isRemovable = true;
    component.selected = true;
    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-color--${ COLORS.NEUTRAL }`,
      `mcs-variant--${ VARIANTS.TONED }`,
      'mcs-rounded--false',
      'mcs-elevated--true',
      'mcs-selectable--false',
      'mcs-removable--true',
      'mcs-selected--true',
    ]);
  });

  it('should update focused state on focus and blur events', () => {
    host.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expectHostClasses(host, [ 'mcs-focused--true' ]);

    host.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expectHostClasses(host, [ 'mcs-focused--false' ]);
  });

  it('should set tabindex and role based on isSelectable input', () => {
    component.isSelectable = true;
    fixture.detectChanges();
    expect(host.getAttribute('tabindex')).toBe('0');
    expect(host.getAttribute('role')).toBe('button');

    component.isSelectable = false;
    fixture.detectChanges();
    expect(host.getAttribute('tabindex')).toBeNull();
    expect(host.getAttribute('role')).toBeNull();
  });

  it('should set aria-pressed based on isSelectable and selected', () => {
    component.isSelectable = true;
    component.selected = true;
    fixture.detectChanges();
    expect(host.getAttribute('aria-pressed')).toBe('true');

    component.selected = false;
    fixture.detectChanges();
    expect(host.getAttribute('aria-pressed')).toBe('false');

    component.isSelectable = false;
    fixture.detectChanges();
    expect(host.getAttribute('aria-pressed')).toBeNull();
  });

  it('should emit click event on Enter or Space keydown', () => {
    spyOn(component.click, 'emit');

    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    host.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();

    expect(component.click.emit).toHaveBeenCalledTimes(2);
  });
});
