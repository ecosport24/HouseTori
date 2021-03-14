import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HouseListPage } from './house-list.page';

describe('HouseListPage', () => {
  let component: HouseListPage;
  let fixture: ComponentFixture<HouseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
