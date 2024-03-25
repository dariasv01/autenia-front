import { TestBed } from '@angular/core/testing';
import { SpentsService } from './spents.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SPENTS } from '../../mocks/mock-spents';
import { spentsServiceMock } from '../../mocks/services/spentsServicesMock';

describe('SpentsService', () => {
  let service: SpentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SpentsService,
        { provide: SpentsService, useValue: spentsServiceMock },
      ],
    });
    service = TestBed.inject(SpentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return spents when getSpents is called', () => {
    service.getSpents().subscribe((spents) => {
      expect(spents).toEqual(SPENTS);
    });
  });

  it('should return spents by group ID when getSpentsByIdGroup is called', () => {
    const groupId = 1;
    service.getSpentsByIdGroup(groupId).subscribe((spents) => {
      expect(spents).toEqual(SPENTS);
    });
  });

  it('should return spents by group ID and user ID when getSpentsByIdGroupAndIdUser is called', () => {
    const groupId = 1;
    const userId = 1;
    service.getSpentsByIdGroupAndIdUser(groupId, userId).subscribe((spents) => {
      expect(spents).toEqual(SPENTS);
    });
  });

  it('should create a spent when createSpent is called', () => {
    service.createSpent({}).subscribe((response) => {
      expect(response).toEqual(SPENTS[0]);
    });
  });
});
