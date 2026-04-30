export type MoneyAccountState = {
  readonly currentMoney: number;
};

export type EconomyState = {
  readonly account: MoneyAccountState;
  readonly accountingEntries: readonly string[];
  readonly transactionFlags: Record<string, boolean | number | string>;
};

export const initialEconomyState: EconomyState = {
  account: {
    currentMoney: 0,
  },
  accountingEntries: [],
  transactionFlags: {},
};
