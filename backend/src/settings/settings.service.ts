// backend/src/settings/settings.service.ts
/**
 * SettingsService
 *
 * - Persists per-user settings as JSON files under data/settings/<userId>.json.
 * - Seeds with defaults if missing.
 * - Handles partial updates (upsert).
 *
 * To extend:
 *  • Update `UserSettings` interface.
 *  • Add new defaults in read().
 */
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { UpdateSettingsDto } from './dto/update-settings.dto';

// shape persisted on disk and returned to clients
export interface UserSettings {
  darkMode: boolean;           // light (false) or dark (true) mode toggle
  themeColor: string;          // primary accent color (hex string)
  fontFamily: string;          // e.g. "sans", "serif", "mono"
  fontSize: string;            // e.g. "sm", "base", "lg"
  backgroundImageUrl: string;  // optional fullscreen background image URL
  themeName: string;           // named theme skin, e.g. "default", "space", "anime"
  // ← when you add new keys, add them here
}

@Injectable()
export class SettingsService {
  private baseDir = join(process.cwd(), 'data', 'settings');

  /** ensure data/settings exists */
  private async ensureDir() {
    await fs.mkdir(this.baseDir, { recursive: true });
  }

  /** full path to this user's JSON file */
  private filePath(userId: string) {
    return join(this.baseDir, `${userId}.json`);
  }

  /**
   * read()
   * ──
   * Returns existing settings or seeds defaults on first call.
   */
  async read(userId: string): Promise<UserSettings> {
    await this.ensureDir();
    const file = this.filePath(userId);

    try {
      const raw = await fs.readFile(file, { encoding: 'utf8' });
      return JSON.parse(raw) as UserSettings;
    } catch {
      // first run: seed defaults
      const defaults: UserSettings = {
        darkMode: false, // start in light mode
        themeColor: '#3b82f6', // Tailwind blue-500
        fontFamily: 'sans', // Tailwind’s default
        fontSize: 'base', // ~1rem
        backgroundImageUrl: '',
        themeName: ''
      };
      await fs.writeFile(file, JSON.stringify(defaults, null, 2), { encoding: 'utf8' });
      return defaults;
    }
  }

  /**
   * upsert()
   * ──
   * Merges a partial DTO into existing settings and persists.
   */
  async upsert(
    userId: string,
    patch: UpdateSettingsDto,
  ): Promise<UserSettings> {
    await this.ensureDir();
    const existing = await this.read(userId);
    const updated: UserSettings = { ...existing, ...patch };
    await fs.writeFile(
      this.filePath(userId),
      JSON.stringify(updated, null, 2),
      { encoding: 'utf8' },
    );
    return updated;
  }

  /** Public API called by the controller */
  async getSettings(userId: string): Promise<UserSettings> {
    return this.read(userId);
  }

  /** Public API called by the controller */
  async updateSettings(
    userId: string,
    patch: UpdateSettingsDto,
  ): Promise<UserSettings> {
    return this.upsert(userId, patch);
  }
}
