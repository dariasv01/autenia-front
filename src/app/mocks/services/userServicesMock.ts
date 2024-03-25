import { of } from "rxjs";
import { USERS } from "../mock-users";

export const userServiceMock = {
    getUsers: jasmine.createSpy('getUsers').and.returnValue(of(USERS)),
    getUserByIdGroup: jasmine.createSpy('getUserByIdGroup').and.returnValue(of(USERS)),
    getUser: jasmine.createSpy('getUser').and.returnValue(of(USERS[0])),
    createUser: jasmine.createSpy('createUser').and.returnValue(of({})),
    createUserGroup: jasmine.createSpy('createUserGroup').and.returnValue(of({})),
  };