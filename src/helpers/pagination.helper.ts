export const getPaginationParams = (query: any) => {
  return {
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 10,
    sortBy: query.sortBy || 'createdAt',
    sortOrder: query.sortOrder || 'desc',
  };
};

export const calculateTotalPages = (total: number, limit: number) => {
  return Math.ceil(total / limit);
};
