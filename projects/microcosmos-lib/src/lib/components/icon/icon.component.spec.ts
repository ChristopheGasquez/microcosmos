import { expectHostClasses, getClasses } from '../../../testing/utils';
import { createComponent } from '../../../testing/utils/create-component';
import type { Colors } from '../../constants';
import { SIZES } from '../../constants';
import { IconRegistry } from './icon-registry.service';
import { IconComponent } from './icon.component';

// Proper mock for IconRegistry
class MockIconRegistry {
  private cache = new Map<string, string>();

  register(name: string, svg: string) {
    this.cache.set(name, svg);
  }

  async get(name: string): Promise<string | undefined> {
    return this.cache.get(name);
  }
}

describe('IconComponent', () => {
  let fixture: any;
  let component: IconComponent;
  let host: HTMLElement;
  let registry: MockIconRegistry;

  beforeEach(async () => {
    registry = new MockIconRegistry();

    ({ fixture, component, host } = await createComponent(IconComponent, {
      providers: [ { provide: IconRegistry, useValue: registry } ],
    }));
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have static class "mcs-icon"', () => {
    expect(getClasses(host).has('mcs-icon')).toBeTrue();
  });

  it('should apply default dynamic host classes', () => {
    expectHostClasses(host, [ `mcs-size--${ SIZES.S }` ]);
  });

  it('should apply dynamic classes for color and proportionalToTheFont', () => {
    component.color = 'brand' as Colors;
    component.proportionalToTheFont = true;
    fixture.detectChanges();

    expectHostClasses(host, [
      `mcs-color--brand`,
      'mcs-proportional--font',
      `mcs-size--${ SIZES.S }`,
    ]);
  });

  it('should update size class when input changes', () => {
    component.size = SIZES.XL;
    fixture.detectChanges();

    expectHostClasses(host, [ `mcs-size--${ SIZES.XL }` ]);
    expect(getClasses(host).has(`mcs-size--${ SIZES.S }`)).toBeFalse();
  });

  it('should load SVG when name input is set', async () => {
    registry.register('check', '<svg id="check"></svg>');

    component.name = 'check';
    fixture.detectChanges();
    await fixture.whenStable(); // wait for async #loadIcon

    const svg = component.svg();
    expect(svg).toBeTruthy();
    expect(svg!.toString()).toContain('svg');
    expect(svg!.toString()).toContain('check');
  });

  it('should set svg to null when name is falsy', async () => {
    component.name = '' as any;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.svg()).toBeNull();
  });
});
