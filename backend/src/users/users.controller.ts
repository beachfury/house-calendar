// backend/src/users/users.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService, User }     from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.users.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.users.findOne(id);
  }
}
