export function getClasses(el: Element | HTMLElement): Set<string> {
  return new Set(
    (el.className || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );
}
