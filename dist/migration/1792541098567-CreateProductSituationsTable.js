import { Table } from "typeorm";
export class CreateProductSituationsTable1790400000003 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "product_situations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("product_situations");
    }
}
//# sourceMappingURL=1792541098567-CreateProductSituationsTable.js.map