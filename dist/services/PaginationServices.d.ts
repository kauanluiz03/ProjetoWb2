import { Repository, type ObjectLiteral, type FindOptionsOrder } from "typeorm";
interface PaginationResult<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalRecords: number;
}
export declare class PaginationServices<T> {
    static paginate<T extends ObjectLiteral>(repository: Repository<T>, page?: number, limit?: number, order?: FindOptionsOrder<T>): Promise<PaginationResult<T>>;
}
export {};
//# sourceMappingURL=PaginationServices.d.ts.map