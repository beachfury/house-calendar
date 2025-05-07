/**
 * SettingsService
 *
 * - Persists per-user settings as JSON files under data/settings/<userId>.json.
 * - Seeds with defaults if missing (default to theme "default", variant "light").
 * - Handles partial updates (upsert).
 */
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { UserSettings } from './interfaces/user-settings.interface';

@Injectable()
export class SettingsService {
  private baseDir = join(process.cwd(), 'data', 'settings');

  /** Ensure the settings directory exists */
  private async ensureDir() {
    await fs.mkdir(this.baseDir, { recursive: true });
  }

  /** Compute the file path for a given userId */
  private filePath(userId: string) {
    return join(this.baseDir, `${userId}.json`);
  }

  /**
   * read()
   * ────
   * Returns existing settings or seeds defaults on first call.
   */
  async read(userId: string): Promise<UserSettings> {
    await this.ensureDir();
    const file = this.filePath(userId);

    try {
      const raw = await fs.readFile(file, 'utf8');
      return JSON.parse(raw) as UserSettings;
    } catch {
      // First run: write default settings
      const defaults: UserSettings = {
        themeId: 'default',
        themeVariant: 'light',
      };
      await fs.writeFile(file, JSON.stringify(defaults, null, 2), 'utf8');
      return defaults;
    }
  }

  /**
   * upsert()
   * ──────
   * Merges a partial DTO into existing settings and persists.
   */
  async upsert(
    userId: string,
    patch: UpdateSettingsDto,
  ): Promise<UserSettings> {
    await this.ensureDir();
    const existing = await this.read(userId);
    const updated: UserSettings = {
      ...existing,
      ...patch,               // only themeId & themeVariant can change
    };
    await fs.writeFile(
      this.filePath(userId),
      JSON.stringify(updated, null, 2),
      'utf8',
    );
    return updated;
  }

  /** Called by controller: fetch settings (or defaults) */
  async getSettings(userId: string): Promise<UserSettings> {
    return this.read(userId);
  }

  /** Called by controller: update & return settings */
  async updateSettings(
    userId: string,
    patch: UpdateSettingsDto,
  ): Promise<UserSettings> {
    return this.upsert(userId, patch);
  }
}
