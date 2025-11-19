export function expectHostClassesAbsent(host: HTMLElement, absent: string[]) {
  const classes = new Set(host.className.split(/\s+/));
  absent.forEach(cls => expect(classes.has(cls)).toBeFalse());
}
