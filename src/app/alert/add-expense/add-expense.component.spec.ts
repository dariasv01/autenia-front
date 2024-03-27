import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExpenseComponent } from './add-expense.component';
import { SpentsService } from '../../services/spent/spents.service';
import { UserService } from '../../services/user/user.service';
import { DataService } from '../../services/data/data.service';
import { GroupService } from '../../services/group/group.service';
import { EMPTY, of } from 'rxjs';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

describe('AddExpenseComponent', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;
  let spentsServiceSpy: jasmine.SpyObj<SpentsService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let groupServiceSpy: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    const spentsServiceSpyObj = jasmine.createSpyObj('SpentsService', [
      'createSpent',
    ]);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', [
      'getUserByIdGroup',
      'getUser',
    ]);
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', [
      'getObjeto',
    ]);
    const groupServiceSpyObj = jasmine.createSpyObj('GroupService', [
      'createGroups',
    ]);

    spentsServiceSpyObj.createSpent.and.returnValue(EMPTY);
    groupServiceSpyObj.createGroups.and.returnValue(EMPTY);
    userServiceSpyObj.getUserByIdGroup.and.returnValue(EMPTY);
    userServiceSpyObj.getUser.and.returnValue(EMPTY);

    await TestBed.configureTestingModule({
      declarations: [AddExpenseComponent],
      imports: [FormsModule],
      providers: [
        { provide: SpentsService, useValue: spentsServiceSpyObj },
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpyObj },
        { provide: GroupService, useValue: groupServiceSpyObj },
      ],
    }).compileComponents();

    spentsServiceSpy = TestBed.inject(
      SpentsService
    ) as jasmine.SpyObj<SpentsService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    groupServiceSpy = TestBed.inject(
      GroupService
    ) as jasmine.SpyObj<GroupService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
    const mockGroup: Group = {
      id: 1,
      idUser: 1,
      nameGroup: 'Group 1',
      totalSpent: 0,
      numberMembers: 0,
    };
    const mockUsers: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
    ];

    dataServiceSpy.getObjeto.and.returnValue(mockGroup);
    userServiceSpy.getUserByIdGroup.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize group and users on ngOnInit', () => {
    component.ngOnInit();

    expect(component.group).toBeDefined();
    expect(component.users).toBeDefined();
  });

  it('should create new expense and update group on crearNuevoGasto', () => {
    const mockExpense = {
      id: 0,
      idUser: 0,
      idGroup: 1,
      creationDate: new Date(),
      description: '',
      amount: 0,
    };
    const mockResponse = {
      id: 0,
      idUser: 0,
      idGroup: 1,
      creationDate: new Date(),
      description: '',
      amount: 0,
    };

    spentsServiceSpy.createSpent.and.returnValue(of(mockResponse));

    component.newExpense = mockExpense;
    component.createExpense();

    expect(spentsServiceSpy.createSpent).toHaveBeenCalledWith(mockExpense);
    expect(groupServiceSpy.createGroups).toHaveBeenCalledWith(component.group);
  });
});
