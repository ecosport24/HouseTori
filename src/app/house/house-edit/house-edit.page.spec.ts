import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HouseEditPage } from './house-edit.page';

describe('HouseEditPage', () => {
  let component: HouseEditPage;
  let fixture: ComponentFixture<HouseEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
