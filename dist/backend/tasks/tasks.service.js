"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const json_repository_1 = require("../common/json-repository");
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    constructor() {
        this.repo = new json_repository_1.JsonRepository('tasks');
    }
    findAll(ownerOnly, ownerId) {
        return this.repo
            .findAll()
            .then((tasks) => ownerOnly && ownerId
            ? tasks.filter((t) => t.ownerId === ownerId)
            : tasks);
    }
    findOne(id) {
        return this.repo.findById(id);
    }
    create(dto) {
        return this.repo.create(dto);
    }
    update(id, dto) {
        return this.repo.update(id, dto);
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map