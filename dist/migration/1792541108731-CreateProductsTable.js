import { Table, TableForeignKey } from "typeorm";
export class CreateProductsTable1792541108731 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar" },
                { name: "productSituationId", type: "int", isNullable: false },
                { name: "productCategoryId", type: "int", isNullable: false },
                { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
            ],
        }));
        await queryRunner.createForeignKey("products", new TableForeignKey({
            columnNames: ["productSituationId"], referencedColumnNames: ["id"],
            referencedTableName: "product_situations", onDelete: "CASCADE",
        }));
        await queryRunner.createForeignKey("products", new TableForeignKey({
            columnNames: ["productCategoryId"], referencedColumnNames: ["id"],
            referencedTableName: "product_categories", onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("products");
        for (const fk of table?.foreignKeys ?? []) {
            await queryRunner.dropForeignKey("products", fk);
        }
        await queryRunner.dropTable("products");
    }
}
//# sourceMappingURL=1792541108731-CreateProductsTable.js.map