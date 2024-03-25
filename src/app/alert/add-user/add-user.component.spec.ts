import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { UserService } from '../../services/user/user.service';
import { DataService } from '../../services/data/data.service';
import { GroupService } from '../../services/group/group.service';
import { EMPTY, of } from 'rxjs';
import { User } from '../../models/user';
import { Group } from '../../models/group';
import { FormsModule } from '@angular/forms';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let groupServiceSpy: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUsers', 'createUser', 'createUserGroup']);
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['getObjeto']);
    const groupServiceSpyObj = jasmine.createSpyObj('GroupService', ['createGroups']);

    groupServiceSpyObj.createGroups.and.returnValue(EMPTY);
    userServiceSpyObj.createUser.and.returnValue(EMPTY);

    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports:[FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpyObj },
        { provide: GroupService, useValue: groupServiceSpyObj }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    groupServiceSpy = TestBed.inject(GroupService) as jasmine.SpyObj<GroupService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;

    const mockGroup: Group = { id: 1, idUser: 1, nameGroup: 'Group 1', totalSpent: 100, numberMembers: 5 };
    const mockUsers: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
    ];

    dataServiceSpy.getObjeto.and.returnValue(mockGroup);
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));
    groupServiceSpy.createGroups.and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users on initialization', () => {
    expect(component.users.length).toBe(2);
  });

  it('should create new user and group relation', () => {
    component.nuevoUsuario = { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com' };
    component.crearNuevoUsuario = true;

    component.guardarUsuario();

    expect(userServiceSpy.createUser).toHaveBeenCalledWith(component.nuevoUsuario); 
  });

});
