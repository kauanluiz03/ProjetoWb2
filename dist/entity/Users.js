var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
let Users = class Users {
    id;
    name;
    email;
    situation;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    ManyToone(() => Situations, (situations) => situations.users),
    JoinColumn({ name: "situation_id" }),
    __metadata("design:type", Function)
], Users.prototype, "situation", void 0);
__decorate([
    Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
Users = __decorate([
    Entity("users")
], Users);
export { Users };
//# sourceMappingURL=Users.js.map