import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrocosmosLib } from './hello.component';

describe('MicrocosmosLib', () => {
  let component: MicrocosmosLib;
  let fixture: ComponentFixture<MicrocosmosLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicrocosmosLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrocosmosLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
