// backend/src/dashboard-layouts/dto/layout-item.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class LayoutItemDto {
  @IsString()    i!: string;
  @IsNumber()    x!: number;
  @IsNumber()    y!: number;
  @IsNumber()    w!: number;
  @IsNumber()    h!: number;
  @IsOptional() @IsNumber() minW?: number;
  @IsOptional() @IsNumber() maxW?: number;
  // …any other optional props you support
}
