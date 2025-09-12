const calculateTotalPrice = (price: number, quantity: number) => {
  const roundedPrice = price * 100;
  const totalPrice = roundedPrice * quantity;

  return Number((totalPrice / 100).toFixed(2));
};

export default calculateTotalPrice;
