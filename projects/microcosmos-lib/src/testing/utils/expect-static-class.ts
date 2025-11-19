export function expectStaticClass(host: HTMLElement, className: string) {
  const classes = new Set(host.className.split(/\s+/));
  expect(classes.has(className)).toBeTrue();
}
