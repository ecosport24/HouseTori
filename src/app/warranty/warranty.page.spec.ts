import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarrantyPage } from './warranty.page';

describe('WarrantyPage', () => {
  let component: WarrantyPage;
  let fixture: ComponentFixture<WarrantyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarrantyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
