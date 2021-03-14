import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminUsersListPage } from './admin-users-list.page';

describe('AdminUsersListPage', () => {
  let component: AdminUsersListPage;
  let fixture: ComponentFixture<AdminUsersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUsersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
