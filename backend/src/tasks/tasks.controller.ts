import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  findAll(
    @Query('ownerOnly') ownerOnly: string,
    @Query('ownerId') ownerId: string,
  ) {
    return this.tasks.findAll(ownerOnly === 'true', +ownerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasks.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasks.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateTaskDto>) {
    return this.tasks.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasks.remove(+id);
  }
}
