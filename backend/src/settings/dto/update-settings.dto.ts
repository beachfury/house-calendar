// backend/src/settings/dto/update-settings.dto.ts
/**
 * UpdateSettingsDto
 *
 * Defines which user settings may be updated via PUT /api/settings/:userId.
 * Add new @Is* validators here when you support more per-user options.
 */
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsBoolean()
  darkMode?: boolean;               // toggle light/dark theme

  @IsOptional()
  @IsString()
  themeColor?: string;              // e.g. "#3b82f6"

  @IsOptional()
  @IsString()
  fontFamily?: string;              // e.g. "Arial", "Roboto"

  @IsOptional()
  @IsString()
  fontSize?: string;                // e.g. "sm", "base", "lg"

  @IsOptional()
  @IsUrl()
  backgroundImageUrl?: string;      // optional fullscreen background image

  @IsOptional()
  @IsString()
  themeName?: string;               // optional named theme
}
