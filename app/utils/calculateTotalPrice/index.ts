const calculateTotalPrice = (price: number, quantity: number) => {
  const roundedPrice = Math.round(price * 100);
  const totalPrice = roundedPrice * quantity;

  return totalPrice / 100;
};

export default calculateTotalPrice;
