import { Repository } from "typeorm";
export class PaginationServices {
    static async paginate(repository, page = 1, limit = 10, order = {}) {
        const totalRecords = await repository.count();
        const lastPage = Math.ceil(totalRecords / limit);
        if (page > lastPage && lastPage > 0) {
            throw new Error(`Página inválida. O total de páginas é ${lastPage}`);
        }
        const offset = (page - 1) * limit;
        const data = await repository.find({
            skip: offset,
            take: limit,
            order
        });
        return {
            error: false,
            data,
            currentPage: page,
            lastPage,
            totalRecords
        };
    }
}
//# sourceMappingURL=PaginationServices.js.map