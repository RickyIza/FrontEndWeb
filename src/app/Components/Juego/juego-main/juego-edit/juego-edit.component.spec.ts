import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoEditComponent } from './juego-edit.component';

describe('JuegoEditComponent', () => {
  let component: JuegoEditComponent;
  let fixture: ComponentFixture<JuegoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
