import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruopComponent } from './gruop.component';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { Spent } from '../../models/spent';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { SpentsService } from '../../services/spent/spents.service';
import { DataService } from '../../services/data/data.service';
import { EMPTY, of } from 'rxjs';

describe('GruopComponent', () => {
  let component: GruopComponent;
  let fixture: ComponentFixture<GruopComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let spentServiceSpy: jasmine.SpyObj<SpentsService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', [
      'getUserByIdGroup',
      'getUser',
    ]);
    const spentServiceSpyObj = jasmine.createSpyObj('SpentsService', [
      'getSpentsByIdGroup',
    ]);
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', [
      'setObjeto',
    ]);

    userServiceSpyObj.getUserByIdGroup.and.returnValue(EMPTY);
    userServiceSpyObj.getUser.and.returnValue(EMPTY);
    spentServiceSpyObj.getSpentsByIdGroup.and.returnValue(EMPTY);

    await TestBed.configureTestingModule({
      declarations: [GruopComponent],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: SpentsService, useValue: spentServiceSpyObj },
        { provide: DataService, useValue: dataServiceSpyObj },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ group: JSON.stringify({ id: 1 }) }) },
        },
      ],
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    spentServiceSpy = TestBed.inject(
      SpentsService
    ) as jasmine.SpyObj<SpentsService>;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users and expenses on initialization', () => {
    const mockUsers: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
    ];
    const mockExpenses: Spent[] = [
      {
        id: 1,
        description: 'Expense 1',
        amount: 100,
        creationDate: new Date(),
        idGroup: 1,
        idUser: 1,
      },
      {
        id: 2,
        description: 'Expense 2',
        amount: 200,
        creationDate: new Date(),
        idGroup: 1,
        idUser: 1,
      },
    ];

    userServiceSpy.getUserByIdGroup.and.returnValue(of(mockUsers));
    userServiceSpy.getUser.and.returnValues(of(mockUsers[0]), of(mockUsers[1]));
    spentServiceSpy.getSpentsByIdGroup.and.returnValue(of(mockExpenses));

    component.ngOnInit();

    expect(component.users).toEqual(mockUsers);
    expect(component.expenses).toEqual(mockExpenses);
  });

  it('should navigate to home when going back', () => {
    component.goBack();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('');
  });
});
