// backend/src/widget-settings/dto/update-widget-settings.dto.ts
import { IsObject } from 'class-validator';

export class UpdateWidgetSettingsDto {
  @IsObject()
  settings!: Record<string, any>;
}
