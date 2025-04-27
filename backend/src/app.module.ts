// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { SettingsModule }     from './settings/settings.module';
import { WidgetSettingsModule } from './widget-settings/widget-settings.module';
import { UsersModule }        from './users/users.module';
import { DashboardLayoutsModule } from './dashboard-layouts/dashboard-layouts.module';

@Module({
  imports: [
    SettingsModule /*, … */,
    WidgetSettingsModule,
    UsersModule,
    DashboardLayoutsModule,
  ],
})
export class AppModule {}
