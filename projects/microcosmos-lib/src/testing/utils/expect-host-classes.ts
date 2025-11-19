export function expectHostClasses(host: HTMLElement, expected: string[]) {
  const classes = new Set(host.className.split(/\s+/));
  expected.forEach(cls => expect(classes.has(cls)).toBeTrue());
}
