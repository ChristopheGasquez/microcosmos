import { expectHostClasses, expectHostClassesAbsent } from './';
export function updateInputsAndCheckClasses<T>(
  fixture: import('@angular/core/testing').ComponentFixture<T>,
  host: HTMLElement,
  inputs: Partial<T>,
  expectedClasses: string[],
  removedClasses: string[]
) {
  Object.assign(fixture.componentInstance as any, inputs);
  fixture.detectChanges();
  expectHostClasses(host, expectedClasses);
  expectHostClassesAbsent(host, removedClasses);
}
