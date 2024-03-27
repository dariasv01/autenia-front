import { of } from "rxjs";
import { SPENTS } from "../mock-spents";

export const spentsServiceMock = {
    getSpents: () => of(SPENTS),
    getSpentsByIdGroup: (_id: number) => of(SPENTS),
    getSpentsByIdGroupAndIdUser: (_groupId: number, _userId: number) => of(SPENTS),
    createSpent: (_data: any) => of(SPENTS[0]),
  };