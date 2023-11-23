import { MOCK_CURRENCY_CONVERT } from "@/mock/currency";

interface CurrencyFormat {
  currency: string;
  amount: number;
}

export const convertPayToReceive = async (
  from: CurrencyFormat,
  to: CurrencyFormat
): Promise<number | null> => {
  const { currency: fromCurrency, amount: fromAmount } = from;
  const { currency: toCurrency } = to;

  const fromCurrencyData = MOCK_CURRENCY_CONVERT.find(
    (cur) => cur.currency.toLowerCase() === fromCurrency.toLowerCase()
  );

  const toCurrencyData = MOCK_CURRENCY_CONVERT.find(
    (cur) => cur.currency.toLowerCase() === toCurrency.toLowerCase()
  );

  const payAmountForEachDollar = 1 / (fromCurrencyData?.price ?? 1);
  const receiveAmountForEachDollar = 1 / (toCurrencyData?.price ?? 1);

  if (!toCurrency || !fromCurrency) {
    return null;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        (fromAmount * receiveAmountForEachDollar) / payAmountForEachDollar
      );
    }, 1000);
  });
};

export const convertReceiveToPay = async (
  from: CurrencyFormat,
  to: CurrencyFormat
): Promise<number | null> => {
  const { currency: fromCurrency } = from;
  const { currency: toCurrency, amount: toAmount } = to;

  const fromCurrencyData = MOCK_CURRENCY_CONVERT.find(
    (cur) => cur.currency.toLowerCase() === fromCurrency.toLowerCase()
  );

  const toCurrencyData = MOCK_CURRENCY_CONVERT.find(
    (cur) => cur.currency.toLowerCase() === toCurrency.toLowerCase()
  );

  const payAmountForEachDollar = 1 / (fromCurrencyData?.price ?? 1);
  const receiveAmountForEachDollar = 1 / (toCurrencyData?.price ?? 1);

  if (!toCurrency || !fromCurrency) {
    return null;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((toAmount * payAmountForEachDollar) / receiveAmountForEachDollar);
    }, 1000);
  });
};
