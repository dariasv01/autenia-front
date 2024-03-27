import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { GroupService } from '../../services/group/group.service';
import { EMPTY, of } from 'rxjs';
import { Group } from '../../models/group';
import { GROUPS } from '../../mocks/mock-groups';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let groupService: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GroupService', ['getGroups']);
    spy.getGroups.and.returnValue(EMPTY);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: GroupService, useValue: spy }]
    })
    .compileComponents();

    groupService = TestBed.inject(GroupService) as jasmine.SpyObj<GroupService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch groups on initialization', () => {
    const mockGroups: Group[] = GROUPS

    groupService.getGroups.and.returnValue(of(mockGroups));

    component.ngOnInit();

    expect(component.groups).toEqual(mockGroups);
  });

  it('should navigate to group details', () => {
    const group: Group = {
      id: 1,
      nameGroup: 'Group 1',
      numberMembers: 3,
      idUser: 0,
      totalSpent: 1,
    };
    const navigateSpy = spyOn(
      (<any>component).router,
      'navigate'
    ).and.callThrough();

    component.navigateToGroup(group);

    expect(navigateSpy).toHaveBeenCalledWith(['/group'], {
      queryParams: { group: JSON.stringify(group) },
    });
  });
});
