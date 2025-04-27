// backend/src/settings/settings.module.ts
/**
 * SettingsModule
 *
 * - Registers SettingsController & SettingsService.
 * - Import this in AppModule.
 *
 * Later you might export SettingsService if other modules need to read/write settings.
 */
import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers:    [SettingsService],
  exports:      [SettingsService],  // ← export if other modules (e.g. feature flags) consume it
})
export class SettingsModule {}
