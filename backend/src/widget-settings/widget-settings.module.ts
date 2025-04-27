// backend/src/widget-settings/widget-settings.module.ts
import { Module } from '@nestjs/common';
import { WidgetSettingsService } from './widget-settings.service';
import { WidgetSettingsController } from './widget-settings.controller';

@Module({
  providers: [WidgetSettingsService],
  controllers: [WidgetSettingsController],
  exports: [WidgetSettingsService],
})
export class WidgetSettingsModule {}
