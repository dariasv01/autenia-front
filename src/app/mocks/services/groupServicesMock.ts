import { of } from 'rxjs';
import { GROUPS } from '../mock-groups';


export const groupServiceMock = {
  getGroups: jasmine.createSpy('getGroups').and.returnValue(of(GROUPS)),
  getGroup: jasmine.createSpy('getGroup').and.returnValue(of(GROUPS[0])),
  createGroups: jasmine.createSpy('createGroups').and.returnValue(of({})),
  getGroupByIdUser: jasmine.createSpy('getGroupByIdUser').and.returnValue(of(GROUPS))
};