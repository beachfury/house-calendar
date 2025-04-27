"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRepository = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class JsonRepository {
    constructor(entityName) {
        // Ensure entityName does NOT contain .json
        this.file = (0, path_1.join)(__dirname, '../../data', `${entityName}.json`);
    }
    // Safely read all entries, auto-create file if missing
    async readAll() {
        try {
            const content = await fs_1.promises.readFile(this.file, 'utf-8');
            return JSON.parse(content);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                await this.writeAll([]); // Create empty file if missing
                return [];
            }
            throw err;
        }
    }
    async writeAll(items) {
        await fs_1.promises.writeFile(this.file, JSON.stringify(items, null, 2), 'utf-8');
    }
    async findAll() {
        return this.readAll();
    }
    async findById(id) {
        const items = await this.readAll();
        return items.find((item) => item.id === id);
    }
    async saveAll(data) {
        await this.writeAll(data);
    }
    async create(data) {
        const items = await this.readAll();
        const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
        const record = { ...data, id: nextId };
        items.push(record);
        await this.writeAll(items);
        return record;
    }
    async update(id, data) {
        const items = await this.readAll();
        const idx = items.findIndex((i) => i.id === id);
        if (idx === -1)
            throw new Error('Not found');
        items[idx] = { ...items[idx], ...data };
        await this.writeAll(items);
        return items[idx];
    }
    async delete(id) {
        const items = (await this.readAll()).filter((i) => i.id !== id);
        await this.writeAll(items);
    }
}
exports.JsonRepository = JsonRepository;
//# sourceMappingURL=json-repository.js.map