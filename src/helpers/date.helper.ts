export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isDateInFuture = (date: Date): boolean => {
  return date > new Date();
};
