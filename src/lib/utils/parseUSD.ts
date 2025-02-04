export const toCurrency = (numberString: string) => {
    const number = parseFloat(numberString);
    return number.toLocaleString('USD');
}