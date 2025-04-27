// backend/src/widget-settings/widget-settings.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class WidgetSettingsService {
  upsert(userId: string, i: any, defaults: Record<string, any>) {
    throw new Error('Method not implemented.');
  }
  private baseDir = join(process.cwd(), 'data', 'widget-settings');

  private async ensureDir(dir: string) {
    await fs.mkdir(dir, { recursive: true });
  }

  private async filePath(userId: string, instanceId: string) {
    const dir = join(this.baseDir, userId);
    await this.ensureDir(dir);
    return join(dir, `${instanceId}.json`);
  }

  /** read settings */
  async getSettings(userId: string, instanceId: string) {
    const file = await this.filePath(userId, instanceId);
    const raw  = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  }

  /** write/update settings */
  async saveSettings(userId: string, instanceId: string, data: any) {
    const file = await this.filePath(userId, instanceId);
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
  }
}
