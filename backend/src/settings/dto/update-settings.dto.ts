/**
 * UpdateSettingsDto
 *
 * Defines which user settings may be updated via PUT /api/settings/:userId.
 * Now only supports selecting a theme folder (themeId) and variant (light/dark).
 */
import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
  /** 
   * Folder name under /public/themes/, e.g. "default" or "minecraft" 
   */
  @IsOptional()
  @IsString()
  themeId?: string;

  /**
   * Which CSS file variant to load: "light" or "dark"
   */
  @IsOptional()
  @IsString()
  themeVariant?: 'light' | 'dark';
}
