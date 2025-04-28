// backend/src/widget-settings/widget-settings.controller.ts

import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UpdateWidgetSettingsDto } from './dto/update-widget-settings.dto';
import { WidgetSettingsService } from './widget-settings.service';

@Controller('widget-settings')
export class WidgetSettingsController {
  constructor(
    private readonly widgetSettingsService: WidgetSettingsService
  ) {}

  /** 
   * Fetch the saved settings for a particular user/widget instance 
   */
  @Get(':userId/:instanceId')
  async get(
    @Param('userId') userId: string,
    @Param('instanceId') instanceId: string,
  ) {
    return this.widgetSettingsService.getSettings(userId, instanceId);
  }

  /**
   * Update (or create) the settings blob. 
   * Expects payload of shape: { settings: { /* any key/value pairs */
   
  @Put(':userId/:instanceId')
  @HttpCode(200)
  async update(
    @Param('userId') userId: string,
    @Param('instanceId') instanceId: string,
    @Body() dto: UpdateWidgetSettingsDto,
  ) {
    // Pass only the inner settings object to your service
    await this.widgetSettingsService.saveSettings(
      userId,
      instanceId,
      dto.settings,
    );
    return { success: true };
  }
}
