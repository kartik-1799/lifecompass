export class ResponseOptimizer {
  compress(data: any) {
    // Implement compression
    return data;
  }

  paginate(data: any[], page: number, limit: number) {
    const start = (page - 1) * limit;
    return {
      data: data.slice(start, start + limit),
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
    };
  }
}

export const responseOptimizer = new ResponseOptimizer();
