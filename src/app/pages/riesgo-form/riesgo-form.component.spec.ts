import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgoFormComponent } from './riesgo-form.component';

describe('RiesgoFormComponent', () => {
  let component: RiesgoFormComponent;
  let fixture: ComponentFixture<RiesgoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiesgoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiesgoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
