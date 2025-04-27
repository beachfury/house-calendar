import { JsonRepository } from '@/common/json-repository';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';


export interface Task {
  id: number;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  recurrence?: any;
  type: string;
  ownerId?: number;
}

@Injectable()
export class TasksService {
  private repo = new JsonRepository<Task>('tasks');

  findAll(ownerOnly?: boolean, ownerId?: number) {
    return this.repo
      .findAll()
      .then((tasks) =>
        ownerOnly && ownerId
          ? tasks.filter((t) => t.ownerId === ownerId)
          : tasks,
      );
  }

  findOne(id: number) {
    return this.repo.findById(id);
  }

  create(dto: CreateTaskDto) {
    return this.repo.create(dto as any);
  }

  update(id: number, dto: Partial<CreateTaskDto>) {
    return this.repo.update(id, dto as any);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
