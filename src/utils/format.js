export const formatCurrency = (value, currency = "PKR") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
