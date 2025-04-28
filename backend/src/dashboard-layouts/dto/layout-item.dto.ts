// backend/src/dashboard-layouts/dto/layout-item.dto.ts

import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class LayoutItemDto {
  @IsString()
  i!: string;

  @IsNumber()
  x!: number;
  @IsNumber()
  y!: number;

  @IsNumber()
  w!: number;
  @IsNumber()
  h!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minW?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxW?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minH?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxH?: number;
}
