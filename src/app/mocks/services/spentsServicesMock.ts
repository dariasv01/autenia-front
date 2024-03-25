import { of } from "rxjs";
import { SPENTS } from "../mock-spents";

export const spentsServiceMock = {
    getSpents: () => of(SPENTS),
    getSpentsByIdGroup: (id: number) => of(SPENTS),
    getSpentsByIdGroupAndIdUser: (groupId: number, userId: number) => of(SPENTS),
    createSpent: (data: any) => of(SPENTS[0]),
  };