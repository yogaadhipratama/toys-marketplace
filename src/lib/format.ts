export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatWeight = (weight: number): string => {
  if (weight < 1) {
    return `${(weight * 1000).toFixed(0)}g`;
  }
  return `${weight.toFixed(1)}kg`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num);
};
