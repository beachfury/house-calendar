/**
 * UserSettings
 *
 * Shape of the settings object persisted per user on disk.
 * Now only includes:
 *  • themeId:      which theme folder to load
 *  • themeVariant: which CSS variant (light/dark)
 */
export interface UserSettings {
  themeId: string;              // e.g. "default", "minecraft"
  themeVariant: 'light' | 'dark';
}
