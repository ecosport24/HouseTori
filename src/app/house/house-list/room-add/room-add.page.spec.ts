import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomAddPage } from './room-add.page';

describe('RoomAddPage', () => {
  let component: RoomAddPage;
  let fixture: ComponentFixture<RoomAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
