import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proyecto00IoComponent } from './proyecto00-io.component';

describe('Proyecto00IoComponent', () => {
  let component: Proyecto00IoComponent;
  let fixture: ComponentFixture<Proyecto00IoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyecto00IoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proyecto00IoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
