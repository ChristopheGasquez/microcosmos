/*
import { ImageComponent } from './image.component';
import { createComponent } from '../../../testing/utils/create-component';

describe('ImageComponent', () => {

  it('should create the component', async () => {
    const { component, fixture } = await createComponent(ImageComponent);
    component.src = 'test.jpg';  // IMPORTANT
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render an image with base attributes', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);
    component.src = 'test.jpg'; // IMPORTANT
    fixture.detectChanges();

    const img = host.querySelector('img')!;
    expect(img.getAttribute('alt')).toBe('');
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('should bind width and height to the <img> element', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);

    component.src = 'test.jpg';
    component.width = 200;
    component.height = 100;

    fixture.detectChanges();

    const img = host.querySelector('img')!;
    expect(img.getAttribute('width')).toBe('200');
    expect(img.getAttribute('height')).toBe('100');
  });

  it('should set loading="eager" when lazy = false and priority = false', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);

    component.src = 'test.jpg';
    component.lazy = false;

    fixture.detectChanges();

    const img = host.querySelector('img')!;
    expect(img.getAttribute('loading')).toBe('eager');
  });

  it('should remove loading attribute when priority = true', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);

    component.src = 'test.jpg';
    component.priority = true;

    fixture.detectChanges();

    const img = host.querySelector('img')!;
    expect(img.getAttribute('loading')).toBeNull();
  });

  it('should apply aspect ratio when ratio is provided', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);

    component.src = 'test.jpg';
    component.ratio = '16/9';

    fixture.detectChanges();

    const img = host.querySelector('img')!;
    expect(img.style.aspectRatio).toBe('16/9');
  });

  it('should apply host classes based on inputs', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);

    component.src = 'test.jpg';
    component.variant = 'outlined' as any;
    component.elevated = true;
    component.fit = 'contain' as any;
    component.filter = 'blur' as any;
    component.fullWidth = true;
    component.fullHeight = true;
    component.rounded = true;
    component.selectable = true;
    component.padding = 'lg' as any;

    fixture.detectChanges();

    const classes = host.className;

    expect(classes).toContain('mcs-variant--outlined');
    expect(classes).toContain('mcs-elevated--true');
    expect(classes).toContain('mcs-img-fit--contain');
    expect(classes).toContain('mcs-img-filter--blur');
    expect(classes).toContain('mcs-full-width--true');
    expect(classes).toContain('mcs-full-height--true');
    expect(classes).toContain('mcs-rounded--true');
    expect(classes).toContain('mcs-selectable--true');
    expect(classes).toContain('mcs-p--lg');
  });

  it('should force rounded="circle" when circle=true', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);

    component.src = 'test.jpg';
    component.circle = true;
    component.rounded = false;

    fixture.detectChanges();

    expect(host.className).toContain('mcs-rounded--circle');
  });

  it('should swap src with fallback on error (first time only)', async () => {
    const { fixture, component, host } = await createComponent(ImageComponent);

    component.src = 'invalid.jpg';
    component.fallback = 'fallback.jpg';

    fixture.detectChanges();

    const img = host.querySelector('img')!;

    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(component.src).toBe('fallback.jpg');

    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(component.src).toBe('fallback.jpg'); // unchanged
  });

});
*/
