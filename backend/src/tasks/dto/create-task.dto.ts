export class CreateTaskDto {
  title: string | undefined;
  description?: string;
  startTime: string | undefined; // ISO date
  endTime?: string;
  recurrence?: any; // JSON structure
  type: string | undefined; // TaskType enum name
  ownerId?: number;
}
