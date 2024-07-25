export default function formatCurrencyWithCommas(number: any): string {
  const numberWithCommas = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numberWithCommas;
}
