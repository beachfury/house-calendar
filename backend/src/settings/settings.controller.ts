/**
 * SettingsController
 *
 * Exposes:
 *  GET  /api/settings/:userId    → fetch current settings (or defaults)
 *  PUT  /api/settings/:userId    → merge patch and persist
 */
import {
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { UserSettings } from './interfaces/user-settings.interface';

@Controller('settings')
export class SettingsController {
  constructor(private readonly svc: SettingsService) {}

  @Get(':userId')
  async getSettings(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserSettings> {
    // Returns existing settings or writes defaults on first access
    return this.svc.getSettings(userId.toString());
  }

  @Put(':userId')
  async updateSettings(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() patch: UpdateSettingsDto,
  ): Promise<UserSettings> {
    // Applies only themeId & themeVariant
    return this.svc.updateSettings(userId.toString(), patch);
  }
}
