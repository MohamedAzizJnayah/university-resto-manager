import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReseervationComponent } from './liste-reseervation.component';

describe('ListeReseervationComponent', () => {
  let component: ListeReseervationComponent;
  let fixture: ComponentFixture<ListeReseervationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeReseervationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReseervationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
