import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GroupService } from './group.service';
import { groupServiceMock } from '../../mocks/services/groupServicesMock';
import { GROUPS } from '../../mocks/mock-groups';

describe('GroupService', () => {
  let service: GroupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: GroupService, useValue: groupServiceMock }]
    });
    service = TestBed.inject(GroupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve groups', () => {
    service.getGroups().subscribe(groups => {
      expect(groups).toEqual(GROUPS);
    });
  });

  it('should retrieve a specific group by ID', () => {
    const groupId = 1;
    service.getGroup(groupId).subscribe(group => {
      expect(group).toEqual(GROUPS[0]);
    });
  });

  it('should create a new group', () => {
    const newGroup = { id: 7, idUser: 1, nameGroup: 'New Group', totalSpent: 0, numberMembers: 0 };
    service.createGroups(newGroup).subscribe(response => {
      expect(response).toBeTruthy();
    });
  });

  it('should retrieve groups by user ID', () => {
    const userId = 1;
    service.getGroupByIdUser(userId).subscribe(groups => {
      expect(groups).toEqual(GROUPS);
    });
  });
});
