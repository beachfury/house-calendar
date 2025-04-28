// backend/src/dashboard-layouts/dto/dashboard-layout.dto.ts
import { IsArray, ValidateNested } from 'class-validator';
import { Type }                   from 'class-transformer';
import { LayoutItemDto } from './layout-item.dto';

export class DashboardLayoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LayoutItemDto)
  layout!: LayoutItemDto[];
}
