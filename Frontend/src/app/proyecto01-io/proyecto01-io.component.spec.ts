import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proyecto01IoComponent } from './proyecto01-io.component';

describe('Proyecto01IoComponent', () => {
  let component: Proyecto01IoComponent;
  let fixture: ComponentFixture<Proyecto01IoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyecto01IoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proyecto01IoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
