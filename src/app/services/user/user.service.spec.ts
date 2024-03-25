import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { userServiceMock } from '../../mocks/services/userServicesMock';
import { USERS } from '../../mocks/mock-users';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(USERS);
    });
  });

  it('should retrieve a specific user by ID', () => {
    const userId = 1;
    service.getUser(userId).subscribe(user => {
      expect(user).toEqual(USERS[0]);
    });
  });

  it('should create a new user', () => {
    const newUser = { id: 8, firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com' };
    service.createUser(newUser).subscribe(response => {
      expect(response).toBeTruthy();
    });
  });

  it('should retrieve users by group ID', () => {
    const groupId = 1;
    service.getUserByIdGroup(groupId).subscribe(users => {
      expect(users).toEqual(USERS);
    });
  });
});
