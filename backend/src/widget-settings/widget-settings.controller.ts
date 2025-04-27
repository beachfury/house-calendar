import { Controller, Get, Param, Post, HttpCode, Body } from "@nestjs/common";
import { UpdateWidgetSettingsDto } from "./dto/update-widget-settings.dto";
import { WidgetSettingsService } from "./widget-settings.service";

// backend/src/widget-settings/widget-settings.controller.ts
@Controller('api/widget-settings')
export class WidgetSettingsController {
  constructor(private readonly service: WidgetSettingsService) {}

  @Get(':userId/:instanceId')
  async get(
    @Param('userId')     userId:      string,
    @Param('instanceId') instanceId:  string,
  ) {
    return this.service.getSettings(userId, instanceId);
  }

  @Post(':userId/:instanceId')
  @HttpCode(200)
  async save(
    @Param('userId')     userId:      string,
    @Param('instanceId') instanceId:  string,
    @Body()              dto:         UpdateWidgetSettingsDto,
  ) {
    await this.service.saveSettings(userId, instanceId, dto);
    return { success: true };
  }
}
