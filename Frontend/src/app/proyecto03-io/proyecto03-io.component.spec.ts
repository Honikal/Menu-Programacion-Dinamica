import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proyecto03IoComponent } from './proyecto03-io.component';

describe('Proyecto03IoComponent', () => {
  let component: Proyecto03IoComponent;
  let fixture: ComponentFixture<Proyecto03IoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyecto03IoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proyecto03IoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
