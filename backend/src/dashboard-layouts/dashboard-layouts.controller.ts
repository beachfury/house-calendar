// backend/src/dashboard-layouts/dashboard-layouts.controller.ts
import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { DashboardLayoutsService } from './dashboard-layouts.service';
import { DashboardLayoutDto }      from './dto/dashboard-layout.dto';

@Controller('dashboard-layouts')
export class DashboardLayoutsController {
  constructor(private readonly layoutService: DashboardLayoutsService) {}

  @Get(':userId')
  getLayout(@Param('userId') userId: string) {
    return this.layoutService.getUserLayout(userId);
  }

  @Put(':userId')
  @HttpCode(200)    // explicitly return 200 OK
  updateLayout(
    @Param('userId') userId: string,
    @Body() body: DashboardLayoutDto,
  ) {
    if (!Array.isArray(body.layout)) {
      throw new BadRequestException('Invalid layout format');
    }
    // return the updated array so the client sees it immediately
    return this.layoutService.updateUserLayout(userId, body.layout);
  }
}
