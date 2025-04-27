// backend/src/settings/settings.controller.ts
/**
 * SettingsController
 *
 * Exposes:
 *  GET  /api/settings/:userId    → fetch current settings (or defaults)
 *  PUT  /api/settings/:userId    → patch and persist settings
 *
 * Extend here if you need e.g. POST to reset to defaults, or DELETE.
 */
import {
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService, UserSettings } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly svc: SettingsService) {}

  @Get(':userId')
  async getSettings(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserSettings> {
    // → returns defaults if none exist on disk
    return this.svc.getSettings(userId.toString());
  }

  @Put(':userId')
  async updateSettings(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() patch: UpdateSettingsDto,
  ): Promise<UserSettings> {
    // → merges patch into existing, writes file, returns updated
    return this.svc.updateSettings(userId.toString(), patch);
  }
}
