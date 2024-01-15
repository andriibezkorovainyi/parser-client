export function parseNativeBalance(balance: string) {
  const parsed = parseFloat(balance);

  return Number.isNaN(parsed) ? 'Unknown' : parsed;
}

export function parseTokenBalanceUSD(balance: string) {
  const parsed = parseFloat(balance);

  return Number.isNaN(parsed) ? 'Unknown' : `$${parsed.toFixed(2)}`;
}

export function truncateAddress(addr: string) {
  return `0x${addr.substring(2, 10)}...`;
}
