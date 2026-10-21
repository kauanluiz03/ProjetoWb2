var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
let ProductCategories = class ProductCategories {
    id;
    name;
    createdAt;
    updatedAt;
    products;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductCategories.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "name", void 0);
__decorate([
    Column("timestamp", { default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ProductCategories.prototype, "createdAt", void 0);
__decorate([
    Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ProductCategories.prototype, "updatedAt", void 0);
__decorate([
    OneToMany("Products", (product) => product.productCategory),
    __metadata("design:type", Array)
], ProductCategories.prototype, "products", void 0);
ProductCategories = __decorate([
    Entity("product_categories")
], ProductCategories);
export { ProductCategories };
//# sourceMappingURL=ProductCategories.js.map