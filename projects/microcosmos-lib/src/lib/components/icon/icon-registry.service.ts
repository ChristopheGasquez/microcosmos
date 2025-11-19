import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IconRegistry {
  private cache = new Map<string, string>();

  register(name: string, svg: string) {
    this.cache.set(name, svg);
  }

  async get(name: string): Promise<string | undefined> {
    return this.cache.get(name);
  }
}
