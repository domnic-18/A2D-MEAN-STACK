import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmyorderComponent } from './listmyorder.component';

describe('ListmyorderComponent', () => {
  let component: ListmyorderComponent;
  let fixture: ComponentFixture<ListmyorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmyorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmyorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
