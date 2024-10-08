import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrucelImagenesComponent } from './carrucel-imagenes.component';

describe('CarrucelImagenesComponent', () => {
  let component: CarrucelImagenesComponent;
  let fixture: ComponentFixture<CarrucelImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrucelImagenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrucelImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
