// backend/src/dashboard-layouts/dashboard-layouts.service.ts
import { Injectable }         from '@nestjs/common';
import { WidgetSettingsService } from '@/widget-settings/widget-settings.service';
import { DEFAULT_WIDGETS, DefaultWidget } from './default-widgets';
import * as fs                from 'fs';
import * as path              from 'path';
import { LayoutItem } from '../routes/dashboardLayouts';

const FILE = path.join(__dirname, '..', '..', 'data', 'dashboard-layouts.json');

@Injectable()
export class DashboardLayoutsService {
  constructor(private readonly settings: WidgetSettingsService) {}

  private ensureFileExists() {
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, JSON.stringify({ default: [] }, null, 2));
    }
  }

  private readLayouts(): Record<string, LayoutItem[]> {
    this.ensureFileExists();
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  }

  private writeLayouts(data: Record<string, LayoutItem[]>) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  getUserLayout(userId: string): LayoutItem[] {
    const layouts = this.readLayouts();
    return layouts[userId] ?? [];
  }

  /**
   * Now returns the deduped LayoutItem[] so controller can send it back
   */
  updateUserLayout(userId: string, newLayout: LayoutItem[]): LayoutItem[] {
    const layouts = this.readLayouts();
    const previous = layouts[userId] ?? [];
    const prevIds = new Set(previous.map(item => item.i));

    // dedupe
    const uniqueMap = new Map<string, LayoutItem>();
    for (const item of newLayout) {
      uniqueMap.set(item.i, item);
    }
    const deduped = Array.from(uniqueMap.values());
    layouts[userId] = deduped;
    this.writeLayouts(layouts);

    // seed widget-settings for any brand-new widget instances
    for (const item of deduped) {
      if (!prevIds.has(item.i)) {
        const baseId = item.i.split('-')[0];
        const def = (DEFAULT_WIDGETS as DefaultWidget[])
          .find(w => w.i === baseId);
        const defaults = def?.defaultSettings ?? {};
        this.settings.upsert(userId, item.i, defaults);
      }
    }

    // ***RETURN*** the updated array
    return deduped;
  }
}
