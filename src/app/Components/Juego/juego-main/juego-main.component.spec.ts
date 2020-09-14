import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoMainComponent } from './juego-main.component';

describe('JuegoMainComponent', () => {
  let component: JuegoMainComponent;
  let fixture: ComponentFixture<JuegoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
