// backend/src/common/json-repository.ts
import { promises as fs } from 'fs';
import { join } from 'path';

export class JsonRepository<T extends { id: number }> {
  private file: string;

  constructor(entityName: string) {
    // Ensure entityName does NOT contain .json
    this.file = join(__dirname, '../../data', `${entityName}.json`);
  }

  // Safely read all entries, auto-create file if missing
  private async readAll(): Promise<T[]> {
    try {
      const content = await fs.readFile(this.file, 'utf-8');
      return JSON.parse(content) as T[];
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        await this.writeAll([]); // Create empty file if missing
        return [];
      }
      throw err;
    }
  }

  private async writeAll(items: T[]): Promise<void> {
    await fs.writeFile(this.file, JSON.stringify(items, null, 2), 'utf-8');
  }

  async findAll(): Promise<T[]> {
    return this.readAll();
  }

  async findById(id: number): Promise<T | undefined> {
    const items = await this.readAll();
    return items.find((item) => item.id === id);
  }

  async saveAll(data: T[]): Promise<void> {
    await this.writeAll(data);
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const items = await this.readAll();
    const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const record = { ...data, id: nextId } as T;
    items.push(record);
    await this.writeAll(items);
    return record;
  }

  async update(id: number, data: Partial<Omit<T, 'id'>>): Promise<T> {
    const items = await this.readAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Not found');
    items[idx] = { ...items[idx], ...data };
    await this.writeAll(items);
    return items[idx];
  }

  async delete(id: number): Promise<void> {
    const items = (await this.readAll()).filter((i) => i.id !== id);
    await this.writeAll(items);
  }
}
