import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowResultComponent } from './show-result.component';
import { SpentsService } from '../../services/spent/spents.service';
import { UserService } from '../../services/user/user.service';
import { DataService } from '../../services/data/data.service';
import { GroupService } from '../../services/group/group.service';
import { of } from 'rxjs';
import { Group } from '../../models/group';
import { User } from '../../models/user';

describe('ShowResultComponent', () => {
  let component: ShowResultComponent;
  let fixture: ComponentFixture<ShowResultComponent>;
  let spentsServiceSpy: jasmine.SpyObj<SpentsService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let groupServiceSpy: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    const spentsServiceSpyObj = jasmine.createSpyObj('SpentsService', ['getSpentsByIdGroupAndIdUser']);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUserByIdGroup', 'getUser']);
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['getObjeto']);
    const groupServiceSpyObj = jasmine.createSpyObj('GroupService', ['getGroup']);

    await TestBed.configureTestingModule({
      declarations: [ShowResultComponent],
      providers: [
        { provide: SpentsService, useValue: spentsServiceSpyObj },
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpyObj },
        { provide: GroupService, useValue: groupServiceSpyObj }
      ]
    }).compileComponents();

    spentsServiceSpy = TestBed.inject(SpentsService) as jasmine.SpyObj<SpentsService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    groupServiceSpy = TestBed.inject(GroupService) as jasmine.SpyObj<GroupService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResultComponent);
    component = fixture.componentInstance;

    // Simular datos necesarios para la prueba
    const mockGroup: Group = { id: 1, idUser: 1, nameGroup: 'Group 1', totalSpent: 100, numberMembers: 5 };
    const mockUsers: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
    ];

    const mockSpents = [
      { id: 1, idUser: 1, idGroup: 1, amount: 20 },
      { id: 2, idUser: 2, idGroup: 1, amount: 30 },
      // Agrega más gastos simulados según sea necesario
    ];

    // Configurar los servicios simulados para devolver datos simulados
    dataServiceSpy.getObjeto.and.returnValue(mockGroup);
    userServiceSpy.getUserByIdGroup.and.returnValue(of(mockUsers));
    groupServiceSpy.getGroup.and.returnValue(of(mockGroup));
    spentsServiceSpy.getSpentsByIdGroupAndIdUser.and.callFake((groupId, userId) => {
      return of(mockSpents.filter(spent => spent.idGroup === groupId && spent.idUser === userId));
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize group and users on ngOnInit', () => {
    expect(component.group).toBeDefined();
    expect(component.users).toBeDefined();
  });

});
