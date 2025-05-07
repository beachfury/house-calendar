/**
 * SettingsModule
 *
 * Registers SettingsController & SettingsService.
 * Import this in your AppModule so /api/settings/* routes work.
 */
import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers:    [SettingsService],
  exports:      [SettingsService],  // other modules can import if needed
})
export class SettingsModule {}
