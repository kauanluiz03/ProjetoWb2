var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
let Products = class Products {
    id;
    name;
    productSituation;
    productCategory;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    ManyToOne("ProductSituations", (s) => s.products),
    JoinColumn({ name: "productSituationId" }),
    __metadata("design:type", Function)
], Products.prototype, "productSituation", void 0);
__decorate([
    ManyToOne("ProductCategories", (c) => c.products),
    JoinColumn({ name: "productCategoryId" }),
    __metadata("design:type", Function)
], Products.prototype, "productCategory", void 0);
__decorate([
    Column("timestamp", { default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Products.prototype, "updatedAt", void 0);
Products = __decorate([
    Entity("products")
], Products);
export { Products };
//# sourceMappingURL=Products.js.map