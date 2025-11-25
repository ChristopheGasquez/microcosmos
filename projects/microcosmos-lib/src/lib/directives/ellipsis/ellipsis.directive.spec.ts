import { Component } from '@angular/core';
import { EllipsisDirective } from './ellipsis.directive';
import { createComponent } from '../../../testing/utils/create-component';

@Component({
  template: `<div [mcsEllipsis]="lines">Some text content</div>`,
  standalone: true,
  imports: [EllipsisDirective],
})
class TestHostComponent {
  lines: number | '' | null = 1;
}

describe('EllipsisDirective', () => {
  it('should apply single-line styles by default', async () => {
    const { fixture, host } = await createComponent(TestHostComponent);
    fixture.detectChanges();

    const el = host.querySelector('div')!;
    const style = getComputedStyle(el);

    expect(style.overflow).toBe('hidden');
    expect(style.minWidth).toBe('0px');
    expect(style.whiteSpace).toBe('nowrap');
    expect(style.textOverflow).toBe('ellipsis');
    expect(style.display).toBe('block');
    expect(style.maxHeight).toBe('none');
    expect(style.getPropertyValue('-webkit-line-clamp')).toBe('none');
    expect(style.getPropertyValue('-webkit-box-orient')).toBe('horizontal');
  });

  it('should apply multi-line styles when lines > 1', async () => {
    const { fixture, component, host } = await createComponent(TestHostComponent);
    component.lines = 3;
    fixture.detectChanges();

    const el = host.querySelector('div')!;
    const style = getComputedStyle(el);

    expect(style.whiteSpace).toBe('normal');
    expect(style.display).not.toBe('block');
    expect(style.maxHeight).toContain('px');
    expect(style.getPropertyValue('-webkit-line-clamp')).toBe('3');
    expect(style.getPropertyValue('-webkit-box-orient')).toBe('vertical');
  });
});
