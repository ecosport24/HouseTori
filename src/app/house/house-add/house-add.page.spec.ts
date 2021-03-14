import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HouseAddPage } from './house-add.page';

describe('HouseAddPage', () => {
  let component: HouseAddPage;
  let fixture: ComponentFixture<HouseAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
