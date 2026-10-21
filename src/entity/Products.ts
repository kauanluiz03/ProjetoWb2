import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import type { ProductSituations } from "./ProductSituations.js"
import type { ProductCategories } from "./ProductCategories.js"

@Entity("products")
export class Products {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @ManyToOne("ProductSituations", (s: ProductSituations) => s.products)
    @JoinColumn({ name: "productSituationId" })
    productSituation!: ProductSituations

    @ManyToOne("ProductCategories", (c: ProductCategories) => c.products)
    @JoinColumn({ name: "productCategoryId" })
    productCategory!: ProductCategories

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date
}