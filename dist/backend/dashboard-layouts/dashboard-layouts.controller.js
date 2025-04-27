"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutsController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_layouts_service_1 = require("./dashboard-layouts.service");
const dashboard_layout_dto_1 = require("./dto/dashboard-layout.dto");
let DashboardLayoutsController = class DashboardLayoutsController {
    constructor(layoutService) {
        this.layoutService = layoutService;
    }
    getLayout(userId, res) {
        const layout = this.layoutService.getUserLayout(userId);
        res.json(layout);
    }
    updateLayout(userId, body, res) {
        this.layoutService.updateUserLayout(userId, body.layout);
        res.json({ success: true });
    }
};
exports.DashboardLayoutsController = DashboardLayoutsController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DashboardLayoutsController.prototype, "getLayout", null);
__decorate([
    (0, common_1.Put)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dashboard_layout_dto_1.DashboardLayoutDto, Object]),
    __metadata("design:returntype", void 0)
], DashboardLayoutsController.prototype, "updateLayout", null);
exports.DashboardLayoutsController = DashboardLayoutsController = __decorate([
    (0, common_1.Controller)('dashboard-layouts'),
    __metadata("design:paramtypes", [dashboard_layouts_service_1.DashboardLayoutsService])
], DashboardLayoutsController);
//# sourceMappingURL=dashboard-layouts.controller.js.map