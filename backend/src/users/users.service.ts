// backend/src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import rawUsers from '@data/users.json';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'member';
}

@Injectable()
export class UsersService {
  private readonly users: User[] = rawUsers as unknown as User[];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
