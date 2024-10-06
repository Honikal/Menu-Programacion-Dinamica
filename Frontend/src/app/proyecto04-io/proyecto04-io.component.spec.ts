import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proyecto04IoComponent } from './proyecto04-io.component';

describe('Proyecto04IoComponent', () => {
  let component: Proyecto04IoComponent;
  let fixture: ComponentFixture<Proyecto04IoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proyecto04IoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proyecto04IoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
