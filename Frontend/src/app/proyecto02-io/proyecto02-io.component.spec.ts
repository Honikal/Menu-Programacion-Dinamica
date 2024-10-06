import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proyecto02IoComponent } from './proyecto02-io.component';

describe('Proyecto02IoComponent', () => {
  let component: Proyecto02IoComponent;
  let fixture: ComponentFixture<Proyecto02IoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyecto02IoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proyecto02IoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
