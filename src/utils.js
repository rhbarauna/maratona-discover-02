module.exports = {
  remainingDays(limitTimestamp) {
    const now = new Date();
    const limitDate = new Date(limitTimestamp);
    const difference = limitDate.getTime() - now.getTime();
    const days = (difference / (1000 * 3600 * 24)).toFixed(); //convert to days millisecons * total minutes in one hour * 24 hours
    return Number(days);
  },
  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },
  formatCurrency(value) {
    value = String(value).replace(/\D/g,""); // remove all non digits
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    return value;
  },
}