/*
ISSUES:
1. Props: Remove the children from props since it's unused

2. prices state: prices state should have type Record<string, number>

3. getPrices: console.err is not correct, it should be console.error

4. getPriority: 
      - getPriority should stay out of component, otherwise, we should memoize it
      - getPriority blockchain type should be of union or enum instead of any

6. WalletBalance interface: miss the blockchain type

7. sortedBalances: 
      - add fallback for sort function
      - redundant dependency prices

8. rows: memoize and use formattedBalances instead of sortedBalances 

9. prices.[balance.currency]: Provide fallback value once prices is undefined

10. Do not use index for key
*/

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface BaseCurrency {
  currency: string;
  date: string;
  price: number;
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; // FIXME: Add blockchain type
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// FIXME: Add data source
class Datasource {
  dataSourceUrl: string;

  constructor(url: string) {
    this.dataSourceUrl = url;
  }

  async getPrices(): Promise<Record<string, number>> {
    const data = await fetch(this.dataSourceUrl);

    const rawData: BaseCurrency[] = await data.json();

    const prices: Record<string, number> = rawData.reduce((acc, item) => {
      const { currency, price } = item;

      return {
        ...acc,
        [currency]: price,
      };
    }, {});

    return prices;
  }
}

interface Props extends BoxProps {} // FIXME: Miss interface for BoxProps

// FIXME: Bring this function away from WalletPage
// FIXME: Change any type
const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

// FIXME: children prop is redundant
export const WalletPage: React.FC<Props> = (props: Props) => {
  const balances: WalletBalance[] = useWalletBalances(); // FIXME: Add type for balances
  const [prices, setPrices] = useState<Record<string, number>>(); // FIXME: Add type for prices

  useEffect(() => {
    const datasource = new Datasource(
      "https://interview.switcheo.com/prices.json"
    );

    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.error(error); // FIXME: console.error
      });
  }, []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        if (balancePriority > -99 && balance.amount <= 0) {
          return true;
        }

        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }

        return 0; // FIXME: Return 0 for the fallback
      });
  }, [balances]); // FIXME: Redundant dependency prices

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    }
  );

  // FIXME: Memoize this values
  const rows = useMemo(
    () =>
      // FIXME: use formattedBalances instead of sortedBalances
      formattedBalances.map((balance: FormattedWalletBalance) => {
        const usdValue = (prices?.[balance.currency] ?? 0) * balance.amount; // FIXME:  Provide fallback value once prices is undefined

        return (
          <WalletRow
            key={balance.currency} // FIXME: Do not use index for key
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }),
    []
  );

  return <div {...props}>{rows}</div>;
};
