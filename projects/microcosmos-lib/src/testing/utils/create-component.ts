import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export interface CreateComponentOptions {
  imports?: any[];
  providers?: any[];
  schemas?: any[];
}

/**
 * Generic helper to create an Angular component for testing.
 *
 * @param component The component class (constructor)
 * @param options Optional configuration: imports, providers, schemas
 */
export async function createComponent<T extends Type<any>>(
  component: T,
  options: CreateComponentOptions = {}
): Promise<{
  fixture: ComponentFixture<InstanceType<T>>;
  component: InstanceType<T>;
  host: HTMLElement;
  debugElement: DebugElement;
}> {
  await TestBed.configureTestingModule({
    imports: [component, ...(options.imports ?? [])],
    providers: options.providers ?? [],
    schemas: options.schemas ?? [CUSTOM_ELEMENTS_SCHEMA],
  }).compileComponents();

  const fixture: ComponentFixture<InstanceType<T>> = TestBed.createComponent(component);
  const componentInstance: InstanceType<T> = fixture.componentInstance;
  const debugElement: DebugElement = fixture.debugElement;
  fixture.detectChanges();
  const host: HTMLElement = fixture.nativeElement as HTMLElement;

  return { fixture, component: componentInstance, host, debugElement };
}
