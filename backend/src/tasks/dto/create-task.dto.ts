import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsObject,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startTime!: string;   // ISO date

  @IsOptional()
  @IsDateString()
  endTime?: string;     // ISO date

  @IsOptional()
  @IsObject()
  recurrence?: any;     // JSON structure, tighten this if you know its shape

  @IsString()
  type!: string;        // e.g. name of your TaskType enum

  @IsOptional()
  @IsInt()
  ownerId?: number;
}