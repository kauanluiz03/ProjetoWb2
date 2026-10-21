import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import type { Products } from "./Products.js"

@Entity("product_situations")
export class ProductSituations {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    name!: string

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date

    @OneToMany("Products", (product: Products) => product.productSituation)
    products!: Products[]
}