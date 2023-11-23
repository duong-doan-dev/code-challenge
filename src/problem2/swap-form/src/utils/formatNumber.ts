export const formatNumber = (number: number): string => {
  const usDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return usDollar.format(number);
};
