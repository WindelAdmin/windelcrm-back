import { Prisma } from '@prisma/client';

export default class WorkSchedule implements Prisma.WorkScheduleCreateInput {
  day: string;
  morningTimeInit: number;
  morningTimeEnd: number;
  afternoonTimeInit: number;
  afternoonTimeEnd: number;
  employee: Prisma.EmployeeCreateNestedOneWithoutWorkScheduleInput; 
}