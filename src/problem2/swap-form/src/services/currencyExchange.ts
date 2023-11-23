import { MOCK_CURRENCY_CONVERT } from "@/mock/currency";

export const exchangeCurrencyToDollar = async (
  amount: number,
  fromCurrency: string
): Promise<number> => {
  const selectedCurrency = MOCK_CURRENCY_CONVERT.find(
    (cur) => cur.currency.toLowerCase() === fromCurrency.toLowerCase()
  );

  const exchangedAmount = (selectedCurrency?.price ?? 0) * amount;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(exchangedAmount);
    }, 1000);
  });
};
