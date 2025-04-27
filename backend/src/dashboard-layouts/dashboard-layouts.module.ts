// backend/src/dashboard-layouts/dashboard-layouts.module.ts
import { Module } from '@nestjs/common';
import { DashboardLayoutsController } from './dashboard-layouts.controller';
import { DashboardLayoutsService }    from './dashboard-layouts.service';
import { WidgetSettingsModule }      from '../widget-settings/widget-settings.module';

@Module({
  imports: [WidgetSettingsModule],      // ← add this line
  controllers: [DashboardLayoutsController],
  providers: [DashboardLayoutsService],
})
export class DashboardLayoutsModule {}
